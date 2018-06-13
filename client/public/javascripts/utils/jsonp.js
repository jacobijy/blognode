

export default function (url, option, callback) {
    let callbackName = option.callbackName || 'jsonp'
    let script = document.createElement('script');
    script.id = `jsonp_${callbackName}`
    script.src = url;
    document.head.appendChild(script);

    window[callbackName] = function (response) {
        document.head.removeChild(script);
        delete window[callbackName]
        return callback(response);
    }
}
