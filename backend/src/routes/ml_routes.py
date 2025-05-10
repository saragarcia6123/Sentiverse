from typing import List
from src.schema import ClassificationResults
from src.services.classifier import Classifier

classifier = Classifier()


def classify(
    text: str,
    label_sets: List[List[str]],
) -> List[ClassificationResults]:
    output = classifier.classify(text, label_sets)
    return [ClassificationResults(labels=set[0], scores=set[1]) for set in output]
