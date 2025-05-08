export const LABEL_PAIRS = [
  ["JOY", "SORROW"],
  ["LOVE", "HATE"],
  ["HOPE", "DESPAIR"],
  ["PEACE", "CHAOS"],
  ["STRENGTH", "WEAKNESS"],
  ["SUCCESS", "FAILURE"],
  ["FORGIVENESS", "RESENTMENT"],
  ["HARMONY", "DISORDER"],
  ["PASSION", "APATHY"],
  ["KINDNESS", "HOSTILITY"],
];

export const POSITIVE_LABELS = LABEL_PAIRS.map((pair) => pair[0])
export const NEGATIVE_LABELS = LABEL_PAIRS.map((pair) => pair[1])