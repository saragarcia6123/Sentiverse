import { RefObject, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const songInput: RefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const song = songInput.current?.value || "";
    if (!song) {
      return;
    }

    const path = `/search?q=${encodeURIComponent(song)}`;
    navigate(path);
  }

  return (
    <div
      id="pageLanding"
      className="h-[100vh] w-full mb-32 flex justify-center items-center"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-row items-center gap-4 p-6 rounded-xl shadow-xl bg-gray-800/80 dark:bg-gray-800/90"
      >
        <input
          type="text"
          placeholder="Enter your favorite song"
          ref={songInput}
          className="md:w-96 rounded-full border border-gray-600 px-6 py-4 md:text-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
        />
        <button type="submit" className="button">
          <FaSearch size={20} />
        </button>
      </form>
    </div>
  );
}
