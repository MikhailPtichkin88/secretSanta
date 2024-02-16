export const parseDate = (dateString: string): string => {
  const moscowTimeOffset = 3 * 60

  const inputDate = new Date(dateString)
  inputDate.setMinutes(inputDate.getMinutes() + moscowTimeOffset)
  const day = inputDate.getUTCDate().toString().padStart(2, '0')
  const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, '0')
  const year = inputDate.getUTCFullYear().toString()
  return `${day}.${month}.${year}`
}

export const parseCommentDate = (inputDateString: string): string => {
  const moscowTimeOffset = 3 * 60

  const inputDate = new Date(inputDateString)
  inputDate.setMinutes(inputDate.getMinutes() + moscowTimeOffset)

  const time = `${inputDate.getUTCHours()}:${inputDate
    .getUTCMinutes()
    .toString()
    .padStart(2, '0')}`
  const date = parseDate(inputDateString)

  return `${time}, ${date}`
}
