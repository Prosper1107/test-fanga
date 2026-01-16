/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
            colors: {
                fanga: {
                    green: '#22c55e', // Adjust to match fanga.io if needed, usually a vibrant green
                    black: '#000000',
                    white: '#ffffff',
                    dark: '#1a1a1a', // Softer black for backgrounds
                    light: '#f9fafb', // Off-white for dashboard bg
                }
            }
        },
    },
    plugins: [],
}
