import type { Config } from 'tailwindcss';

const config: Config = {
  mode: 'jit',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{js,ts,jsx,tsx,mdx,css}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      mdOnly: { min: '768px', max: '1279px' },
      smOnly: { min: '0px', max: '767px' },
      lg: '1280px',
      notLg: { max: '1279px' },
      xl: '1440px',
    },

    extend: {
      backgroundImage: {
        gradientPrimary:
          'linear-gradient(295deg, #EBF4FE 0.85%, rgba(235, 244, 254, 0.00) 115.34%)',
        mainHero:
          'linear-gradient(90deg, #99C0FE 0%, #99C0FE 50%, #2D79F6 50%, #2D79F6 100%)',
        // mainHero: 'url(/images/hero_bg-main.webp)',
        auth: 'linear-gradient(to bottom,rgba(37, 101, 208, 0.32),rgba(37, 101, 208, 0.32)), url(/images/auth_bg.jpeg)',
        subjectCard: 'url(/images/subject_bg.svg)',
        progressBar:
          'linear-gradient(90deg, #2D79F6 0%, #2D79F6 91%, #CCD9ED 97%, #CCD9ED 100%)',
      },
      colors: {
        accent: '#2D79F6',
        accentGrey: '#CCD9ED',
        accentLight: '#99C0FE',
        orange: '#FFA232',
        orangeAlpha: '#FFA23288',
        black: '#000',
        darkBlue: '#344652',
        grey: '#AAAAAA',
        green: '#1ECB25',
        greenLight: '#D9F9E1',
        lightAlpha: 'rgba(99, 115, 129, 0.3)',
        lightBlue: '#F8FBFF',
        primaryDark: '#2E323F',
        red: '#f43f5e',
        redLight: '#FFF0F7',
        subjectBg: '#EBF4FE',
        textDark: '#2E323F',
        white: '#fff',
        primary: '#f5f6f9',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          sm: '1.25rem',
          md: '2rem',
        },
        screens: {
          sm: '480px',
          md: '768px',
          lg: '1280px',
        },
      },
      fontFamily: {
        montserrat: 'var(--font-montserrat)',
        overpass: 'var(--font-overpass)',
        nunito: 'var(--font-nunito-sans)',
      },
      fontSize: {
        '18/28': ['18px', '28px'],
        '14/20': ['14px', '20px'],
        '14/24': ['14px', '24px'],
        '14/28': ['14px', '28px'],
        '20/28': ['20px', '28px'],
        '28/36': ['28px', '36px'],
        '32/40': ['32px', '40px'],
        '36/48': ['36px', '48px'],
        '40/56': ['40px', '56px'],
      },
      rotate: {
        '30': '30deg',
        '60': '60deg',
        '90': '90deg',
        '120': '120deg',
        '150': '150deg',
        '180': '180deg',
        '210': '210deg',
        '240': '240deg',
      },
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '19': '4.75rem',
        '25': '6.25rem',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
export default config;
