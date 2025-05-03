from typing import List

from src.services.text_utils import clean_text
from src.schema import ClassificationResults
from src.services.classifier import Classifier


model = Classifier()


async def classify(
    text: str,
    label_sets: List[List[str]],
) -> List[ClassificationResults]:
    text = clean_text(text)
    results = model.classify(text, label_sets)
    return [ClassificationResults(labels=set[0], scores=set[1]) for set in results]
