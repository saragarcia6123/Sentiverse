# FastAPI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# GraphQL
from src.schema import router as graphql_router

app = FastAPI(docs_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["localhost"],
    allow_methods=["GET", "POST"],
)

"""
----- Example cURL Request -----

curl --request POST \
  --header 'Content-Type: application/json' \
  --url 'http://localhost:8000/graphql' \
  --data '{"query":"query {\n classify(\n text: \"What a wonderful day!\",\n labelSets: [\n [\"LOVE\", \"HATE\"],\n [\"HOPE\", \"DESPAIR\"]\n]\n) {\n scores,\n labels\n }\n}"}'

"""


@app.get("/")
def read_root():
    return {"GraphQL": "http://localhost:8000/graphql"}


app.include_router(graphql_router, prefix="/graphql")
