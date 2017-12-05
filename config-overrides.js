const tsImportPluginFactory = require('ts-import-plugin');
const {
  getLoader
} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  const tsLoader = getLoader(
    config.module.rules,
    rule => rule.loader && (typeof rule.loader === 'string') && rule.loader.includes('ts-loader')
  );

  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [tsImportPluginFactory({
        libraryDirectory: 'es',
        libraryName: 'antd',
        style: true
      })]
    })
  };

  // FIXED Warning: The 'no-use-before-declare' rule requires type infomation.
  // const tsLintLoader = config.module.rules.find(conf => {
  //   return conf.loader && conf.loader.includes('tslint-loader');
  // });
  // tsLintLoader.options = tsLintLoader.options || {};
  // tsLintLoader.options.typeCheck = true;

  config = rewireLess.withLoaderOptions({
    modifyVars: {
      '@primary-color': '#1DA57A'
    }
  })(config, env);

  return config;
};
