from dotenv import load_dotenv
import os
from typing import List

from src.services.genius_client import GeniusClient

load_dotenv()

genius = GeniusClient(os.getenv("GENIUS_ACCESS_TOKEN"))


from src.schema import Song


async def query_song(
    song_query: str, artist_query: str, limit: int | None
) -> List[Song]:
    response = await genius.search_song_data(
        songs=[song_query], artists=[artist_query], limit=limit
    )
    response = [item["result"] for item in response[0]]
    print(response)

    return [
        Song(
            id=item.get("id"),
            song_api_url=item.get("api_path"),
            artist_api_url=(
                item.get("primary_artist", {}).get("api_path")
                if item.get("primary_artist")
                else None
            ),
            song_name=item.get("title"),
            artist_name=(
                item.get("primary_artist", {}).get("name")
                if item.get("primary_artist")
                else None
            ),
            lyrics_path=item.get("path"),
            image_url=item.get("header_image_url"),
            release_date=item.get("release_date_for_display"),
            release_year=(
                item.get("release_date_components", {}).get("year")
                if item.get("release_date_components")
                else None
            ),
            release_month=(
                item.get("release_date_components", {}).get("month")
                if item.get("release_date_components")
                else None
            ),
            release_day=(
                item.get("release_date_components", {}).get("day")
                if item.get("release_date_components")
                else None
            ),
        )
        for item in response
    ]


from src.schema import Lyrics


async def fetch_lyrics(
    path: str, preserve_format: bool, section_labels: bool, bracket_content: bool
) -> Lyrics:
    response = await genius.fetch_lyrics(
        path=path,
        preserve_format=preserve_format,
        section_labels=section_labels,
        bracket_content=bracket_content,
    )

    return Lyrics(content=response)
