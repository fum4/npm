import merge from "lodash/merge";

// @ts-nocheck

interface Configuration {
  render: () => any;
  renderOptions?: any;
  deepMerge?: boolean;
  handlers: Handlers;
}

interface Handlers {
  [string]: HandlerConfig;
}

interface HandlerConfig {
  handler: (...args: any) => any;
  defaultValue?: any;
}

const setupTestEnvironment = <T = Configuration>(defaultConfig: T) => {
  return (component: any, config: any) => {
    return createSetup(component, config, defaultConfig);
  };
};

const createSetup = <T>(
  component: any,
  config: { [string]: any; deepMerge?: boolean },
  defaultConfig: HandlerConfig
) => {
  return ({
    ...config,
    deepMerge = (defaultConfig.deepMerge = true),
    renderOptions = defaultConfig.renderOptions,
  }) => {
    const handlers = Object.entries(defaultConfig.handlers).map(
      ([name, defaultHandlerConfig]) => ({
        handler: defaultHandlerConfig.handler,
        value: deepMerge
          ? merge({}, defaultHandlerConfig.defaultValue, config[name])
          : config[name] || defaultHandlerConfig.defaultValue,
      })
    );

    return setupTest({
      component,
      handlers,
      render,
      renderOptions: deepMerge
        ? merge({}, defaultConfig.renderOptions, renderOptions)
        : renderOptions || defaultConfig.renderOptions,
    });
  };
};

const setupTest = ({ component, handlers, render, renderOptions }) => {
  handlers.forEach(({ handler, value }) => {
    if (value) {
      handler(value);
    }
  });

  return render(component, ...renderOptions);
};

export default setupTestEnvironment;
