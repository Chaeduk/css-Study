module.exports = {
  types: [
    { value: ":sparkles: feat", name: "✨ feat:\tAdding a new feature" },
    { value: ":bug: fix", name: "🐛 fix:\tFixing a bug" },
    { value: ":memo: docs", name: "📝 docs:\tAdding docs" },
    {
      value: ":lipstick: style",
      name: "💄 style:\tAdd or update styles, ui or ux",
    },
    {
      value: ":recycle: refactor",
      name: "♻️ refactor:\tCode change that neither fixes a bug nor adds a feature",
    },
    { value: ":white_check_mark: test", name: "✅ test:\tAdding tests cases" },
    {
      value: ":truck: chore",
      name: "🚚 chore:\tChanges to the build process or auxiliary tools\n\t\tand libraries such as documentation generation",
    },
  ],
  allowBeakingChanges: ["feat", "fix"],
  allowCustomScopes: true,
};
