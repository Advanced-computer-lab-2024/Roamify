export function toCamelCase(str) {
  return str
    .trim() // Remove leading/trailing spaces
    .split(/\s+/) // Split by spaces
    .map(
      (word, index) =>
        index === 0
          ? word.toLowerCase() // Lowercase first word
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize others
    )
    .join(""); // Join into a single string
}
