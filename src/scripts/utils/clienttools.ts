const getInfoFromCookies = (cookie : string) => {
    if (cookie !== '') {
        let array = cookie.split('$$$$');
        return array;
    }
    else {
        return '';
    }
};

const getCookie = (key: string) => {
    let name = key + '=';
    let ca = document.cookie.split(';');
    for (const c of ca) {
        let d = c.trim();
        if (d.indexOf(name) === 0) { return d.substring(name.length, d.length); }
    }
    return '';
};

const setCookie = (cname: string, cvalue: string, exdays = 30) => {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = 'expires=' + d.toGMTString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
};

const shotenString = (string: string, maxlength: number) => {
    return string.length <= maxlength ? string : string.slice(0, maxlength).concat('...');
};

const getSimpleText = (html: string) => {
    let re1 = new RegExp('<.+?>', 'g');// ??html?????????"g"????????????
    let msg = html.replace(re1, '');// ????????
    return msg;
};

export {
    getInfoFromCookies,
    getCookie,
    setCookie,
    shotenString,
    getSimpleText
};
