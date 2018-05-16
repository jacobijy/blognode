const getInfoFromCookies = (cookie) => {
    if (cookie != '') {
        let array = cookie.split('$$$$');
        return array;
    }
    else {
        return '';
    }
}

const getCookie = (key) => {
    let name = key + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }
    }
    return ''
}

export { getInfoFromCookies, getCookie }