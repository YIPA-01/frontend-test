import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],

    darkMode: 'class',
    
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
                'slide-in-from-top-2': {
                    '0%': { transform: 'translateY(-2%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                'slide-in-from-bottom-2': {
                    '0%': { transform: 'translateY(2%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                'slide-in-from-left-2': {
                    '0%': { transform: 'translateX(-2%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                'slide-in-from-right-2': {
                    '0%': { transform: 'translateX(2%)' },
                    '100%': { transform: 'translateX(0)' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'slide-in-from-top-2': 'slide-in-from-top-2 0.2s ease-out',
                'slide-in-from-bottom-2': 'slide-in-from-bottom-2 0.2s ease-out',
                'slide-in-from-left-2': 'slide-in-from-left-2 0.2s ease-out',
                'slide-in-from-right-2': 'slide-in-from-right-2 0.2s ease-out',
                'in': 'in 0.2s ease-out',
            },
        },
    },

    plugins: [
        require('tailwindcss-animate'),
    ],
}; 