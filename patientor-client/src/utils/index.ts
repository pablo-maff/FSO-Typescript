function isString(text: unknown): text is string {
  return typeof text === "string" || text instanceof String;
}

function parseErrorMessage(message: unknown): string {
  if (!isString(message)) {
    throw new Error("Error message is not a string");
  }

  return message;
}

/**
 * Helper function for exhaustive type checking
 */
function assertNever(value: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

export { isString, parseErrorMessage, assertNever };
