/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Rebuild.net exact palette — mirrors Default.tokens.json
        dark:    '#22223e',
        darker:  '#5f5f79',
        muted:   '#9c9cb4',
        light:   '#e8e8e8',
        lighter: '#d9d9e0',
        white:   '#f7f8f9',   // brand near-white (overrides Tailwind default)

        rb: {
          // Red
          red:              '#ac1d24',
          'red-shade':      '#8a1f1f',
          'red-tint':       '#eddfe0',   // pale background (JSON: red-light)

          // Blue
          blue:             '#6ba1cc',
          'blue-shade':     '#3d5f83',
          'blue-tint':      '#e7ecf0',   // pale background (JSON: blue-light)

          // Green
          green:            '#669e67',
          'green-shade':    '#316139',
          'green-tint':     '#e6ece6',   // pale background (JSON: green-light)

          // Blush
          blush:            '#e1aeb0',
          'blush-shade':    '#b17d7d',
          'blush-tint':     '#f3edee',   // pale background (JSON: blush-light)

          // Orange
          orange:           '#bf6e36',
          'orange-shade':   '#9a5e2e',
          'orange-tint':    '#efe7e1',   // pale background (JSON: orange-light)

          // Blonde
          blonde:           '#f4e2d2',
          'blonde-tint':    '#f7ebe0',
          'blonde-light':   '#f4f3f1',
        },

        // Legacy aliases so existing code keeps working
        brand: {
          50:  '#f0f0f5',
          100: '#e0e0eb',
          200: '#c0c0d6',
          300: '#9c9cb4',
          400: '#5f5f79',
          500: '#22223e',
          600: '#1a1a30',
          700: '#141425',
          800: '#0e0e1a',
          900: '#08080d',
        },
        enable:  { DEFAULT: '#669e67', light: '#e6ece6' },
        grow:    { DEFAULT: '#6ba1cc', light: '#e7ecf0' },
        protect: { DEFAULT: '#ac1d24', light: '#eddfe0' },
        accent:  { DEFAULT: '#bf6e36', light: '#efe7e1' },
      },
      fontFamily: {
        mono: ['"ABC Social Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['"ABC Social Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
