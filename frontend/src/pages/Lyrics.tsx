import { Outlet, useParams } from "react-router-dom";
import { FETCH_LYRICS } from "../queries";
import { useQuery } from "@apollo/client";
import Loading from "./Loading";
import Error from "./Error";
import LyricsCard from "../components/LyricsCard";
import { LyricsType } from "../types/LyricsType";
import { useState } from "react";
import Classification from "../components/Classification";

export default function Lyrics() {
  const { path } = useParams();
  const [resultsVisible, setResultsVisible] = useState(false);

  const { loading, error, data } = useQuery(FETCH_LYRICS, {
    variables: {
      path: `/${path}`,
    },
  });

  if (loading) return <Loading />;
  if (error) return <Error name={error.name} message={error.message} />;

  const { fetchLyrics }: { fetchLyrics: LyricsType } = data;

  const showResults = () => setResultsVisible(true);

  return (
    <div id="pageLyrics" className="pb-8 flex flex-col items-center">
      <div className="flex flex-col gap-8 justify-center w-fit">
        <LyricsCard lyrics={fetchLyrics.content} />
        <button
          onClick={showResults}
          className="rounded-full text-red-950 bg-red-200 hover:enabled:bg-red-300 enabled:border-red-800 border-2 text-2xl px-4 py-2 hover:enabled:cursor-pointer disabled:text-red-300"
          disabled={resultsVisible}
        >
          Classify
        </button>
      </div>

      {resultsVisible && <Classification lyrics={fetchLyrics.content} />}
      <Outlet />
    </div>
  );
}
