from unittest.mock import MagicMock

from main import get_events


def test_events_get_returns_empty_dict():
    fake_request = MagicMock()
    response = get_events(fake_request)
    assert response == '{"events": {}}'
