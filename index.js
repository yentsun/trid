import crypto from 'crypto';


export default class {

    constructor(options) {

        const defaultOptions = {
            length: 5,
            count: 0,
            prefix: null
        };
        const { prefix, length, count } = Object.assign(defaultOptions, options);
        this._prefix = prefix;
        this._length = length;
        this._rebase(count);
    }

    _rebase(count=0) {

        this._rnd = crypto.randomBytes(this._length)
            .toString('base64')
            .slice(0, this._length)
            .replace(/\//g, '_')
            .replace(/\+/g, '-');
        this._base = `${this._prefix ? this._prefix+'.' : ''}${this._rnd}`;
        this._count = count;
    }

    base() {

        return this._base;
    }

    seq() {

        ++this._count;
        if (this._count === Number.MAX_SAFE_INTEGER)
            this._rebase();
        return `${this._base}.${this._count}`;
    }
};
