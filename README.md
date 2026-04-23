# PolySubCipher

![Python](https://img.shields.io/badge/Python-3.11-blue?style=flat-square&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat-square&logo=fastapi)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red?style=flat-square)

> Polyalphabetic substitution cipher — web interface with step-by-step trace.  
> Original algorithm designed in Java (Information Security course), rewritten in Python.

---

## Cipher Mechanics

Two substitution alphabets alternate by character position (cycle of 4):

| Cycle position | Key used | Shift |
|:--------------:|:--------:|:-----:|
| 1, 2, 4        | KEY_A    | +19   |
| 3              | KEY_B    | +5    |

Non-alphabetic characters (spaces, digits, punctuation) pass through unchanged.

---

## Features

- 🔒 **Encrypt** plaintext using the 2-key polyalphabetic scheme
- 🔓 **Decrypt** ciphertext back to plaintext
- 📋 **Step-by-step trace** — see every character substitution in a table
- 🗝️ **Key schedule viewer** — inspect both substitution alphabets
- 📋 **Copy to clipboard** — one-click copy of the result
- ⚡ Terminal aesthetic UI (dark + green glow)

---

## Project Structure

```
PolySubCipher/
├── backend/
│   ├── cipher.py        # Cipher engine (encrypt / decrypt / trace)
│   ├── main.py          # FastAPI app — /encrypt, /decrypt
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   └── components/
│   │       └── StepsTable.tsx
│   ├── vite.config.ts
│   └── package.json
└── README.md
```

---

## API

| Method | Endpoint   | Body            | Description          |
|--------|-----------|-----------------|----------------------|
| POST   | /encrypt  | `{"text":"..."}` | Encrypt plaintext    |
| POST   | /decrypt  | `{"text":"..."}` | Decrypt ciphertext   |

**Response example:**
```json
{
  "input": "hello",
  "output": "czoof",
  "mode": "encrypt",
  "steps": [...],
  "key_schedule": {
    "KEY_A": "tuvwxyzabcdefghijklmnopqrs",
    "KEY_B": "fghijklmnopqrstuvwxyzabcde",
    "description": "Positions 1,2,4 ↑ KEY_A | Position 3 ↑ KEY_B (cycle of 4)"
  }
}
```

---

## Tech Stack

| Layer    | Technology                    |
|----------|-------------------------------|
| Backend  | Python 3.11, FastAPI, Uvicorn |
| Frontend | React 18, TypeScript, Vite    |
| Styling  | Tailwind CSS                  |

---

## Run Locally

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Frontend (separate terminal)
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Author

**Aboubacar Sidick Meite** — [@ApollonASM8977](https://github.com/ApollonASM8977)

---

© 2026 Aboubacar Sidick Meite (ApollonASM8977) — All Rights Reserved

