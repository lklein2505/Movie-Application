import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'custom-pattern': "url('/assets/background.jpg')", // Add your custom background image
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
      },
      backgroundRepeat: {
        'no-repeat': 'no-repeat',
        'repeat': 'repeat',
        'repeat-x': 'repeat-x',
        'repeat-y': 'repeat-y',
      },
      backgroundPosition: {
        'top-left': 'top left',
        'top-right': 'top right',
        'bottom-left': 'bottom left',
        'bottom-right': 'bottom right',
        'center': 'center',
      },
    },
  },
  plugins: [],
} satisfies Config;

