export function getInfoFromCookies(cookie) {
  if (cookie != '') {
    let array = cookie.split('=');
    let new_array = array[1].split('$$$$');
    new_array.unshift(array[0]);
    return new_array;
  }
  else {
    return '';
  }
}