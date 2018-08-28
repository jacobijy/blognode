export default function jsonp(
    url: string,
    option: { callbackName?: string, timeout?: number } = { callbackName: 'jsonp', timeout: 0 }) {
    let callbackName = option.callbackName;
    let timeout = option.timeout;
    let target = document.getElementsByTagName('script')[0] || document.head;
    let timer: number;
    let script = document.createElement('script');
    script.id = `jsonp_${callbackName}`;
    script = document.createElement('script');
    script.src = url;
    target.parentNode.insertBefore(script, target);

    const cleanUp = () => {
        document.head.removeChild(script);
        delete (window as any)[callbackName];
        if (timer) {
            clearTimeout(timer);
        }
    };

    return new Promise((resolve, reject) => {
        if (timeout) {
            timer = window.setTimeout(() => {
                cleanUp();
                reject(new Error('Timeout'));
            }, timeout);
        }
        (window as any)[callbackName] = (response: Response) => {
            cleanUp();
            resolve(response);
        };
    });
}
