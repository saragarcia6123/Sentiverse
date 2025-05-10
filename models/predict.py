# Prediction interface for Cog ⚙️
# https://cog.run/python

from cog import BasePredictor, Input, Path
from typing import List
from classifier import Classifier


class Predictor(BasePredictor):
    def setup(self) -> None:
        """Load the model into memory to make running multiple predictions efficient"""
        self.model = Classifier()

    def predict(
        self,
        text: str = Input(description="String of text"),
        label_sets: List[List[str]] = Input("2D array of labels"),
    ) -> Path:
        """Run a single prediction on the model"""
        return self.model.classify(text, label_sets)
