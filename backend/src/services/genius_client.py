"""
----- EXAMPLE USAGE -----

import os
from dotenv import load_dotenv
import asyncio

from genius_client import GeniusClient

# Load access token from .env
load_dotenv()
genius_access_token = os.getenv("GENIUS_ACCESS_TOKEN")

# Initialize Genius Client
genius = GeniusClient(genius_access_token)

# Define our search terms
songs_query = ["billie jean", "bohemian rhapsody"]
artists_query = ["michael", "queen"]

# Run the search
search_data = asyncio.run(genius.get_songs_data(songs_query, artists_query))

# Extract the first matching result for each song-artist pair
search_results = [item['result'] for item in search_data[0]]

# Extract complete song and artist
song_names = [result['title'] for result in search_results]
artist_names = [result['artist_names'] for result in search_results]

# Fetch the lyrics for each found result
lyrics = [
    genius.fetch_lyrics(result['path'])
    for result in search_results
    if 'url' in result
]

# Display the lyrics
for song, artist, lyric in zip(song_names, artist_names, lyrics):
    print(f"{song} - {artist}")
    print(lyric, end='\n\n')

"""

import asyncio
from typing import List
from aiohttp import ClientSession
from urllib.parse import urlencode
from bs4 import BeautifulSoup
import re


