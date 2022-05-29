import isCI from 'is-ci';

module.exports = (_on: any, config: { watchForFileChanges: any; baseUrl: string }) => {
  const isDev = config.watchForFileChanges
  if (!isCI) {
    config.baseUrl = isDev ? 'http://localhost:3000' : 'http://localhost:8811'
  }
  Object.assign(config, {
    integrationFolder: 'cypress/e2e',
    ignoreTestFiles: '**/*.+(exercise|final|extra-)*.js',
  })

  return config
}
