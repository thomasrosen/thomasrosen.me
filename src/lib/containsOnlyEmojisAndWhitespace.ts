export function containsOnlyEmojisAndWhitespace(str: string) {
  const regex = /^[\p{Extended_Pictographic}\s]+$/u
  return regex.test(str)
}
