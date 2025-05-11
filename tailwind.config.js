/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Switzer-Variable'],
      },
      colors: {
        background: {
          primary: {
            DEFAULT: "#FFFFFF",
            dark: "#121113",
          },
          secondary: {
            DEFAULT: "#FAF9FB",
            dark: "#1A191B",
          },
          contrast: {
            DEFAULT: "#121113",
            dark: "#FFFFFF",
          },
          border: {
            DEFAULT: "#DBD8E0",
            dark: "#3C393F",
          },
          subtle:{
            DEFAULT: "#84828E",
            dark: "#6F6D78",
          }
          ,
          onColor:{
            DEFAULT: "#FFFFFF",
            dark: "#FFFFFF",
          }
        },
        text: {
          primary: {
            DEFAULT: "#211F26",
            dark: "#EEEEF0",
          },
          secondary: {
            DEFAULT: "#65636D",
            dark: "#B5B2BC",
          },
          green:{
            DEFAULT: "#006933",
            dark: "#006933",
          }
        },
        brand: {
          default: {
            DEFAULT: "#DF1995",
            dark: "#CF0088",
          },
          interactive: {
            DEFAULT: "#FFE8F3",
            dark: "#3C1329",
          },
          border: {
            DEFAULT: "#F7BBD7",
            dark: "#72204E",
          },
          text: {
            DEFAULT: "#6C0045",
            dark: "#FFCEE6",
          },
        },
        accent: {
          default: {
            DEFAULT: "#0081A0",
            dark: "#00809F",
          },
          interactive: {
            DEFAULT: "#E2F5FC",
            dark: "#052B37",
          },
          border: {
            DEFAULT: "#ABD9EB",
            dark: "#00546A",
          },
          text: {
            DEFAULT: "#1A3B47",
            dark: "#B7EBFE",
          },
        },
        overlay: {
          DEFAULT: "rgba(0, 0, 0, 0.05)",
          dark: "rgba(255, 255, 255, 0.05)",
        },
      },
      // Define custom typography classes
      fontSize: {
        // Headings
        'h1': '30px',
        'h2': '24px',
        'h3': '18px',
        'h4': '16px',
        'h5': '14px',
        'h6': '14px',
        'h7': '12px',
        // Subheads and Paragraphs
        'subhead-1': '16px',
        'subhead-2': '14px',
        'subhead-3': '12px',
        'paragraph-1': '16px',
        'paragraph-2': '14px',
        'paragraph-3': '14px',
        'paragraph-4': '12px',
      },
      // Optional: Define custom weights if needed
      fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
      },
    },
  },
  plugins: [],
  darkMode: "class",
}