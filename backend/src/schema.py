from typing import List
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
class Text:
    content: str | None


@strawberry.type
class ClassificationResults:
    labels: List[str]
    scores: List[float]


@strawberry.type
class Query:

    @strawberry.field
    async def query_song(self, song_query: str, limit: int | None = None) -> List[Song]:
        """
        ----- EXAMPLE GRAPHQL QUERY -----
        query {
            querySong(
                songQuery: "amazing grace passion",
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

        return await _query_song(song_query, limit)

    @strawberry.field
    async def fetch_lyrics(self, path: str) -> Text:
        """
        ----- EXAMPLE GRAPHQL QUERY -----
        query {
            fetchLyrics(
                path: "/Passion-amazing-grace-my-chains-are-gone-live-lyrics"
            ) {
                content
            }
        }
        """
        from src.routes.genius_routes import fetch_lyrics as _fetch_lyrics

        return await _fetch_lyrics(path=path)

    @strawberry.field
    def classify(
        self,
        text: str,
        label_sets: List[List[str]],
    ) -> List[ClassificationResults]:
        """
        ----- EXAMPLE GRAPHQL QUERY -----
        query {
            classify(
                text: "Amazing grace, how sweet the sound.",
                labelSets: [
                    ["FORGIVENESS", "RESENTMENT"],
                    ["HOPE", "DESPAIR"]
                ]
            ) {
                scores,
                labels
            }
        }
        """
        from src.routes.ml_routes import classify as _classify

        return _classify(text=text, label_sets=label_sets)


schema = strawberry.Schema(Query)
router = GraphQLRouter(schema=schema)
