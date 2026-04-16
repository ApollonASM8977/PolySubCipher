interface Step {
  input: string
  output: string
  position: number | null
  key_used: string | null
  cycle: number | null
  type: 'letter' | 'passthrough'
}

interface Props {
  steps: Step[]
  mode: 'encrypt' | 'decrypt'
}

export default function StepsTable({ steps, mode }: Props) {
  if (!steps.length) return null

  return (
    <div className="space-y-2">
      <p className="text-xs text-term-muted uppercase tracking-widest">
        Step-by-step trace — {steps.filter(s => s.type === 'letter').length} letters processed
      </p>
      <div className="rounded-lg border border-term-border overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-5 gap-0 bg-term-card border-b border-term-border text-xs text-term-muted uppercase tracking-widest">
          <div className="px-3 py-2">Pos</div>
          <div className="px-3 py-2">Input</div>
          <div className="px-3 py-2">Key</div>
          <div className="px-3 py-2">Cycle</div>
          <div className="px-3 py-2">Output</div>
        </div>
        {/* Rows */}
        <div className="max-h-64 overflow-y-auto">
          {steps.map((s, i) => {
            const rowClass = s.type === 'passthrough'
              ? 'step-pass'
              : s.key_used === 'KEY_A' ? 'step-a' : 'step-b'
            return (
              <div
                key={i}
                className={`grid grid-cols-5 gap-0 border-b border-term-border/40 text-xs font-mono ${rowClass}`}
              >
                <div className="px-3 py-1.5 text-term-muted">
                  {s.position ?? '—'}
                </div>
                <div className={`px-3 py-1.5 font-bold ${s.type === 'passthrough' ? 'text-term-muted' : 'text-term-text'}`}>
                  {s.input === ' ' ? '·' : s.input}
                </div>
                <div className={`px-3 py-1.5 text-xs ${s.key_used === 'KEY_A' ? 'text-term-green' : s.key_used === 'KEY_B' ? 'text-term-amber' : 'text-term-muted'}`}>
                  {s.key_used ?? '—'}
                </div>
                <div className="px-3 py-1.5 text-term-muted">
                  {s.cycle ?? '—'}
                </div>
                <div className={`px-3 py-1.5 font-bold ${
                  s.type === 'passthrough' ? 'text-term-muted' :
                  mode === 'encrypt' ? 'text-term-amber' : 'text-term-green'
                }`}>
                  {s.output === ' ' ? '·' : s.output}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* Legend */}
      <div className="flex gap-4 text-xs text-term-muted">
        <span><span className="text-term-green">■</span> KEY_A — positions 1,2,4</span>
        <span><span className="text-term-amber">■</span> KEY_B — position 3</span>
      </div>
    </div>
  )
}
