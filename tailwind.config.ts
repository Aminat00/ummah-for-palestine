import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "palestine-flag":
          "linear-gradient(to right, #CE1126 0%, #CE1126 20%, transparent 20%), linear-gradient(to bottom, #000000 0%, #000000 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #007A3D 66.66%, #007A3D 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
