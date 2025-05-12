import { useQuery } from "@apollo/client";
import { GET_SONG_MATCHES } from "../queries";
import { useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import { SongType } from "../types/SongType";
import SongCard from "../components/SongCard";
import DOMPurify from "dompurify";

export default function Search() {
  const [searchParams] = useSearchParams();

  const songQuery = searchParams.get("song");
  const artistQuery = searchParams.get("artist");

  const { loading, error, data } = useQuery(GET_SONG_MATCHES, {
    variables: {
      songQuery: DOMPurify.sanitize(songQuery || ""),
      artistQuery: DOMPurify.sanitize(artistQuery || ""),
      limit: 8,
    },
  });

  if (loading) return <Loading />;
  if (error) return <Error name={error.name} message={error.message} />;

  const { querySong }: { querySong: Array<SongType> } = data;

  return (
    <div id="pageSearch" className="w-full flex justify-center">
      {querySong.length === 0 ? (
        <div>Please enter a search term in the URL</div>
      ) : (
        <div className="flex flex-col gap-8 m-2 max-w-xl">
          {querySong.map((song: SongType) => (
            <SongCard {...song} />
          ))}
        </div>
      )}
    </div>
  );
}
