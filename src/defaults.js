const types = require("@dgc-org/commitlint-config-conventional-changelog-for-jira/src/types");

module.exports = {
    types: types,
    jiraMode: true,
    skipScope: false,
    maxHeaderWidth: 72,
    minHeaderWidth: 2,
    maxLineWidth: 100,
    jiraPrefix: "ITCORE",
    jiraOptional: false
};
