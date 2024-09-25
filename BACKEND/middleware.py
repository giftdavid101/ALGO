# middleware.py
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Log request details
        print(f"Request: {request.method} {request.url}")

        # Call the next middleware or endpoint
        response: Response = await call_next(request)

        # Log response details
        print(f"Response: {response.status_code}")

        return response
