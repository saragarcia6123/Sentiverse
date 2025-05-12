import { useQuery } from "@apollo/client";
import { CLASSIFY } from "../queries";
import { ClipLoader } from "react-spinners";
import { ClassificationType } from "../types/ClassificationType";
import { LABEL_PAIRS } from "../data/label_sets";
import PairChart from "./PairChart";
import DOMPurify from "dompurify";

export default function Classification({ lyrics }: { lyrics: string }) {
  const { loading, error, data } = useQuery(CLASSIFY, {
    variables: {
      text: DOMPurify.sanitize(lyrics),
      labelSets: LABEL_PAIRS.map((row) =>
        row.map((cell) => DOMPurify.sanitize(cell))
      ),
    },
  });

  if (loading)
    return (
      <ClipLoader
        className="m-8"
        size={16}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );

  if (error) return <h2>`Error classifying results: ${error.message}`</h2>;

  const { classify }: { classify: ClassificationType[] } = data;

  return (
    <div className="px-8 py-16 flex flex-col gap-2 justify-center w-full max-w-2xl">
      <div className="flex flex-col gap-2">
        {classify.map((pair: ClassificationType) => (
          <PairChart pair={pair} />
        ))}
      </div>
    </div>
  );
}
