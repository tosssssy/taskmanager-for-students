export const toStringYMD = (date: Date) => {
  const tmp = new Date(date)
  const stringDate =
    tmp.getFullYear() +
    '-' +
    toDoubleDigits(tmp.getMonth() + 1) +
    '-' +
    toDoubleDigits(tmp.getDate() - 1)

  return stringDate
}

// 0 埋め関数
export const toDoubleDigits = (num: number) => {
  return num < 10 ? '0' + String(num) : String(num)
}
