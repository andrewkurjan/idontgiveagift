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
            }
        },
    },
    plugins: [],
} satisfies Config;
