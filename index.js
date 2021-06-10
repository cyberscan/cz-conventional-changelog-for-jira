'format cjs';

const engine = require('./engine');
const conventionalCommitTypes = require('./commit-types');
const defaults = require('./defaults');
const configLoader = require('commitizen').configLoader;
const jiraApi = require('jira-client');

var config = configLoader.load();

function getEnvOrConfig(env, configVar, defaultValue) {
  const isEnvSet = Boolean(env);
  const isConfigSet = typeof configVar === 'boolean';

  if (isEnvSet) return env === 'true';
  if (isConfigSet) return configVar;
  return defaultValue;
}

const options = {
  types: conventionalCommitTypes,
  scopes: config.scopes,
  jiraMode: getEnvOrConfig(
    process.env.CZ_JIRA_MODE,
    config.jiraMode,
    defaults.jiraMode
  ),
  jiraHost: getEnvOrConfig(
    process.env.CZ_JIRA_HOST,
    config.jiraHost,
    defaults.jiraHost
  ),
  jiraUser: getEnvOrConfig(
    process.env.CZ_JIRA_USER,
    config.jiraUser,
    defaults.jiraUser
  ),
  jiraToken: getEnvOrConfig(
    process.env.CZ_JIRA_TOKEN,
    config.jiraToken,
    defaults.jiraUser
  ),
  skipScope: getEnvOrConfig(
    process.env.CZ_SKIP_SCOPE,
    config.skipScope,
    defaults.skipScope
  ),
  defaultType: process.env.CZ_TYPE || config.defaultType,
  defaultScope: process.env.CZ_SCOPE || config.defaultScope,
  defaultSubject: process.env.CZ_SUBJECT || config.defaultSubject,
  defaultBody: process.env.CZ_BODY || config.defaultBody,
  defaultIssues: process.env.CZ_ISSUES || config.defaultIssues,
  maxHeaderWidth:
    (process.env.CZ_MAX_HEADER_WIDTH &&
      parseInt(process.env.CZ_MAX_HEADER_WIDTH)) ||
    config.maxHeaderWidth ||
    defaults.maxHeaderWidth,
  minHeaderWidth:
    (process.env.CZ_MIN_HEADER_WIDTH &&
      parseInt(process.env.CZ_MIN_HEADER_WIDTH)) ||
    config.minHeaderWidth ||
    defaults.minHeaderWidth,
  maxLineWidth:
    (process.env.CZ_MAX_LINE_WIDTH &&
      parseInt(process.env.CZ_MAX_LINE_WIDTH)) ||
    config.maxLineWidth ||
    defaults.maxLineWidth,
  jiraOptional: getEnvOrConfig(
    process.env.CZ_JIRA_OPTIONAL,
    config.jiraOptional,
    defaults.jiraOptional
  ),
  jiraPrefix:
    process.env.CZ_JIRA_PREFIX || config.jiraPrefix || defaults.jiraPrefix
};

(function(options) {
  try {
    var commitlintLoad = require('@commitlint/load');
    commitlintLoad().then(function(clConfig) {
      if (clConfig.rules) {
        var maxHeaderLengthRule = clConfig.rules['header-max-length'];
        if (
          typeof maxHeaderLengthRule === 'object' &&
          maxHeaderLengthRule.length >= 3 &&
          !process.env.CZ_MAX_HEADER_WIDTH &&
          !config.maxHeaderWidth
        ) {
          options.maxHeaderWidth = maxHeaderLengthRule[2];
        }
      }
    });
  } catch (err) {}

  try {
    // If scopes are not pre-defined and Jira credentials have been provided, load
    // all labels from the Jira instance and treat them as possible scopes

    if (!options.skipScope && options.scopes && Array.isArray(options.scopes) && options.scopes.length > 0) {
      if (options.jiraHost && options.jiraUser && options.jiraToken) {
        const jira = new jiraApi({
          protocol: "https",
          host: options.jiraHost,
          username: options.jiraUser,
          password: options.jiraToken
        });

        const res = jira.genericGet("labels");
        console.log(res);
        if (Array.isArray(res.values) && res.values.length > 0) {
          options.scopes = res.values;
          console.log(options.scopes);
        } else {
          throw new Error("Failed to fetch labels from Jira");
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
})(options);

module.exports = engine(options);
