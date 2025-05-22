import { useQuery } from "@apollo/client";
import { CLASSIFY } from "../queries";
import { ClipLoader } from "react-spinners";
import { ClassificationType } from "../types/ClassificationType";
import { LABEL_PAIRS, POSITIVE_LABELS } from "../data/label_sets";
import PairChart from "./PairChart";
import DOMPurify from "dompurify";
import { useEffect } from "react";

export default function Classification({ lyrics }: { lyrics: string }) {
  const { loading, error, data } = useQuery(CLASSIFY, {
    variables: {
      text: DOMPurify.sanitize(lyrics),
      labelSets: LABEL_PAIRS.map((row) =>
        row.map((cell) => DOMPurify.sanitize(cell))
      ),
    },
  });

  useEffect(() => {
    const results = document.getElementById("results");
    if (!loading && results) {
      results.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [loading]);

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
    <div
      id="results"
      className="px-8 py-16 flex flex-col gap-2 justify-center w-full max-w-2xl"
    >
      <div className="flex flex-col gap-2">
        {sortByPositiveScores([...classify]).map((pair: ClassificationType) => (
          <PairChart pair={pair} />
        ))}
      </div>
    </div>
  );
}

function sortByPositiveScores(
  classifications: ClassificationType[]
): ClassificationType[] {
  return classifications.sort((a, b) => {
    // Find the index of the positive label in the labels array
    const aPositiveScore = a.labels.reduce((score, label, index) => {
      return POSITIVE_LABELS.includes(label) ? a.scores[index] : score;
    }, 0);

    const bPositiveScore = b.labels.reduce((score, label, index) => {
      return POSITIVE_LABELS.includes(label) ? b.scores[index] : score;
    }, 0);

    // Sort in descending order
    return bPositiveScore - aPositiveScore;
  });
}
