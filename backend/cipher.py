# © 2026 Aboubacar Sidick Meite (ApollonASM8977) — All Rights Reserved
"""
PolySubCipher — Polyalphabetic substitution cipher engine.

Original algorithm by Aboubacar Sidick Meite (Java, Information Security course).
Rewritten in Python with step-by-step tracing and no external file dependencies.

Cipher mechanics:
  Two substitution alphabets alternate by character position (cycle of 4):
    positions 1,2,4 ↑ KEY_A  (Caesar +19)
    position  3     ↑ KEY_B  (Caesar +5)
  Non-alphabetic characters pass through unchanged.
"""

import string

# ── Substitution tables (inlined from original .txt files) ────────────────────

KEY_A   = "tuvwxyzabcdefghijklmnopqrs"   # PolyKey2  (shift +19)
KEY_B   = "fghijklmnopqrstuvwxyzabcde"   # PolyKey1  (shift +5)
DEC_A   = "hijklmnopqrstuvwxyzabcdefg"   # Decrypt2  (reverse of KEY_A, shift +7)
DEC_B   = "vwxyzabcdefghijklmnopqrstu"   # Decrypt   (reverse of KEY_B, shift +21)

ALPHA   = string.ascii_lowercase          # abcdefghijklmnopqrstuvwxyz

# ── Key schedule (1-indexed, cycle of 4) ─────────────────────────────────────

def _key_for_position(pos: int, mode: str) -> str:
    """Return the substitution alphabet for the given 1-based position."""
    cycle = ((pos - 1) % 4) + 1          # 1,2,3,4,1,2,3,4,...
    if mode == "encrypt":
        return KEY_B if cycle == 3 else KEY_A
    else:
        return DEC_B if cycle == 3 else DEC_A


# ── Core transform ─────────────────────────────────────────────────────────────

def transform(text: str, mode: str) -> dict:
    """
    Encrypt or decrypt *text*.
    Returns a dict with the result and a step-by-step trace for each character.
    """
    assert mode in ("encrypt", "decrypt")

    result_chars: list[str] = []
    steps: list[dict] = []
    alpha_pos = 0  # counts only alphabetic characters

    for char in text:
        lower = char.lower()
        if lower in ALPHA:
            alpha_pos += 1
            key = _key_for_position(alpha_pos, mode)
            idx = ALPHA.index(lower)
            out_char = key[idx]
            result_chars.append(out_char)
            steps.append({
                "input":    lower,
                "output":   out_char,
                "position": alpha_pos,
                "key_used": "KEY_A" if key in (KEY_A, DEC_A) else "KEY_B",
                "cycle":    ((alpha_pos - 1) % 4) + 1,
                "type":     "letter",
            })
        else:
            result_chars.append(char)
            steps.append({
                "input":    char,
                "output":   char,
                "position": None,
                "key_used": None,
                "cycle":    None,
                "type":     "passthrough",
            })

    return {
        "input":  text,
        "output": "".join(result_chars),
        "mode":   mode,
        "steps":  steps,
        "key_schedule": {
            "KEY_A": KEY_A,
            "KEY_B": KEY_B,
            "description": "Positions 1,2,4 ↑ KEY_A | Position 3 ↑ KEY_B (cycle of 4)",
        },
    }


def encrypt(text: str) -> dict:
    return transform(text, "encrypt")


def decrypt(text: str) -> dict:
    return transform(text, "decrypt")

