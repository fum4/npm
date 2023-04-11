export interface ConfigOptions {
  key?: string;
  setValues(values: Values): void;
  setToStorage?(key: string, values: string): void;
  getFromStorage?(key: string): any;
  encode?(values: Values): any;
  decode?(values: string): any;
  include?: string[];
  exclude?: string[];
}

export interface PersistOptions extends ConfigOptions {
  values: Values;
}

export type PersistProps = PersistOptions;
export type Values = Record<string, any>;
