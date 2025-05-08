import { ClassificationType } from "../types/ClassificationType";
import { POSITIVE_LABELS } from "../data/label_sets";

export default function PairChart({ pair }: { pair: ClassificationType }) {
  const positiveIndex: number = POSITIVE_LABELS.includes(pair.labels[0])
    ? 0
    : 1;
  const negativeIndex: number = positiveIndex == 0 ? 1 : 0;

  const positivePercentage = (pair.scores[positiveIndex] * 100).toFixed(2);
  const negativePercentage = (pair.scores[negativeIndex] * 100).toFixed(2);
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>{pair.labels[positiveIndex]}</div>
        <div>{pair.labels[negativeIndex]}</div>
      </div>
      <div className={`w-full h-8 flex`}>
        <div
          className={`bg-green-400 text-green-900 h-full flex justify-start pl-4 align-middle items-center rounded-l-full`}
          style={{
            width: `${positivePercentage}%`,
          }}
        >
          <span
            className="align-middle"
            style={{
              display: Number(positivePercentage) < 10 ? "none" : "auto",
            }}
          >
            {Math.round(Number(positivePercentage))}%
          </span>
        </div>
        <div
          className={`bg-red-400 text-red-900 h-full flex justify-end pr-4 align-middle items-center rounded-r-full`}
          style={{
            width: `${negativePercentage}%`,
          }}
        >
          <span
            className="align-middle"
            style={{
              display: Number(negativePercentage) < 10 ? "none" : "auto",
            }}
          >
            {Math.round(Number(negativePercentage))}%
          </span>
        </div>
      </div>
    </div>
  );
}
