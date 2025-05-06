import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div
      id="pageLoading"
      className="flex align-middle justify-center w-full h-[20%]"
    >
      <div className="flex gap-2 items-center">
        <ClipLoader
          size={16}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <h3>Loading...</h3>
      </div>
    </div>
  );
}
