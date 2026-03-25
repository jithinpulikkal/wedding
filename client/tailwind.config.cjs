/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#fbf3e6",
        gold: "#b7872c",
        maroon: "#6a1f1f",
        rose: "#e6b7b7",
        sage: "#5f7a5b",
        teak: "#3b2b21"
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        body: ["Source Serif 4", "serif"]
      },
      backgroundImage: {
        "temple-pattern": "radial-gradient(circle at 20% 20%, rgba(183, 135, 44, 0.18), transparent 45%), radial-gradient(circle at 80% 10%, rgba(183, 135, 44, 0.12), transparent 40%), linear-gradient(135deg, #fbf3e6 0%, #f7ebd8 45%, #f0dfc3 100%)",
        "paper": "radial-gradient(circle at top, rgba(255,255,255,0.6), transparent 55%), linear-gradient(180deg, #fbf3e6 0%, #f7ebd8 55%, #f1e0c6 100%)"
      },
      boxShadow: {
        royal: "0 20px 60px rgba(79, 40, 16, 0.22)",
        glow: "0 0 28px rgba(183, 135, 44, 0.35)"
      }
    }
  },
  plugins: []
};