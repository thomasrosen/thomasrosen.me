const ReactCompilerConfig = {
  target: '19',
}

module.exports = () => ({
  plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
})
