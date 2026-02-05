/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#1e40af",
                "primary-dark": "#1e3a8a",
                "emerald-accent": "#059669",
                "amber-accent": "#d97706",
                "background-light": "#f6f6f8",
                "background-dark": "#121520",
            },
            fontFamily: {
                "display": ["Plus Jakarta Sans", "sans-serif"],
                "sans": ["Inter", "sans-serif"],
                "poppins": ["Poppins", "sans-serif"]
            },
            borderRadius: {
                "3xl": "1.5rem",
                "4xl": "2rem",
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                '3d-btn': '0 4px 0 rgb(30, 58, 138), 0 8px 15px rgba(0,0,0,0.1)',
                '3d-btn-hover': '0 2px 0 rgb(30, 58, 138), 0 4px 8px rgba(0,0,0,0.1)',
                'soft-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
                '3d-card': '0 10px 30px -10px rgba(0,0,0,0.15), 0 20px 25px -5px rgba(0,0,0,0.1)',
            }
        },
    },
    plugins: [],
}
