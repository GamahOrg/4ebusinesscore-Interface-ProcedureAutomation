import { showAlert } from "./showAlert";

export const messageHandler = (
  message: string,
  statusEnum: number,
  intl?: any,
  callBack = () => {}
) => {
  const cleanedMessage = message?.replace(/-/g, " ");

  if (statusEnum === 0) {
    showAlert(false, cleanedMessage, intl, callBack);
  } else if (statusEnum === 1) {
    showAlert(true, cleanedMessage, intl, callBack);
  } else if (message) showAlert(false, message, intl, callBack);
  else showAlert(false, "AnErrorOccurred", intl, callBack);
};
