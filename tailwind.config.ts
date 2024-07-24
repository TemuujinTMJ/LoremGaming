import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      spacing: {
        '100': '25rem',
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        bold: '700',
      },
      screens: {
        'md': '928px',
      },
      colors: {
        primary: '#04295a',
        secondary: '#939499',
        active: '#483eff'
      },
      backgroundColor: {
        main: '#eef5ff',
        primary: '#04295a',
        step: '#bde2ff',
        active: '#f8f9fe',
        activebtn: '#483eff'
      },
      borderColor: {
        active: '#534c99'
      },
      fontSize: {
        xxs: "11px"
      },
      margin: {
        '18': '4.5rem',
      }
    },
  },
  plugins: [],
};

export default config;