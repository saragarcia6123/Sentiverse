source .venv/bin/activate
pip install -r requirements.txt
nohup gunicorn -w 4 -k uvicorn.workers.UvicornWorker src.app:app --bind 127.0.0.1:8000 > uvicorn.log 2>&1 &
