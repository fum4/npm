import { useMemo } from 'react';
import { type FormikValues, useFormikContext } from 'formik';
import configurePersist, { PersistOptions } from 'use-persist';

export interface FormikPersistProps
  extends Pick<
    PersistOptions,
    | 'key'
    | 'setToStorage'
    | 'getFromStorage'
    | 'include'
    | 'exclude'
    | 'encode'
    | 'decode'
  > {
  session?: boolean;
}

const FormikPersist = ({
  key = 'formikPersist',
  session = false,
  setToStorage,
  getFromStorage,
  include,
  exclude,
  encode,
  decode,
}: FormikPersistProps) => {
  const { values, setValues } = useFormikContext<FormikValues>();
  const storage = session ? sessionStorage : localStorage;

  const { usePersist } = useMemo(
    () =>
      configurePersist({
        key,
        setValues,
        setToStorage: setToStorage || storage.setItem,
        getFromStorage: getFromStorage || storage.getItem,
        include,
        exclude,
        encode,
        decode,
      }),
    [
      decode,
      encode,
      exclude,
      getFromStorage,
      include,
      key,
      setToStorage,
      setValues,
      storage.getItem,
      storage.setItem,
    ],
  );

  usePersist(values);

  return null;
};

export type PersistProps = FormikPersistProps;
export default FormikPersist;
