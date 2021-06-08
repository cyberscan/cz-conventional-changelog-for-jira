module.exports = {
  FEAT: {
    description: "A new feature",
    title: "Features",
  },
  FIX: {
      description: "A bug fix",
      title: "Bug Fixes",
  },
  DOCS: {
      description: "Documentation only changes",
      title: "Documentation",
  },
  REFACTOR: {
      description:
          "A code change that neither fixes a bug nor adds a feature",
      title: "Code Refactoring",
  },
  TEST: {
      description: "Adding missing tests or correcting existing tests",
      title: "Tests",
  },
  STYLE: {
      description:
          "Formatting changes that do not affect the meaning of the code",
      title: "Style Conventions",
  },
  BUILD: {
      description:
          "Changes that affect the build system or external dependencies",
      title: "Builds",
  },
  CI: {
      description: "Changes to our CI configuration files and scripts",
      title: "Continuous Integrations",
  },
  CHORE: {
      description: "Other changes that don't modify src or test files",
      title: "Chores",
  },
  REVERT: {
      description: "Reverts a previous commit",
      title: "Reverts",
  },
  PERF: {
      description: "A code change that improves performance",
      title: "Performance Improvements",
  },
};
