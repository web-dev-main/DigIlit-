from diglit_api.client import ApiClient
import requests_mock


def test_get_json_success():
    client = ApiClient(base_url="https://example.com")
    with requests_mock.Mocker() as m:
        m.get("https://example.com/hello", json={"ok": True})
        res = client.get("/hello")
        assert res == {"ok": True}


def test_post_text_success():
    client = ApiClient(base_url="https://example.com")
    with requests_mock.Mocker() as m:
        m.post("https://example.com/submit", text="accepted")
        res = client.post("/submit", json={"x": 1})
        assert res == "accepted"
