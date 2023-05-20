import merge from "lodash/merge";

interface Configuration {
  render: (...args) => any;
  renderOptions?: any;
  deepMerge?: boolean;
  handlers: Handlers;
}

interface Handlers {
  [name: string]: HandlerConfig;
}

interface HandlerConfig {
  handler: (...args: any) => any;
  defaultValue?: any;
}

const setupTestEnvironment = (baseConfig: Configuration) => {
  return (component: any, config: any) => {
    return createSetup(component, config, baseConfig);
  };
};

const createSetup = (
  component: any,
  defaultConfig: { [key: string]: any; deepMerge?: boolean },
  baseConfig: Configuration
) => {
  return ({
    deepMerge = (baseConfig.deepMerge = true),
    renderOptions = baseConfig.renderOptions = {},
    ...config // TODO: move this up
  } = {}) => {
    const handlers = Object.entries(baseConfig.handlers).map(
      ([name, handlerConfig]) => ({
        handler: handlerConfig.handler,
        value: deepMerge
          ? merge({}, handlerConfig.defaultValue, defaultConfig[name], config[name])
          : config[name] || defaultConfig[name] || handlerConfig.defaultValue,
      })
    );

    return setupTest({
      component,
      handlers,
      render: baseConfig.render,
      renderOptions: deepMerge
        ? merge({}, baseConfig.renderOptions, renderOptions)
        : renderOptions || baseConfig.renderOptions,
    });
  };
};

const setupTest = ({ component, handlers, render, renderOptions }: any) => {
  handlers.forEach(({ handler, value }: any) => {
    if (value) {
      handler(value);
    }
  });

  return render(component, renderOptions);
};

export default setupTestEnvironment;
