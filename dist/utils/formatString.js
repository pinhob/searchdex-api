export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function formatName(name) {
    const separetedName = name.split('-').join(' ');
    return capitalize(separetedName);
}
