!function(global) {    
    const html = (strs, ...vals) => go(vals,
        map(v => isArray(v) ? v.join('') : isUndefined(v) ? '' : v),
        (vals, i=0) => reduce((res, str) => `${res}${vals[i++]}${str}`, strs));
  
    global.TTL = {
      html
    }
} (typeof window != 'undefined' ? window : global);