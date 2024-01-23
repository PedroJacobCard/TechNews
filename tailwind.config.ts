import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "#204480",
        darkBlueHover: "#18325f",
      },
      fontSize: {
        oneRem: "1rem",
        twoRem: "2rem",
        threeRem: "3rem",
      },
      width: {
        signInLogo: "5rem",
      }
    },
  },
  plugins: [],
}
export default config
