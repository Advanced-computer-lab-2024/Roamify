export const camelToReg = (camelCase) => {
  return camelCase
    .replace(/([A-Z])/g, " $1") // Add a space before each uppercase letter
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
};
