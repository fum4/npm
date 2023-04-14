module.exports = {
  extends: ["next", "turbo", "prettier"],
  ignorePatterns: ["*.md"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  }
};
