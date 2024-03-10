import { classNames } from './classNames'

describe('classNames should concat string correctly', () => {
  test('only first arg', () => {
    expect(classNames('class1')).toBe('class1 ')
  })
  test('with mods', () => {
    expect(classNames('class1', { visible: true })).toBe('class1 visible')
  })
  test('with all args', () => {
    expect(classNames('class1', { visible: true }, ['scrollable'])).toBe(
      'class1 scrollable visible'
    )
  })
})
