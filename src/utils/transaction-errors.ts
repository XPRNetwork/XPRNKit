import type { XPRNTransactionsError } from "./../interfaces/transaction-error-message";

const ERROR_REGEXP = /:\s([A-Za-z ]*)(#[ A-Za-z0-9_-]){0,1}$/
export function parseTransactionErrorMessage(rawMessage: string): XPRNTransactionsError {
  const parsedRawErrors = ERROR_REGEXP.exec(rawMessage);
  if (parsedRawErrors && parsedRawErrors[1]) return {
    rawMessage:rawMessage,
    message: parsedRawErrors[1],
    customErrorCode: parsedRawErrors[2] || ""
  };
  return {
    rawMessage:rawMessage,
    message: rawMessage,
    customErrorCode: ""
  }
}