class GeniusClient:

    _API_URL = "https://api.genius.com"
    _SITE_URL = "https://genius.com"

    DEFAULT_SEARCH_LIMIT = 1
    DEFAULT_RETRIES = 3
    DEFAULT_DELAY = 2

    def __init__(self, access_token: str) -> None:
        """Access token can be obtained at https://genius.com/api-clients"""
        self._access_token = access_token

    def _get_headers(self) -> dict:
        return {"Authorization": f"Bearer {self._access_token}"}

    async def _fetch_song_data(
        self,
        song: str,
        artist: str,
        limit: int,
        session: ClientSession,
        retries: int | None,
        delay: int | None,
    ) -> dict | None:
        """Returns song data for matching results of a single search"""

        params = {"q": f"{artist} {song}"}
        endpoint = "/search"
        url = f"{self._API_URL}{endpoint}?{urlencode(params)}"

        response = await self._get_response(
            url=url,
            retries=retries,
            delay=delay,
            session=session,
            headers=self._get_headers(),
        )
        hits = response.get("response", {}).get("hits", [])

        return hits[:limit] if hits else []

    async def search_song_data(
        self,
        songs: List[str],
        artists: List[str],
        limit: int = DEFAULT_SEARCH_LIMIT,
        retries: int = DEFAULT_RETRIES,
        delay: int = DEFAULT_DELAY,
    ) -> List[List[dict]]:
        f"""
        Returns the matching Genius song data for matching search results
        according to song and artist queries

        params:
            - songs (List[str]):
                The list of song queries (case insensitive)
                eg. ["despacito", "shape", "just the way"]
            
            - artists (List[str]):
                The list of artist queries (case insensitive)
                eg. ["luis", "ed", "bruno"]
            
            - limit (int):
                The maximum number of matches to return
                default: {self.DEFAULT_SEARCH_LIMIT}
            
            - retries (int | None):
                How many times to retry an individual failed request.
                default: {self.DEFAULT_RETRIES}.

            - delay (int | None):
                How long to wait before each individual failed request.
                default: {self.DEFAULT_DELAY}.
        """

        # Initialize async session
        session = ClientSession()

        # Initiates and waits for multiple async requests simultaneously
        tasks = [
            self._fetch_song_data(
                song=song,
                artist=artist,
                limit=limit,
                session=session,
                retries=retries,
                delay=delay,
            )
            for song, artist in zip(songs, artists)
        ]

        data: List[List[dict]] = await asyncio.gather(*tasks)

        await session.close()
        return data

    retriable_statuses = {429, 500, 503, 504}

    async def _get_response(
        self,
        url: str,
        session: ClientSession,
        retries: int = DEFAULT_RETRIES,
        delay: int = DEFAULT_DELAY,
        **kwargs,
    ) -> dict | None:
        f"""
        Handles asynchronous requests to the Genius API and returns the response JSON

        params:

            - url (str):
                The full encoded url to make the request to
                e.g. https://api.genius.com/search?q=despacito%20luis%20fonsi
            
            - retries (int):
                The number of times to retry a failed request
                Default: {self.DEFAULT_RETRIES}
            
            - delay (int):
                The number of seconds to wait between each retry
                Default: {self.DEFAULT_DELAY}

            - **kwargs:
                Extra parameters to be passed to the get function
                e.g. params, headers
        """

        data = None
        attempts = 0

        while data is None and attempts < retries:

            attempts += 1
            async with session.get(url, **kwargs) as response:

                if "json" in response.content_type:
                    response_content = await response.json()
                else:
                    response_content = await response.text()

                if response.status == 200:
                    return response_content

                if not response.status in self.retriable_statuses:
                    await session.close()
                    response.raise_for_status()

                await asyncio.sleep(delay)
                continue

        return None

    async def fetch_lyrics(
        self,
        path: str,
        preserve_format: bool = True,
        section_labels: bool = True,
        bracket_content: bool = True,
    ) -> str | None:
        """
        Scrapes the lyrics from the given Genius song URL.

        params:

            - path (str):
                The Genius endpoint to the song's lyrics
                eg. '/Michael-jackson-billie-jean-lyrics'

            - preserve_format (bool):
                Whether to preserve the default formatting
                Set to True to preserve new lines
                Set to False for plain text
                Useful for tokenization when dealing with AI models

            - section_labels (bool):
                Whether to keep the default section labels (ie. [Verse 1])
                Set to True to keep them
                Set to False to keep only the lyrics themselves.

            - bracket_content (bool):
                Whether to keep text inside brackets
                Set to True to keep it
                Set to False to remove
                Useful for passing into AI models for analysis
                As content in brackets often contains filler words
        """
        session = ClientSession()
        url = f"{self._SITE_URL}{path}"
        response = await self._get_response(url=url, session=session)
        await session.close()

        soup = BeautifulSoup(response, "html.parser")

        # End of classname is autogenerated so only match static part
        base_class = "Lyrics__Container-sc-"
        header_class = "LyricsHeader__Container-sc-"
        placeholder_class = "LyricsPlaceholder__Container-sc-"

        lyrics_div = soup.find("div", class_=re.compile(rf"^{base_class}"))

        if not lyrics_div:
            return None

        header_div = lyrics_div.find("div", class_=re.compile(rf"^{header_class}"))

        if header_div:
            # Remove Metadata (Credits, Translations, Contributors)
            # Possible future implementation could be to extract this data
            header_div.decompose()

        # Instrumental songs with no lyrics contain a placeholder instead
        if lyrics_div.find("div", class_=re.compile(rf"^{placeholder_class}")):
            return None

        lyrics = lyrics_div.get_text("\n", strip=True)

        if not preserve_format:
            lyrics = " ".join(lyrics.splitlines())

        if not bracket_content:
            # Removes anything inside ()
            # eg. This is a (random) text -> This is a text
            lyrics = re.sub(r"\(.*?\)", " ", lyrics)
        else:
            # Remove trailing whitespace in between ()
            # eg. This is a ( random ) text -> This is a (random) text
            lyrics = lyrics.replace("( ", "(").replace(" )", ")")

        if not section_labels:
            # Removes anything inside []
            # eg. This is a [random] text -> This is a text
            lyrics = re.sub(r"\[.*?\]", " ", lyrics)

        # Remove trailing whitespace
        lyrics = lyrics.strip()

        # Remove duplicate white space
        lyrics = re.sub(r"\s+", " ", lyrics)

        return lyrics
