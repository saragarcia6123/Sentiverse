source .venv/bin/activate
nohup gunicorn -w 4 -k uvicorn.workers.UvicornWorker src.app:app --bind 0.0.0.0:8080 > uvicorn.log 2>&1 &
