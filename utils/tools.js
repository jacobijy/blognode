import { hash, compare } from "bcryptjs";
import moment from "moment";

moment.locale('zh-cn'); // 使用中文

// 格式化时间
export function formatDate(date, friendly) {
  date = moment(date);

  if (friendly) {
    return date.fromNow();
  } else {
    return date.format('YYYY-MM-DD HH:mm');
  }

}

export function validateId(str: string) {
  return (/^[a-zA-Z0-9\-_]+$/i).test(str);
}

export function bhash(str: string, callback) {
  hash(str, 10, callback);
}

export function bcompare(str: string, hash: string, callback) {
  compare(str, hash, callback);
}

export function getFileSuffix(str: string) {
  var index1 = str.lastIndexOf(".");
  var index2 = str.length;
  return str.substring(index1 + 1, index2);
}

export function getImageNameFromUrl(url: string) {
  const regex1 = /\/([^/?]+)\?/;
  if (regex1.test(url)) return url.split(regex1)[1];
  const array = url.split('/');
  return array[array.length - 1]
}