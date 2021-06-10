const conventionalCommitTypes = require('./commit-types');

module.exports = {
  types: conventionalCommitTypes,
  jiraMode: true,
  skipScope: false,
  maxHeaderWidth: 72,
  minHeaderWidth: 2,
  maxLineWidth: 100,
  jiraPrefix: 'ITCORE',
  jiraOptional: false
};
