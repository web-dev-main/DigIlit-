from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, Optional

import requests


@dataclass
class ApiClient:
    base_url: str
    timeout_seconds: float = 20.0
    default_headers: Dict[str, str] = field(default_factory=dict)

    def _compose_url(self, path_or_url: str) -> str:
        if path_or_url.startswith("http://") or path_or_url.startswith("https://"):
            return path_or_url
        return f"{self.base_url.rstrip('/')}/{path_or_url.lstrip('/')}"

    def get(self, path_or_url: str, params: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None) -> Any:
        url = self._compose_url(path_or_url)
        response = requests.get(url, params=params, headers={**self.default_headers, **(headers or {})}, timeout=self.timeout_seconds)
        response.raise_for_status()
        if response.headers.get("content-type", "").startswith("application/json"):
            return response.json()
        return response.text

    def post(self, path_or_url: str, json: Optional[Dict[str, Any]] = None, data: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None) -> Any:
        url = self._compose_url(path_or_url)
        response = requests.post(url, json=json, data=data, headers={**self.default_headers, **(headers or {})}, timeout=self.timeout_seconds)
        response.raise_for_status()
        if response.headers.get("content-type", "").startswith("application/json"):
            return response.json()
        return response.text
