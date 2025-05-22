# --- PREREQUISITES ---

for cmd in python3 pip3 node npm; do
  if ! command -v $cmd &> /dev/null; then
    echo "Error: '$cmd' is not installed or not in PATH."
    exit 1
  fi
done

# --- BACKEND ---

cd backend/

# Prompt until not empty
while [[ -z "$GENIUS_ACCESS_TOKEN" ]]; do
  read -s -p "Enter your GENIUS_ACCESS_TOKEN (https://genius.com/api-clients): " GENIUS_ACCESS_TOKEN
  echo
  [[ -z "$GENIUS_ACCESS_TOKEN" ]] && echo "GENIUS_ACCESS_TOKEN cannot be empty."
done

# Create and populate .env file with user input
touch .env
echo "GENIUS_ACCESS_TOKEN=$GENIUS_ACCESS_TOKEN" >> .env

# Setup python environment
python -m venv .venv
source .venv/bin/activate

# Install pip dependencies
pip install --upgrade pip && pip install -r requirements.txt

# Run FastAPI in the background
nohup fastapi dev src/app.py > fastapi.log 2>&1 &

# --- FRONTEND ---

cd ../frontend

# Install node modules
npm install

# Run Vite in the background
nohup npm run dev > vite.log 2>&1 &

# Open up frontend in the browser
if command -v xdg-open >/dev/null; then
  xdg-open http://localhost:5173
else
  echo "Open http://localhost:5173 in your browser."
fi