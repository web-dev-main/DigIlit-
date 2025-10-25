# Diglit Python API

Python client and CLI for interacting with Diglit-compatible APIs.

## Install (editable)

```bash
python -m venv .venv && source .venv/bin/activate
pip install -e python[dev]
```

## CLI usage

```bash
export DIGLIT_BASE_URL=https://api.example.com
python -m diglit_api.cli get /status
```

## Library usage

```python
from diglit_api import ApiClient

client = ApiClient(base_url="https://api.example.com")
print(client.get("/status"))
```
