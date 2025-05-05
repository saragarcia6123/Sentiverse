FROM python:3.13-slim

# Disable bytecode (.pyc) cache
ENV PYTHONDONTWRITEBYTECODE=1

# Ensures  stdout and stderr streams are sent straight to terminal 
ENV PYTHONUNBUFFERED=1

# Set working directory inside the container
WORKDIR /code

# Copy requirements
COPY ./requirements.txt /code/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy .env
COPY ./.env /code/.env

# Copy the rest of the app’s source code
COPY . .

# Expose port 8080
EXPOSE 8080

# Run the FastAPI application using uvicorn server
CMD ["uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "8080"]
