import { RefObject, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const songInput: RefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement>(null);
  const artistInput: RefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const song = songInput.current?.value || "";
    const artist = artistInput.current?.value || "";

    const path = `/search?song=${encodeURIComponent(
      song
    )}&artist=${encodeURIComponent(artist)}`;
    navigate(path);
  }

  return (
    <div
      id="pageLanding"
      className="my-4 mx-8 flex justify-center items-center h-full"
    >
      <form
        onSubmit={handleSubmit}
        className="w-[500px] flex flex-col gap-4 justify-center"
      >
        <input
          placeholder="Song"
          ref={songInput}
          className="rounded-full border-gray-600 dark:border-gray-400 border-1 text-2xl px-4 py-2"
        />
        <input
          placeholder="Artist"
          ref={artistInput}
          className="rounded-full border-gray-600 dark:border-gray-400 border-1 text-2xl px-4 py-2"
        />
        <button
          type="submit"
          className="rounded-full text-red-950 bg-red-200 hover:bg-red-300 border-red-800 border-2 text-2xl px-4 py-2 hover:cursor-pointer"
        >
          Search
        </button>
      </form>
    </div>
  );
}
