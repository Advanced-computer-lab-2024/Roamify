export const toKebabCase = (str) => {
  return str
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Insert dashes before uppercase letters in camelCase
    .replace(/_/g, "-") // Replace underscores with dashes
    .toLowerCase();
};
