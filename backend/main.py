# Â© 2026 Aboubacar Sidick Meite (ApollonASM8977) â€” All Rights Reserved
"""PolySubCipher API â€” FastAPI backend."""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from cipher import encrypt, decrypt

# â”€â”€ App â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

app = FastAPI(
    title="PolySubCipher API",
    description="Polyalphabetic substitution cipher â€” encrypt & decrypt with step-by-step trace.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# â”€â”€ Models â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

class CipherRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000)


# â”€â”€ Routes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

@app.get("/")
def root():
    return {"name": "PolySubCipher API", "version": "1.0.0", "status": "running"}


@app.post("/encrypt")
def encrypt_text(req: CipherRequest):
    try:
        return encrypt(req.text)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/decrypt")
def decrypt_text(req: CipherRequest):
    try:
        return decrypt(req.text)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

