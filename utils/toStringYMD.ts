export const toStringYMD = (date: Date) => {
  const tmp = new Date(date).toISOString()

  const stringDate = tmp.slice(0, 10)
  // const stringDate =
  //   tmp.getFullYear() +
  //   '-' +
  //   toDoubleDigits(tmp.getMonth() + 1) +
  //   '-' +
  //   toDoubleDigits(tmp.getDate())

  return stringDate
}

// 0 埋め関数
export const toDoubleDigits = (num: number) => {
  return num < 10 ? '0' + String(num) : String(num)
}
