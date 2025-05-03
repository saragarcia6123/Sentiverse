from typing import List

import aiohttp
import strawberry
from strawberry.fastapi import GraphQLRouter


@strawberry.type
class Song:
    id: int
    song_api_url: str
    artist_api_url: str | None
    song_name: str
    artist_name: str
    lyrics_path: str
    image_url: str | None
    release_date: str | None
    release_year: int | None
    release_month: int | None
    release_day: int | None


@strawberry.type
class Lyrics:
    content: str | None


@strawberry.type
class ClassificationResults:
    labels: List[str]
    scores: List[float]


@strawberry.type
class Query:

    @strawberry.field
    async def query_song(
        self, song_query: str, artist_query: str, limit: int | None = None
    ) -> List[Song]:
        """
        ----- EXAMPLE GRAPHQL QUERY -----
        query {
            querySong(
                songQuery: "dont stop me now",
                artistQuery: "queen"
            ) {
                id,
                songName,
                artistName,
                lyricsPath,
                imageUrl
            }
        }
        """
        from src.routes.genius_routes import query_song as _query_song

        return await _query_song(song_query, artist_query, limit)

    @strawberry.field
    async def fetch_lyrics(
        self,
        path: str,
        preserve_format: bool = True,
        section_labels: bool = True,
        bracket_content: bool = True,
    ) -> Lyrics:
        """
        ----- EXAMPLE GRAPHQL QUERY -----
        query {
            fetchLyrics(
                path: "/Queen-dont-stop-me-now-lyrics",
                preserveFormat: false,
                sectionLabels: false,
                bracketContent: true
            ) {
                content
            }
        }
        """
        from src.routes.genius_routes import fetch_lyrics as _fetch_lyrics

        return await _fetch_lyrics(
            path=path,
            preserve_format=preserve_format,
            section_labels=section_labels,
            bracket_content=bracket_content,
        )

    @strawberry.field
    async def classify(
        self,
        lyrics: str,
        label_sets: List[List[str]],
    ) -> List[ClassificationResults]:
        """
        ----- EXAMPLE GRAPHQL QUERY -----
        query {
            classify(
                lyrics: "Don't stop me now
                         I'm havin' such a good time,
                         I'm havin' a ball",
                labelSets: [
                    ["AMAZING", "TERRIBLE"],
                    ["FUN", "BORING"]
                ]
            ) {
                scores,
                labels
            }
        }
        """
        from src.routes.ml_routes import classify as _classify

        return await _classify(lyrics=lyrics, label_sets=label_sets)


schema = strawberry.Schema(Query)
router = GraphQLRouter(schema=schema)
