const transformError = (error, customMessage = "something went wrong") => {
  error = error?.response?.data;
  let message = error?.message || customMessage;
  let errors = error?.errors;
  if (Array.isArray(errors) && errors.length > 0) {
    message = errors.reduce(
      (prev, errorObject) =>
        (prev += Object.values(errorObject).join("\n") + "\n"),
      ""
    );
  }
  console.log(message);
  return message;
};

export default transformError;
