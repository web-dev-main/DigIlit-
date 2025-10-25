import os
from typing import Optional

import typer
from rich import print as rprint

from .client import ApiClient

app = typer.Typer(help="Diglit API CLI")


@app.command()
def get(
    url: str = typer.Argument(..., help="Full URL or path relative to base-url"),
    base_url: Optional[str] = typer.Option(os.getenv("DIGLIT_BASE_URL"), help="Base URL for relative paths"),
    timeout: float = typer.Option(20.0, help="Request timeout in seconds"),
):
    """Perform a GET request and pretty print the response."""
    client = ApiClient(base_url=base_url or "", timeout_seconds=timeout)
    result = client.get(url)
    rprint(result)


@app.command()
def post(
    url: str = typer.Argument(..., help="Full URL or path relative to base-url"),
    json_body: Optional[str] = typer.Option(None, help="JSON body as string"),
    base_url: Optional[str] = typer.Option(os.getenv("DIGLIT_BASE_URL"), help="Base URL for relative paths"),
    timeout: float = typer.Option(20.0, help="Request timeout in seconds"),
):
    """Perform a POST request with optional JSON body."""
    client = ApiClient(base_url=base_url or "", timeout_seconds=timeout)
    payload = None
    if json_body:
        import json as _json
        payload = _json.loads(json_body)
    result = client.post(url, json=payload)
    rprint(result)


if __name__ == "__main__":
    app()
