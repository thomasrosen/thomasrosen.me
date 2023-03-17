
const rewireYAML = require('react-app-rewire-yaml')

module.exports = function override(config, env) {
  // Do stuff with the webpack config...

  config = rewireYAML(config, env)

  return config
}
