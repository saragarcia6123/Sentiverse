# FastAPI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# GraphQL
from src.schema import router as graphql_router

app = FastAPI(docs_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["localhost"],
    allow_methods=["GET"],
)


@app.get("/")
def read_root():
    return {"GraphQL": "http://localhost:8000/graphql"}


app.include_router(graphql_router, prefix="/graphql")
