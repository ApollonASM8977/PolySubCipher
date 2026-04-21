// Â© 2026 Aboubacar Sidick Meite (ApollonASM8977) â€” All Rights Reserved
import { useState } from 'react'
import axios from 'axios'
import { Lock, Unlock, Copy, Check, ChevronDown, ChevronUp, AlertCircle, Loader2 } from 'lucide-react'
import StepsTable from './components/StepsTable'

type Mode = 'encrypt' | 'decrypt'

interface CipherResult {
  input: string
  output: string
  mode: string
  steps: object[]
  key_schedule: { KEY_A: string; KEY_B: string; description: string }
}

const KEY_A = 'tuvwxyzabcdefghijklmnopqrs'
const KEY_B = 'fghijklmnopqrstuvwxyzabcde'
const ALPHA = 'abcdefghijklmnopqrstuvwxyz'

export default function App() {
  const [mode, setMode]       = useState<Mode>('encrypt')
  const [text, setText]       = useState('')
  const [result, setResult]   = useState<CipherResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [copied, setCopied]   = useState(false)
  const [showSteps, setShowSteps] = useState(false)
  const [showKeys, setShowKeys]   = useState(false)

  const handleSubmit = async () => {
    if (!text.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const { data } = await axios.post<CipherResult>(`/api/${mode}`, { text })
      setResult(data)
      setShowSteps(false)
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const d = e.response?.data?.detail
        if (d) setError(String(d))
        else if (!e.response) setError('Cannot reach the server â€” make sure the backend is running on port 8000.')
        else setError(`Server error ${e.response.status}`)
      } else setError('Unexpected error.')
    } finally {
      setLoading(false)
    }
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result.output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative min-h-screen bg-term-bg">
      <div className="scanline" />

      <div className="relative z-10 flex flex-col items-center px-4 py-10 min-h-screen">
        {/* Header */}
        <header className="w-full max-w-2xl mb-8 space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-term-green glow-green text-2xl font-bold font-mono">{'>'}</span>
            <h1 className="text-2xl font-bold font-mono tracking-widest text-term-green glow-green uppercase">
              PolySubCipher
            </h1>
          </div>
          <p className="text-xs text-term-muted font-mono">
            Polyalphabetic substitution cipher â€” 2-key alternating scheme Â· positions 1,2,4 â†’ KEY_A Â· position 3 â†’ KEY_B
          </p>
          <div className="h-px bg-term-border w-full" />
        </header>

        <main className="w-full max-w-2xl space-y-4">
          {/* Mode selector */}
          <div className="flex rounded-lg overflow-hidden border border-term-border">
            {(['encrypt', 'decrypt'] as Mode[]).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setResult(null); setError('') }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-mono uppercase tracking-widest transition-all
                  ${mode === m
                    ? m === 'encrypt'
                      ? 'bg-term-green/10 text-term-green border-b-2 border-term-green'
                      : 'bg-term-amber/10 text-term-amber border-b-2 border-term-amber'
                    : 'text-term-muted hover:text-term-text bg-term-card'
                  }`}
              >
                {m === 'encrypt' ? <Lock size={13} /> : <Unlock size={13} />}
                {m}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="space-y-2">
            <label className="text-xs text-term-muted uppercase tracking-widest">
              {mode === 'encrypt' ? 'Plaintext' : 'Ciphertext'}
            </label>
            <textarea
              rows={4}
              className="term-input w-full px-4 py-3 rounded-lg text-sm"
              placeholder={mode === 'encrypt' ? 'Enter message to encrypt...' : 'Enter ciphertext to decrypt...'}
              value={text}
              onChange={e => { setText(e.target.value); setResult(null); setError('') }}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || loading}
            className={`w-full py-3 rounded-lg font-mono text-sm font-bold uppercase tracking-widest transition-all
              disabled:opacity-30 disabled:cursor-not-allowed
              ${mode === 'encrypt'
                ? 'bg-term-green text-term-bg hover:shadow-[0_0_20px_#39ff1440]'
                : 'bg-term-amber text-term-bg hover:shadow-[0_0_20px_#ffb30040]'
              }`}
          >
            {loading
              ? <span className="flex items-center justify-center gap-2"><Loader2 size={15} className="animate-spin" /> Processing...</span>
              : mode === 'encrypt' ? 'ðŸ”’  Encrypt' : 'ðŸ”“  Decrypt'
            }
          </button>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-red-950/30 border border-red-800/40">
              <AlertCircle size={15} className="text-red-400 mt-0.5 shrink-0" />
              <p className="text-sm text-red-400 font-mono">{error}</p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="space-y-4">
              {/* Output box */}
              <div className="rounded-lg border border-term-border bg-term-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-term-muted uppercase tracking-widest">
                    {mode === 'encrypt' ? 'Ciphertext' : 'Plaintext'}
                  </p>
                  <button
                    onClick={copy}
                    className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-term-muted hover:text-term-green hover:bg-term-green/10 transition-colors border border-term-border"
                  >
                    {copied ? <Check size={12} className="text-term-green" /> : <Copy size={12} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className={`font-mono text-sm break-all ${mode === 'encrypt' ? 'text-term-amber glow-amber' : 'text-term-green glow-green'}`}>
                  {result.output}
                </p>
              </div>

              {/* Key schedule info */}
              <div>
                <button
                  onClick={() => setShowKeys(s => !s)}
                  className="flex items-center gap-2 text-xs text-term-muted hover:text-term-text transition-colors w-full"
                >
                  {showKeys ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  <span className="uppercase tracking-widest">Key Schedule</span>
                </button>
                {showKeys && (
                  <div className="mt-2 rounded-lg border border-term-border bg-term-card p-4 space-y-2 font-mono text-xs">
                    <div className="flex gap-3 items-start">
                      <span className="text-term-green w-14 shrink-0">KEY_A</span>
                      <span className="text-term-text tracking-widest">{ALPHA}</span>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="text-term-green w-14 shrink-0 invisible">â€”</span>
                      <span className="text-term-amber tracking-widest">{KEY_A}</span>
                    </div>
                    <div className="h-px bg-term-border my-1" />
                    <div className="flex gap-3 items-start">
                      <span className="text-term-amber w-14 shrink-0">KEY_B</span>
                      <span className="text-term-text tracking-widest">{ALPHA}</span>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="text-term-amber w-14 shrink-0 invisible">â€”</span>
                      <span className="text-term-green tracking-widest">{KEY_B}</span>
                    </div>
                    <p className="text-term-muted pt-1">{result.key_schedule.description}</p>
                  </div>
                )}
              </div>

              {/* Step trace */}
              <div>
                <button
                  onClick={() => setShowSteps(s => !s)}
                  className="flex items-center gap-2 text-xs text-term-muted hover:text-term-text transition-colors w-full"
                >
                  {showSteps ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  <span className="uppercase tracking-widest">Step-by-step trace</span>
                  <span className="text-term-muted/50">({result.steps.length} chars)</span>
                </button>
                {showSteps && (
                  <div className="mt-2">
                    <StepsTable steps={result.steps as never} mode={mode} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <p className="text-center text-term-muted/30 text-xs font-mono pt-4">
            v1.0.0 Â· Original algorithm by Aboubacar Sidick Meite Â· Ported from Java
          </p>
          <p className="text-right text-term-muted/20 text-xs font-mono mt-1 pr-1">Â© ASM</p>
        </main>
      </div>
    </div>
  )
}

