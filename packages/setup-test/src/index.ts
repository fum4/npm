import merge from "lodash/merge";

interface Configuration {
  render: {
    handler: (...args) => any;
    options?: any;
  }
  deepMerge?: boolean;
  mocks: MocksConfig;
}

interface MocksConfig {
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
    renderOptions = baseConfig.render.options = {},
    ...config // TODO: move this up
  } = {}) => {
    const handlers = Object.entries(baseConfig.mocks).map(
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
      render: baseConfig.render.handler,
      renderOptions: deepMerge
        ? merge({}, baseConfig.render.options, renderOptions)
        : renderOptions || baseConfig.render.options,
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
