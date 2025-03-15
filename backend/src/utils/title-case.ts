export default function toTitleCase(name: string) {
    // Create an array for non-alphabets.
    const nonAlpha = ["/", "[", "]", "{", "}", "(", ")", "#", "$", "%", "&", "*", "+", "=", ";", ":", "<", ">", "?", "@", "~", "\\", "|", "^", "`", '"'];
    // Remove non alphabets from string.
    name = name.split("").filter(char => !nonAlpha.includes(char)).join("");

    // Return title case string.
    return name.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}
