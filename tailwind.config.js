/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Rebuild.net exact palette
        dark:    '#22223e',
        darker:  '#5f5f79',
        muted:   '#9c9cb4',
        light:   '#e8e8e8',
        lighter: '#d9d9e0',

        rb: {
          red:           '#ac1d24',
          'red-shade':   '#8a1f1f',
          'red-tint':    '#f5d5d6',
          blue:          '#6ba1cc',
          'blue-shade':  '#3d5f83',
          'blue-tint':   '#d5e8f0',
          green:         '#669e67',
          'green-shade': '#316139',
          'green-tint':  '#d4ecd4',
          blush:         '#e1aeb0',
          'blush-tint':  '#f5e8e8',
          blonde:        '#f4e2d2',
          orange:        '#bf6e36',
          'orange-tint': '#f4e2d2',
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
        enable:  { DEFAULT: '#669e67', light: '#d4ecd4' },
        grow:    { DEFAULT: '#6ba1cc', light: '#d5e8f0' },
        protect: { DEFAULT: '#ac1d24', light: '#f5d5d6' },
        accent:  { DEFAULT: '#bf6e36', light: '#f4e2d2' },
      },
      fontFamily: {
        mono: ['"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
