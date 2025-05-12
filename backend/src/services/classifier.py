import os
from typing import List
import ast
from dotenv import load_dotenv
from openai import OpenAI
import bleach


class Classifier:

    def __init__(self, model="gpt-3.5-turbo"):
        self.MODEL = model

        with open("res/instructions.txt") as f:
            self.INSTRUCTIONS = f.read()

        load_dotenv()
        OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

        self.CLIENT = OpenAI(api_key=OPENAI_API_KEY, timeout=10)

    def classify(self, text: str, label_sets: List[List[str]]):

        # Sanitize input
        text = bleach.clean(text, tags=[], strip=True)

        prompt = f"""
                text: {text}
                label_sets: {label_sets}
                """

        output = self.CLIENT.responses.create(
            model=self.MODEL,
            instructions=self.INSTRUCTIONS,
            input=prompt,
        )

        response = ast.literal_eval(output.output_text)

        return response
