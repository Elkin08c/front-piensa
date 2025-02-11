import { envConfig } from "../../config/environment";

const processError = (error) => {
  return `Name: ${error?.name} || Message: ${error?.message} || Code: ${error?.code}`;
};

const logError = (type, error) => {
  const errorMsg = processError(error);
  console.log(`${"[Error:" + type + "]"} || ${errorMsg}`);
};

const emitStateError = (callback, type, error) => {
  const errorMsg = processError(error).replace(/ \|\|{0,2} /g, "\n");

  callback({
    type: "[Error:" + type + "]",
    msg: errorMsg,
  });

  if (envConfig.EMIT_CONSOLE_LOGS) {
    logError(type, error);
  }
};

export { logError, emitStateError };
