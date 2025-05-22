from typing import List
from src.schema import ClassificationResults
from src.services.classifier import Classifier
from src.services.text_utils import clean_text

classifier = Classifier()


def classify(
    text: str,
    label_sets: List[List[str]],
) -> List[ClassificationResults]:
    text_clean = clean_text(
        text=text,
        preserve_format=False,
        section_labels=False,
        bracket_content=False,
        lowercase=True,
        punctuation=False,
    )
    output = classifier.classify(text_clean, label_sets)
    return [ClassificationResults(labels=set[0], scores=set[1]) for set in output]
