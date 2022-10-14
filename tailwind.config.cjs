/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./*.{html,js}'],
	theme: {
		extend: {
			colors: {
				theme: {
					light: '#b7d1d2',
					dark: '#0d0d25'
				},
				vividCerulean: {
					50: '#a5d3db',
					100: '#91d6e3',
					200: '#65d8f1',
					300: '#3ad2fa',
					400: '#16c3fa',
					500: '#00adef',
					600: '#0093d7',
					700: '#0475b4',
					800: '#0f5789',
					900: '#143958'
				},
				lakeBaikal: {
					50: '#9ebcca',
					100: '#87aec2',
					200: '#5e92b3',
					300: '#3d78a2',
					400: '#266092',
					500: '#184c81',
					600: '#123d6f',
					700: '#10315d',
					800: '#10264b',
					900: '#101d38'
				},
				sweetCherryRed: {
					50: '#ca9ebe',
					100: '#c287ac',
					200: '#b35e84',
					300: '#a23d5d',
					400: '#92263d',
					500: '#811828',
					600: '#6f121e',
					700: '#5d101c',
					800: '#4b101d',
					900: '#38101c'
				},
				chlorophyll: {
					50: '#caba9e',
					100: '#c2b587',
					200: '#afb35e',
					300: '#89a23d',
					400: '#679226',
					500: '#4f8118',
					600: '#436f12',
					700: '#3e5d10',
					800: '#3a4b10',
					900: '#343810'
				}
			}
		}
	},
	plugins: [],
	plugins: [require('daisyui')]
}
