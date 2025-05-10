import os
from dotenv import load_dotenv

load_dotenv()

proxy_ip = os.getenv("PROXY_IP")
proxy_port = os.getenv("PROXY_PORT")
proxy_user = os.getenv("PROXY_USER")
proxy_password = os.getenv("PROXY_PASSWORD")

if proxy_ip and proxy_port and proxy_user and proxy_password:
    proxies = {
        "http": f"http://{proxy_user}:{proxy_password}@{proxy_ip}:{proxy_port}",
        "https": f"http://{proxy_user}:{proxy_password}@{proxy_ip}:{proxy_port}",
    }
else:
    proxies = None
