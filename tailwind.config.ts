import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-hind)", ...fontFamily.sans],
                montserrat: ["var(--font-montserrat)", ...fontFamily.sans],
            },
            colors: {
                appYellow: "#F4D03F",
            },
            keyframes: {
                rotateGradient: {
                    "0%": { backgroundPosition: "0% 0%" },
                    "25%": { backgroundPosition: "100% 0%" },
                    "50%": { backgroundPosition: "100% 100%" },
                    "75%": { backgroundPosition: "0% 100%" },
                    "100%": { backgroundPosition: "0% 0%" },
                },
            },
            animation: {
                rotateGradient: "rotateGradient 30s ease infinite",
            },
        },
    },
    plugins: [],
} satisfies Config;
