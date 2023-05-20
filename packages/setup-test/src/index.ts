import merge from "lodash/merge";

interface Configuration {
  render: () => any;
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

const setupTestEnvironment = (defaultConfig: Configuration) => {
  return (component: any, config: any) => {
    return createSetup(component, config, defaultConfig);
  };
};

const createSetup = (
  component: any,
  config: { [key: string]: any; deepMerge?: boolean },
  defaultConfig: Configuration
) => {
  return ({
    deepMerge = (defaultConfig.deepMerge = true),
    renderOptions = defaultConfig.renderOptions,
    ...config // TODO: move this up
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
      render: defaultConfig.render,
      renderOptions: deepMerge
        ? merge({}, defaultConfig.renderOptions, renderOptions)
        : renderOptions || defaultConfig.renderOptions,
    });
  };
};

const setupTest = ({ component, handlers, render, renderOptions }: any) => {
  handlers.forEach(({ handler, value }: any) => {
    if (value) {
      handler(value);
    }
  });

  return render(component, ...renderOptions);
};

export default setupTestEnvironment;
