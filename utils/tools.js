import { hash, compare } from "bcryptjs";
import moment from "moment";

moment.locale('zh-cn'); // 使用中文

// 格式化时间
exports.formatDate = (date, friendly) => {
  date = moment(date);

  if (friendly) {
    return date.fromNow();
  } else {
    return date.format('YYYY-MM-DD HH:mm');
  }

};

exports.validateId = (str) => {
  return (/^[a-zA-Z0-9\-_]+$/i).test(str);
};

exports.bhash = (str, callback) => {
  hash(str, 10, callback);
};

exports.bcompare = (str, hash, callback) => {
  compare(str, hash, callback);
};
