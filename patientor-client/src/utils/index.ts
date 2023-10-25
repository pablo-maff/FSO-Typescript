function isString(text: unknown): text is string {
  return typeof text === "string" || text instanceof String;
}

function parseErrorMessage(message: unknown): string {
  if (!isString(message)) {
    throw new Error("Error message is not a string");
  }

  return message;
}

export { isString, parseErrorMessage };
