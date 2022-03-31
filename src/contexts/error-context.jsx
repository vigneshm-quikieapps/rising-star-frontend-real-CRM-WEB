import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

import { WarningDialog } from "../components";
import { transformError } from "../utils";

const ErrorContext = createContext();

const { Provider } = ErrorContext;

export const ErrorDialogProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const removeError = useCallback(() => setError(null), []);

  const errorMessage = useMemo(() => transformError(error), [error]);

  return (
    <Provider value={{ setError }}>
      <>
        {children}
        <WarningDialog
          open={!!error}
          title="Error"
          description={errorMessage}
          onAccept={removeError}
          acceptButtonTitle="OK"
        />
      </>
    </Provider>
  );
};

export const useSetError = () => {
  const { setError } = useContext(ErrorContext);
  return setError;
};
