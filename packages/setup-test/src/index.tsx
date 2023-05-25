import React from "react";
import merge from "lodash/merge";

interface Configuration {
  render: {
    handler: (...args: any[]) => any;
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
  return (Component: any, config: any) => {
    return createSetup(Component, config, baseConfig);
  };
};

const createSetup = (
  Component: any,
  defaultConfig: { [key: string]: any; deepMerge?: boolean, props: Record<string, unknown> },
  baseConfig: Configuration
) => {
  return ({
    deepMerge = baseConfig.deepMerge !== false,
    renderOptions = baseConfig.render.options || {},
    ...config // TODO: move this up
  } = {}) => {
    const handlers = Object.entries(baseConfig.mocks).map(
      ([name, handlerConfig]) => ({
        handler: handlerConfig.handler,
        value: deepMerge
          // @ts-ignore
          ? merge({}, handlerConfig.defaultValue, defaultConfig[name], config[name])
          // @ts-ignore
          : config[name] || defaultConfig[name] || handlerConfig.defaultValue,
      })
    );

    return setupTest({
      Component,
      handlers,
      // @ts-ignore
      props: config.props,
      render: {
        handler: baseConfig.render.handler,
        options: deepMerge
          ? merge({}, baseConfig.render.options, renderOptions)
          : renderOptions || baseConfig.render.options,
      },
    });
  };
};

const setupTest = ({ Component, handlers, props = {}, render }: any) => {
  handlers.forEach(({ handler, value }: any) => {
    if (value) {
      handler(value);
    }
  });

  return render.handler(<Component {...props} />, render.options);
};

export default setupTestEnvironment;
