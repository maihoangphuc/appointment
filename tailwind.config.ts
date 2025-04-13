import type { Config } from "tailwindcss";
import { Colors } from "./src/themes/colors";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-light-bg': 'linear-gradient(to top, #ffffff 80%, #f8fafa, #fdffff)',
				'gradient-dark-bg': 'linear-gradient(to top, #000000 80%, #071d33, #1c2e44)',
			},
			borderRadius: {
				lg: '0.5rem',
				md: '0.375rem',
				sm: '0.25rem'
			},
			colors: {
				white: Colors.white,
				black: Colors.black,

				light: {
					bg: Colors.light.background,
					text: Colors.light.foreground,
					border: Colors.light.border,
					primary: Colors.light.primary,
					card: {
						bg: Colors.light.card.background,
						text: Colors.light.card.foreground
					},
					sidebar: {
						bg: Colors.light.sidebar.background,
						text: Colors.light.sidebar.foreground,
						border: Colors.light.sidebar.border
					},
					scrollbar: {
						thumb: Colors.light.scrollbar.thumb,
						track: Colors.light.scrollbar.track,
						button: Colors.light.scrollbar.button,
						buttonHover: Colors.light.scrollbar.buttonHover,
						thumbHover: Colors.light.scrollbar.thumbHover
					},
					form: {
						bg: Colors.light.form.background,
						border: Colors.light.form.border
					}
				},

				dark: {
					bg: Colors.dark.background,
					text: Colors.dark.foreground,
					border: Colors.dark.border,
					primary: Colors.dark.primary,
					card: {
						bg: Colors.dark.card.background,
						text: Colors.dark.card.foreground
					},
					sidebar: {
						bg: Colors.dark.sidebar.background,
						text: Colors.dark.sidebar.foreground,
						border: Colors.dark.sidebar.border
					},
					scrollbar: {
						thumb: Colors.dark.scrollbar.thumb,
						track: Colors.dark.scrollbar.track,
						button: Colors.dark.scrollbar.button,
						buttonHover: Colors.dark.scrollbar.buttonHover,
						thumbHover: Colors.dark.scrollbar.thumbHover
					},
					form: {
						bg: Colors.dark.form.background,
						border: Colors.dark.form.border
					}
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
