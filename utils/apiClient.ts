import * as superagent from 'superagent';
import { config } from '../config';

export type methodName = 'get' | 'post' | 'put' | 'patch' | 'del' | 'delete';
const methods: methodName[] = ['get', 'post', 'put', 'patch', 'del'];

export function formatUrl(path: string) {
    const adjustedPath = path[0] !== '/' ? '/' + path : path;
    // Prepend `/api` to relative URL, to proxy to API server.
    return `/api/${config.default_api_version}${adjustedPath}`;
}

export default class ApiClient {
    get?: (...args: any[]) => void;
    post?: (...args: any[]) => void;
    put?: (...args: any[]) => void;
    patch?: (...args: any[]) => void;
    del?: (...args: any[]) => void;
    delete?: (...args: any[]) => void;
    constructor(req: superagent.Request) {
        methods.forEach((method) =>
            this[method] =
            (
                path: string,
                { params, data }: { params?: object, data?: object } = {}) => new Promise((resolve, reject) => {
                    const request = superagent[method](formatUrl(path));

                    if (params) {
                        request.query(params);
                    }

                    if (req.get('cookie')) {
                        request.set('cookie', req.get('cookie'));
                    }

                    if (data) {
                        request.send(data);
                    }

                    request.end((err, { body }: { body?: object } = {}) => {
                        return err ? reject(body || err) : resolve(body);
                    });
                }));
    }
    /*
     * There's a V8 bug where, when using Babel, exporting classes with only
     * constructors sometimes fails. Until it's patched, this is a solution to
     * "ApiClient is not defined" from issue #14.
     * https://github.com/erikras/react-redux-universal-hot-example/issues/14
     *
     * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
     *
     * Remove it at your own risk.
     */
    empty() {
        return;
    }
}
