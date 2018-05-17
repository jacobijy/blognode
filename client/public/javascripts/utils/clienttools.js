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

const setCookie = (cname, cvalue, exdays = 30) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

export { getInfoFromCookies, getCookie, setCookie }