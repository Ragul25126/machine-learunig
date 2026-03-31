"""
ML Viz Lab — FastAPI Backend
Production-ready entry point with CORS, error handling, versioned API, and health check.
"""

import os
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# ── Configuration ──────────────────────────────────────────────────────────────
DEBUG = os.getenv("DEBUG", "false").lower() == "true"
PORT = int(os.getenv("PORT", 8000))
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")

# ── App Instance ───────────────────────────────────────────────────────────────
app = FastAPI(
    title="ML Viz Lab API",
    description="Backend API for the ML Viz Lab interactive learning platform.",
    version="1.0.0",
    docs_url="/docs" if DEBUG else None,       # hide Swagger in production unless DEBUG
    redoc_url="/redoc" if DEBUG else None,
)

# ── CORS Middleware ────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# ── Global Error Handlers ──────────────────────────────────────────────────────
@app.exception_handler(404)
async def not_found_handler(request: Request, exc):
    return JSONResponse(
        status_code=404,
        content={"error": "Not found", "path": str(request.url.path)},
    )

@app.exception_handler(500)
async def server_error_handler(request: Request, exc):
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error. Please try again later."},
    )

# ── Health Check ───────────────────────────────────────────────────────────────
@app.get("/health", tags=["System"])
async def health_check():
    """Returns service status. Used by deployment platforms (Render, Railway)."""
    return {"status": "ok", "version": "1.0.0"}

# ── API Router: v1 ─────────────────────────────────────────────────────────────
from api.router import router as api_v1_router
app.include_router(api_v1_router, prefix="/api/v1")

# ── Dev server entry ───────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=DEBUG)
