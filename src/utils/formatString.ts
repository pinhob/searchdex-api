export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatName(name: string): string {
  const separetedName = name.split('-').join(' ');
  return capitalize(separetedName);
}