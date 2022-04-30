module.exports = {
  extends: ["gitmoji"],
  rules: {
    "header-max-length": [0, "always", 100],
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "test", "chore"],
    ],
  },
};
