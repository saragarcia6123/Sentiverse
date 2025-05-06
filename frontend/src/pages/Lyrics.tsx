import { Outlet, useParams } from "react-router-dom";
import { FETCH_LYRICS } from "../queries";
import { useQuery } from "@apollo/client";
import Loading from "./Loading";
import Error from "./Error";
import LyricsCard from "../components/LyricsCard";
import { LyricsType } from "../types/LyricsType";

export default function Lyrics() {
  const { path } = useParams();

  const { loading, error, data } = useQuery(FETCH_LYRICS, {
    variables: {
      path: `/${path}`,
    },
  });

  if (loading) return <Loading />;
  if (error) return <Error name={error.name} message={error.message} />;

  const { fetchLyrics }: { fetchLyrics: LyricsType } = data;

  return (
    <div id="pageLyrics" className="flex justify-center">
      <LyricsCard lyrics={fetchLyrics.content} />
      <Outlet />
    </div>
  );
}
