import { toJalaali } from "jalaali-js";

export function getFormattedPersianDateTime(utcDate) {
  // Get the end user's timezone offset in minutes
  const userTimezoneOffset = new Date().getTimezoneOffset();

  // Calculate the user's timezone offset in milliseconds
  const userTimezoneOffsetMs = userTimezoneOffset * 60 * 1000;

  // Calculate the local time by adding the timezone offset
  const localDate = new Date(utcDate.getTime() + userTimezoneOffsetMs);

  // Convert the local date to the Jalali calendar
  const jalaaliDate = toJalaali(localDate.getFullYear(), localDate.getMonth() + 1, localDate.getDate());

  // Define the names of the weekdays and months in Persian
  const weekdayNames = ['دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه', 'یکشنبه'];
  const monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

  // Convert the day and year to Persian numerals
  const persianNumeralMap = {
    0: '۰',
    1: '۱',
    2: '۲',
    3: '۳',
    4: '۴',
    5: '۵',
    6: '۶',
    7: '۷',
    8: '۸',
    9: '۹',
  };

  const persianDay = jalaaliDate.jd.toString().split('').map(digit => persianNumeralMap[digit]).join('');
  const persianYear = jalaaliDate.jy.toString().split('').map(digit => persianNumeralMap[digit]).join('');

  // Convert the hour and minute to Persian numerals
  const persianHour = localDate.getHours().toString().split('').map(digit => persianNumeralMap[digit]).join('');
  const persianMinute = localDate.getMinutes().toString().split('').map(digit => persianNumeralMap[digit]).join('');

  // Extract the components of the Jalali date
  const weekday = weekdayNames[jalaaliDate.jd % 7];
  const month = monthNames[jalaaliDate.jm - 1];

  // Format the date string
  const dateString = `تاریخ: ${weekday} ${persianDay} ${month} ${persianYear} ساعت: ${persianHour.padStart(2, '۰')}:${persianMinute.padStart(2, '۰')}`;

  return dateString;
}

export function getFormattedGregorianDateTime(utcDate) {
  const userTimezoneOffset = new Date().getTimezoneOffset();
  const userTimezoneOffsetMs = userTimezoneOffset * 60 * 1000;
  const localDate = new Date(utcDate.getTime() + userTimezoneOffsetMs);

  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  const formattedDate = localDate.toLocaleString('en-US', options);
  return formattedDate;
}
