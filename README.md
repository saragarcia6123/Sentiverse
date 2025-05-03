# Sentiverse ❤️‍🔥

## A full-stack web application for analyzing the emotional landscape of your favorite song lyrics

Sentiverse searches for your favorite songs on [Genius](https://genius.com), retrieves the lyrics, and classifies them based on emotionally opposite word pairs.

Its core aim is to enhance the way we connect with music by revealing at a glance the underlying emotions that resonate within the lyrics.

## How it works

1) The user submits a song and artist query to the API
2) A list of matching results is returned by the API
3) The user selects the matching song
4) The API fetches the lyrics for the given song by scraping them with [BeautifulSoup](https://beautiful-soup-4.readthedocs.io)
5) The lyrics are cleaned and preprocessed
6) Facebook's pre-trained model [RoBERTa](https://huggingface.co/FacebookAI/roberta-large-mnli) tokenizes and classifies the lyrics pair-by-pair according to the pre-defined labels (such as ['HAPPY', 'SAD'])
7) The scores for each pair sum up to 1.0, which are displayed in the Front-end as a diverging bar chart

## Core Technologies

### Backend

- [FastAPI](https://fastapi.tiangolo.com)
- [GraphQL](https://graphql.org) with [Strawberry](https://strawberry.rocks)

### Frontend (Work in Progress)

- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/)

## Running Locally (MacOS/Linux)

1) Obtain a Genius API key from [here](https://genius.com/api-clients)

2) Clone the repository

```sh
git clone https://github.com/saragarcia6123/Sentiverse.git
cd Sentiverse/backend/
```

3) Create a .env file in backend/ and set your GENIUS_ACCESS_TOKEN

```sh
echo GENIUS_ACCESS_TOKEN=your_access_token > .env
```

4) Create a virtual environment and install dependencies

```sh
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

5) Run the application with FastAPI

```sh
cd src/
fastapi run app.py
```

### Authors

- [Sara Garcia](https://github.com/saragarcia6123)
