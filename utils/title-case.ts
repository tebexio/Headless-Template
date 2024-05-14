/**
 * Convert a string to title case
 */
export default function (str: string): string {
    return str
        .toLowerCase()
        .split(" ")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
}
