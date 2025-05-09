"""
----- EXAMPLE USAGE -----

classifier = Classifier()

classifier.classify(
    text="What a wonderful day!",
    label_sets=[
        ["JOY", "SORROW"],
        ["LOVE", "HATE"]
    ])
"""

from typing import List, Tuple
from functools import partial
from concurrent.futures import ThreadPoolExecutor
from transformers import pipeline, AutoTokenizer
import torch


class Classifier:

    def __init__(
        self,
        task: str = "zero-shot-classification",
        model: str = "roberta-large-mnli",
    ) -> None:
        tokenizer = AutoTokenizer.from_pretrained(model)
        device = "cuda:0" if torch.cuda.is_available() else "cpu"
        self.classifier = pipeline(
            task=task,
            model=model,
            device=device,
            framework="pt",
            torch_dtype=torch.float16,
            tokenizer=tokenizer,
        )

    def _classify_set(
        self,
        text: str,
        labels: List[str],
    ):
        scores_dict: dict = self.classifier(text, labels)
        labels = scores_dict["labels"]
        scores = [round(score, 2) for score in scores_dict["scores"]]
        return (labels, scores)

    def _classify_sets(
        self, text: str, label_sets: List[List[str]], num_workers: int = 4
    ) -> List:
        with ThreadPoolExecutor(max_workers=num_workers) as executor:
            futures = [
                executor.submit(partial(self._classify_set, text, labels))
                for labels in label_sets
            ]
            results = [future.result() for future in futures]

        return results

    def remove_duplicate_label_sets(
        self, label_sets: List[List[str]]
    ) -> List[List[str]]:
        unique_label_sets = list(set(tuple(label) for label in label_sets))
        return [list(label) for label in unique_label_sets]

    def classify(self, text: str, label_sets: List[List[str]]) -> List:
        label_sets = self.remove_duplicate_label_sets(label_sets)
        return self._classify_sets(text, label_sets)
