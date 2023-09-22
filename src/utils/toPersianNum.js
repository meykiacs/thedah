export function toPersianNum(num) {
  if (num?.toString()) {
    const persianNumbers = '۰۱۲۳۴۵۶۷۸۹';
    return new String(num).replace(/\d/g, function (d) {
      return persianNumbers[d];
    });
  }
  return num;
}
