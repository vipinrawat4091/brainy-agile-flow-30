
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Roboto', 'Google Sans', 'Inter', 'system-ui', 'sans-serif'],
				display: ['Google Sans', 'Roboto', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				'xs': ['11px', '1.4'],
				'sm': ['12px', '1.4'],
				'base': ['14px', '1.5'],
				'lg': ['16px', '1.5'],
				'xl': ['18px', '1.4'],
				'2xl': ['20px', '1.3'],
				'3xl': ['24px', '1.2'],
				'4xl': ['28px', '1.1'],
				'5xl': ['32px', '1.1'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Material Design Colors
				'md-primary': 'hsl(var(--md-primary))',
				'md-primary-variant': 'hsl(var(--md-primary-variant))',
				'md-secondary': 'hsl(var(--md-secondary))',
				'md-secondary-variant': 'hsl(var(--md-secondary-variant))',
				'md-surface': 'hsl(var(--md-surface))',
				'md-surface-variant': 'hsl(var(--md-surface-variant))',
				'md-background': 'hsl(var(--md-background))',
				'md-error': 'hsl(var(--md-error))',
				'md-on-primary': 'hsl(var(--md-on-primary))',
				'md-on-secondary': 'hsl(var(--md-on-secondary))',
				'md-on-surface': 'hsl(var(--md-on-surface))',
				'md-on-background': 'hsl(var(--md-on-background))',
				'md-on-error': 'hsl(var(--md-on-error))',
				'md-outline': 'hsl(var(--md-outline))',
				'md-outline-variant': 'hsl(var(--md-outline-variant))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'xl': '12px',
				'2xl': '16px',
				'3xl': '24px',
			},
			spacing: {
				'18': '4.5rem',
				'22': '5.5rem',
			},
			animation: {
				'fade-in': 'fadeIn 200ms ease-out',
				'slide-up': 'slideUp 200ms ease-out',
				'scale-in': 'scaleIn 150ms ease-out',
				'ripple': 'ripple 600ms linear',
				'fab-in': 'fabIn 200ms ease-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(8px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				scaleIn: {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				ripple: {
					'0%': { transform: 'scale(0)', opacity: '0.5' },
					'100%': { transform: 'scale(1)', opacity: '0' },
				},
				fabIn: {
					'0%': { opacity: '0', transform: 'scale(0) rotate(45deg)' },
					'100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
				},
			},
			boxShadow: {
				'md-1': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
				'md-2': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'md-3': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'md-4': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'md-5': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
