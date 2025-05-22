import re


def clean_text(
    text: str,
    preserve_format: bool = False,
    section_labels: bool = False,
    bracket_content: bool = False,
    lowercase: bool = True,
    punctuation: bool = False,
):
    """
    Processes text according to given options.

    If all params (except lowercase) are set to True
    only duplicate and trailing whitespace will be removed

    params:
        - text (str):
            The text to process

        - preserve_format (bool):
            Whether to preserve the default formatting
            Set to True to preserve new lines
            Set to False for plain text
            Useful for tokenization when dealing with AI models

        - section_labels (bool):
            Whether to keep section labels (ie. [Verse 1])
            Set to True to keep them
            Set to False to keep only the text themselves.

        - bracket_content (bool):
            Whether to keep text inside brackets
            Set to True to keep it
            Set to False to remove
            Useful for passing into AI models for analysis
            As content in brackets often contains filler words

        - lowercase (bool):
            Whether to convert the end result to lowercase.

        - punctuation (bool):
            Whether to keep punctuation and other special characters.
    """

    if not preserve_format:
        text = " ".join(text.splitlines())

    if not bracket_content:
        # Removes anything inside ()
        # eg. This is a (random) text -> This is a text
        text = re.sub(r"\(.*?\)", " ", text)
    else:
        # Remove trailing whitespace in between ()
        # eg. This is a ( random ) text -> This is a (random) text
        text = text.replace("( ", "(").replace(" )", ")")

    if not section_labels:
        # Removes anything inside []
        # eg. This is a [random] text -> This is a text
        text = re.sub(r"\[.*?\]", " ", text)

    # Remove trailing whitespace
    text = text.strip()

    # Remove duplicate white space
    text = re.sub(r"\s+", " ", text)

    if lowercase:
        text = text.lower()

    if not punctuation:
        text = re.sub(r"[^a-zA-Z0-9 ]", "", text)

    return text