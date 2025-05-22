# Sentiverse ❤️‍🔥

## A full-stack web application for analyzing the emotional landscape of your favorite song lyrics

> Sentiverse searches for your favorite songs on [Genius](https://genius.com), retrieves the lyrics, and classifies them based on emotionally opposite word pairs.
![App Preview](preview.gif)
> Its core aim is to enhance the way we connect with music by revealing at a glance the underlying emotions that resonate within the lyrics.

## How it works

1) The user submits a song and artist query to the API
2) A list of matching results is returned by the API
3) The user selects the matching song
4) The API scrapes the lyrics from the Genius website
5) The lyrics are cleaned and preprocessed
6) Facebook's RoBERTa then classifies the lyrics according to a set of clear, predefined instructions.
7) The scores for each pair sum up to 1.0, which are displayed in the frontend as a stacked bar chart

---

## Core Technologies

<table>
  <tr>
    <th>Backend</th>
    <th>Frontend</th>
    <th>DevOps</th>
  </tr>
  <tr>
    <td><a href="https://www.python.org/">Python</a></td>
    <td><a href="https://www.typescriptlang.org/">Typescript</a></td>
    <td><a href="https://nginx.org/">Nginx</a></td>
  </tr>
  <tr>
    <td><a href="https://fastapi.tiangolo.com">FastAPI</a></td>
    <td><a href="https://react.dev">React</a></td>
    <td><a href="https://www.uvicorn.org/">Uvicorn</a></td>
  </tr>
  <tr>
    <td><a href="https://graphql.org">GraphQL</a></td>
    <td><a href="https://tailwindcss.com/">Tailwind CSS</a></td>
    <td><a href="https://www.docker.com/">Docker</a></td>
  </tr>
  <tr>
    <td><a href="https://strawberry.rocks">Strawberry</a></td>
    <td><a href="https://www.apollographql.com/">Apollo</a></td>
    <td><a href="https://console.cloud.google.com/">Google Cloud</a></td>
  </tr>
  <tr>
    <td><a href="https://beautiful-soup-4.readthedocs.io">BeautifulSoup</a></td>
    <td><a href="https://vite.dev/">Vite</a></td>
    <td><a href="https://git-scm.com/">Git</a></td>
  </tr>
  <tr>
    <td><a href="https://pytorch.org/">PyTorch</a></td>
    <td><a href="https://www.npmjs.com/">npm</a></td>
    <td></td>
  </tr>
</table>

---

## Local Setup (Linux + MacOS)

> For Windows users: if you'd like to contribute a working translation, feel free to submit it via a pull request.

### Pre-requisites

- [Python](https://www.python.org/downloads/) + [pip](https://pypi.org/project/pip/)
- [Node.js](https://nodejs.org/en) + [npm](https://www.npmjs.com/)

### 1. Obtain a Genius API key from [here](https://genius.com/api-clients)

### 2. Clone the repository

```sh
git clone https://github.com/saragarcia6123/Sentiverse.git
cd Sentiverse
```

### 3. Run the setup file

```sh
./setup.sh
```

### Authors

- [Sara Garcia](https://github.com/saragarcia6123)
