import { useQuery } from "@apollo/client";
import { CLASSIFY } from "../queries";
import { ClipLoader } from "react-spinners";
import { ClassificationType } from "../types/ClassificationType";
import { labels_sets } from "../../public/label_sets";

export default function Classification({ lyrics }: { lyrics: string }) {
  const { loading, error, data } = useQuery(CLASSIFY, {
    variables: {
      text: lyrics,
      labelSets: labels_sets,
    },
  });

  if (loading)
    return (
      <ClipLoader size={16} aria-label="Loading Spinner" data-testid="loader" />
    );

  if (error) return <h2>`Error classifying results: ${error.message}`</h2>;

  const { classify }: { classify: ClassificationType[] } = data;

  return (
    <div className="px-8 py-16 flex flex-col gap-2 justify-center w-full max-w-3xl">
      <div className="flex flex-col gap-2">
        {classify.map((pair: ClassificationType) => (
          <div className="grid grid-cols-2 gap-8">
            {pair.labels.map((label: string, index: number) => (
              <div className="grid grid-cols-2 gap-8">
                <p>{label}</p>
                <p className="text-right">{pair.scores[index] * 100}%</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
