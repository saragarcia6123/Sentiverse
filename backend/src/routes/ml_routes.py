from typing import List

from src.schema import ClassificationResults
from src.services.classifier import Classifier


model = Classifier()


async def classify(
    lyrics: str,
    label_sets: List[List[str]],
) -> List[ClassificationResults]:
    results = model.classify(lyrics, label_sets)
    return [ClassificationResults(labels=set[0], scores=set[1]) for set in results]
