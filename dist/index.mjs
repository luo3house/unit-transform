/** 保留N位小数，不执行四舍五入，保留0位小数=取整 */ function formatDecimal(dec, fixes) {
    const scale = Math.pow(10, fixes);
    const atoi = (val)=>parseInt(`${val}`, 10) || 0;
    return atoi(dec * scale) / scale;
}

function createUnitTransform(options) {
    var _options_scale;
    const scale = (_options_scale = options.scale) !== null && _options_scale !== void 0 ? _options_scale : 0;
    const unit = options.unit;
    const transform = {
        formatScale: (anyTemp)=>formatDecimal(anyTemp, scale),
        isC: ()=>unit === 'c',
        isF: ()=>unit === 'f',
        c2val: (c)=>Math.floor(transform.formatScale(c) * Math.pow(10, scale)),
        val2c: (c)=>transform.formatScale(parseFloat(`${parseInt(`${c}`, 10) / Math.pow(10, scale)}`)),
        c2f: (c)=>transform.formatScale(parseFloat(`${parseFloat(`${c * 1.8 + 32}`)}`)),
        f2c: (f)=>transform.formatScale(parseFloat(`${parseFloat(`${(f - 32) / 1.8}`)}`)),
        val2cf: (val)=>transform.c2cf(transform.val2c(val)),
        c2cf: (c)=>unit === 'c' ? transform.formatScale(c) : transform.c2f(c),
        f2cf: (f)=>unit === 'f' ? transform.formatScale(f) : transform.f2c(f),
        cf2c: (cORf)=>unit === 'c' ? transform.formatScale(cORf) : transform.f2c(cORf),
        cf2f: (cORf)=>unit === 'f' ? transform.formatScale(cORf) : transform.c2f(cORf),
        cf2val: (cORf)=>unit === 'c' ? transform.c2val(cORf) : transform.c2val(transform.f2c(cORf)),
        tempUnitString: ()=>unit === 'c' ? '℃' : '℉',
        displayTempByC: (c)=>`${transform.c2cf(c)} ${transform.tempUnitString()}`,
        displayTempByVal: (val)=>transform.displayTempByC(transform.val2c(val))
    };
    return transform;
}

export { createUnitTransform, formatDecimal };
