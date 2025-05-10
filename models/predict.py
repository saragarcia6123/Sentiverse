# Prediction interface for Cog ⚙️
# https://cog.run/python

# Example usage:
# cog predict -i text="What a beautiful day!" -i label_sets="[['happy', 'sad']]"

from typing import List
from cog import BasePredictor, Input, Path
from classifier import Classifier
from text_utils import clean_text


class Predictor(BasePredictor):
    def setup(self) -> None:
        """Load the model into memory to make running multiple predictions efficient"""
        self.model = Classifier()

    def predict(
        self,
        text: str = Input(description="String of text"),
        label_sets: List[List[str]] = Input(description="2D list of label options"),
    ) -> List:
        """Run a single prediction on the model"""
        text = clean_text(text)
        return self.model.classify(text, label_sets)
