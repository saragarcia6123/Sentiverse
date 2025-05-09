# Sentiverse ❤️‍🔥

## A full-stack web application for analyzing the emotional landscape of your favorite song lyrics

![App Preview](preview.gif)

> Sentiverse searches for your favorite songs on [Genius](https://genius.com), retrieves the lyrics, and classifies them based on emotionally opposite word pairs

Its core aim is to enhance the way we connect with music by revealing at a glance the underlying emotions that resonate within the lyrics

## How it works

1) The user submits a song and artist query to the API
2) A list of matching results is returned by the API
3) The user selects the matching song
4) The API scrapes the lyrics from the Genius website
5) The lyrics are cleaned and preprocessed
6) Facebook's pre-trained model RoBERTA tokenizes and classifies the lyrics pair-by-pair according to the pre-defined labels (such as ['LOVE', 'HATE'])
7) The scores for each pair sum up to 1.0, which are displayed in the frontend as a stacked bar chart

## Core Technologies

### Backend

- [FastAPI](https://fastapi.tiangolo.com) with [Python](https://www.python.org/)
- [GraphQL](https://graphql.org) with [Strawberry](https://strawberry.rocks)
- [RoBERTa](https://huggingface.co/FacebookAI/roberta-large-mnli) with [PyTorch](https://pytorch.org/) and [Transformers](https://huggingface.co/docs/transformers/index)
- [BeautifulSoup](https://beautiful-soup-4.readthedocs.io)
- [Uvicorn](https://www.uvicorn.org/) for hosting

### Frontend

- [React](https://react.dev) with [Typescript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Apollo](https://www.apollographql.com/)
- [Vite](https://vite.dev/) & [npm](https://www.npmjs.com/)
- [Nginx](https://nginx.org/) for hosting

## Local Setup

### Pre-requisites

- [Python >= 3.10](https://www.python.org/downloads/)
- [PyTorch](https://pytorch.org/get-started/locally/)
- [Node.js](https://nodejs.org/en)

### 1. Obtain a Genius API key from [here](https://genius.com/api-clients)

### 2. Clone the repository

```sh
git clone https://github.com/saragarcia6123/Sentiverse.git
cd Sentiverse
```

### 3. Create a .env file in `backend` and set your Genius Access Token

```sh
cd backend
echo GENIUS_ACCESS_TOKEN=your_access_token > .env
```

### 4a. Start the backend

```sh
cd src
fastapi dev app.py
```

### 4b. Start the frontend

```sh
cd ../../frontend
npm run dev
```

### Authors

- [Sara Garcia](https://github.com/saragarcia6123)
