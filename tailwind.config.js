module.exports = {
  // purge: ["./src/**/*.html", "./src/**/*.ts", "./src/**/*.tsx"],
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        breadgray: {
          100: "#151515",
          200: "#121212",
        },
        breadpink: {
          100: "#C463CA",
          200: "#FF99E2",
        },
      },
    },
  },
  plugins: [],
};
