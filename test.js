const assert = require('assert');
const TRID = require('./');


describe('trid', () => {

    const length = 3;
    const prefix = 'test';
    const trid = new TRID({prefix:'test', length});

    it('generates base id with desired length', (done) => {
        const base = trid.base();
        assert.equal(base.length, length + prefix.length + 1);
        done();
    });

    it('generates sequential id', (done) => {
        let seq = trid.seq();
        assert.equal(seq, `${trid.base()}.1`);
        seq = trid.seq();
        assert.equal(seq, `${trid.base()}.2`);
        seq = trid.seq();
        assert.equal(seq, `${trid.base()}.3`);
        done();
    });

    it('handles Number.MAX_SAFE_INTEGER', (done) => {
        const maxInt = 9007199254740991-1;
        const maxId = new TRID({count: maxInt});
        const base = maxId.base();
        maxId.seq();
        assert.notEqual(base, maxId.base());
        assert.equal(maxId._count, 0);
        done();
    });

});