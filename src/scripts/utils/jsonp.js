export default function (url, option) {
    let callbackName = option.callbackName || 'jsonp',
        timeout = option.timeout || 0,
        target = document.getElementsByTagName('script')[0] || document.head,
        timer;
    let script = document.createElement('script');
    script.id = `jsonp_${callbackName}`
    script = document.createElement('script');
    script.src = url;
    target.parentNode.insertBefore(script, target);

    const cleanUp = () => {
        document.head.removeChild(script);
        delete window[callbackName]
        if (timer) clearTimeout(timer);
    }

    return new Promise((resolve, reject) => {
        if (timeout) {
            timer = setTimeout(() => {
                cleanUp();
                reject(new Error('Timeout'));
            }, timeout);
        }
        window[callbackName] = function (response) {
            cleanUp();
            resolve(response);
        }
    });
}