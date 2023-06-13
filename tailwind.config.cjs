/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class', '[data-mode="dark"]'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				mobile: '480px'
			},
			colors: {
				surface: {
					DEFAULT: '#fcfffaf4',
					text: { DEFAULT: '#141414', muted: '#868181' },
					dark: {
						DEFAULT: '#011723',
						text: { DEFAULT: '#ffffffd5', muted: '#beb9b9' }
					}
				},
				'secondary-surface': {
					DEFAULT: '#fff',
					text: { DEFAULT: '#141414', muted: '#868282' },
					dark: {
						DEFAULT: '#042d43',
						text: { DEFAULT: '#ffffffd5', muted: '#a0a0a0' }
					}
				},
				primary: {
					DEFAULT: '#18b918',
					text: '#fff'
				},
				secondary: {
					DEFAULT: '#2643e3',
					text: '#fff'
				},
				success: {
					DEFAULT: '#3dfc3d',
					text: '#141414'
				},
				error: {
					DEFAULT: '#ec1342',
					text: '#fff'
				},
				warning: {
					DEFAULT: '#f3c230',
					text: '#141414'
				},
				info: {
					DEFAULT: '#2fa5d8',
					text: '#141414'
				}
			}
		}
	},

	plugins: []
};
