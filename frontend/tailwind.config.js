/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        term: {
          bg:      '#0d0d0d',
          surface: '#111111',
          card:    '#161616',
          border:  '#2a2a2a',
          green:   '#39ff14',
          dim:     '#22cc0a',
          amber:   '#ffb300',
          red:     '#ff3333',
          blue:    '#00aaff',
          text:    '#d4d4d4',
          muted:   '#555555',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Share Tech Mono"', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
