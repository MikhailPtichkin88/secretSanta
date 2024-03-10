import { parseCommentDate, parseDate } from './parseDate'

describe('parseDate function', () => {
  test('correctly parses and formats date string', () => {
    const dateString = '2024-03-10T12:00:00Z'

    const result = parseDate(dateString)

    expect(result).toBe('10.03.2024')
  })
})

describe('parseCommentDate function', () => {
  test('correctly parses and formats comment date string', () => {
    const dateString = '2024-03-10T14:30:00Z'

    const result = parseCommentDate(dateString)

    expect(result).toBe('17:30, 10.03.2024')
  })
})
