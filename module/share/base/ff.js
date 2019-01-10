/**
 * Javascript ES6 functional base
 */

!function(global) {
    const log = console.log;

    const keysL = function *(obj) {
        for (const k in obj) yield k;
    }

    const valuesL = function *(obj) {
        for (const k in obj) yield obj[k];
    }

    const entriesL = function *(obj) {
        for (const k in obj) yield [k, obj[k]];
    }

    const hasIter = (coll) => !!coll[Symbol.iterator];
    const collIter = (coll) => hasIter(coll) ? coll[Symbol.iterator]() : valuesL(coll);

    const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);
    const curryR = f => (a, b) => isUndefined(b) ? (b) => f(b, a) : f(a, b);

    const curryr = (fn) => {
      return function (a, b) {
          return arguments.length == 2 ? fn(a, b) : function(b) { return fn(b, a); };
      }
    };

    const identity = a => a;
    const not = a => !a;
    const noop = _ => _;
    const noopObj = _ => '';

    const isPlainObject = coll => coll.constructor == Object;
    const isUndefined = a => a === undefined;
    const isArray = Array.isArray;
    const isString = a => typeof a == 'string';

    const get = curryr(function(obj, key) {
        return obj == null ? undefined : obj[key];
    });

    const toString = coll => coll.toString();
    const first = arr => arr[0];
    const last = arr => arr[arr.length-1];

    const push = (arr, v) => (arr.push(v), arr);
    const push2 = curry((arr, v) => (arr.push(v), v));
    const set = (obj, k, v) => (obj[k] = v, obj);
    const set2 = curry((obj, kv) => (set(kv, obj), kv));

    const flip = f => (..._) => f(..._.reverse());

    // const go1 = (a, f) => a instanceof Promise ? a.then(f): f(a);

    const reduce = curry(function(f, coll, acc) {
        const iter = collIter(coll);
        acc = arguments.length == 2 ? iter.next().value : acc;
        for (const a of iter)
          acc = acc instanceof Promise ? acc.then(acc => f(acc, a)) : f(acc, a);
        return acc;
    });

    const go = (...args) => reduce((a, f) => f(a), args);
    const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
    const tap = (f, ...fs) => (arg, ...args) => go(f(arg, ...args), ...fs, _ => arg);

    class Break {
        constructor(value) { this.value = value; }
        static of(value) { return new Break(value); }
    }
    
    const reduceB = curry(function(f, coll, acc) {
      const iter = collIter(coll);
      return go(
          arguments.length == 2 ? iter.next().value : acc,
          function recur(acc) {
          let cur;
          while (!(cur = iter.next()).done && !(acc instanceof Break))
              if ((acc = f(acc, cur.value, Break.of)) instanceof Promise)
              return acc.then(recur);
          return acc instanceof Break ? acc.value : acc;
          });
    });

    const take = curry((l, iter) => {
      let res = [];
      iter = iter[Symbol.iterator]();
      return function recur() {
        let cur;
        while (!(cur = iter.next()).done) {
          const a = cur.value;
          if (a instanceof Promise) {
            return a
              .then(a => (res.push(a), res).length == l ? res : recur())
              .catch(e => e == pass ? recur() : Promise.reject(e));
          }
          res.push(a);
          if (res.length == l) return res;
        }
        return res;
      } ();
    });

    const takeAll = take(Infinity);

    const pass = Symbol('pass');

    const mapL = curry(function *(f, iter) {
      for (const a of iter) {
        yield go(a, f);
      }
    });

    const map = curry(pipe(mapL, takeAll));
    
    const filterL = curry(function *(f, iter) {
      for (const a of iter) {
        const b = go(a, f);
        if (b instanceof Promise) yield b.then(b => b ? a : Promise.reject(pass));
        else if (b) yield a;
      }
    });

    const filter = curry(pipe(filterL, takeAll));

    const flatL = function *(iter) {
      for (const a of iter) {
        if (hasIter(a)) for (const b of a) yield b
        else yield a;
      }
    };

    const flat = pipe(flatL, takeAll);

    const flatMapL = curry(pipe(mapL, flatL));

    const flatMap = curry(pipe(mapL, flat));

    const rangeL = function *(l) {
      log('minwoo zzaang');
      let i = -1;
      while (++i < l) yield i;
    };

    const range = pipe(rangeL, takeAll);

    const catchNoop = ([...arr]) =>
      (arr.forEach(a => a instanceof Promise ? a.catch(noop) : a), arr);

    const reduceC = curry((f, acc, iter) => iter ?
      reduce(f, acc, catchNoop(iter)) :
      reduce(f, catchNoop(acc)));

    const takeC = curry((l, iter) => take(l, catchNoop(iter)));

    const takeAllC = takeC(Infinity);

    const mapC = curry(pipe(mapL, takeAllC));

    const filterC = curry(pipe(filterL, takeAllC));

    const incSel = (parent, k) => {
      parent[k] ? parent[k]++ : parent[k] = 1;
      return parent;
    }
  
    const pushSel = (parent, k, v) => {  
      (parent[k] || (parent[k] = [])).push(v);
      return parent;
    }
  
    const catSel = (parent, k, v) => {
      parent[k] = (parent[k] || (parent[k] = [])).concat(...v);
      return parent;
    }
  
    const addSel = (parent, k, v) => {
      if (!parent.hasOwnProperty(k)) parent[k] = v;
      else parent[k] += v;
      return parent;
    }

    const values = coll => map(identity, coll instanceof Map ? coll.values() : collIter(coll));
    const keys = coll => map(identity, coll instanceof Map ? coll.keys() : keysL(coll));

    const findVal = curry((f, coll) => {
      const iter = collIter(coll);
      return function recur(res) {
          let cur;
          while ((cur = iter.next()) && !cur.done) {
              if ((res = f(cur.value)) !== undefined)
                  return go(res, res => res !== undefined ? res : recur());
          }
      }();
    });

    // const find = curry((f, coll) => findVal(a => go(a, f, bool => bool ? a : undefined), coll));
    const find = curry((f, iter) => go(iter, filterL(f), take(1), ([a]) => a));
    const each = curry((f, coll) => go(reduce((_, a) => f(a), coll, null), _ => coll));
    const none = curry(pipe(find, isUndefined));
    const some = curry(pipe(none, not));
    
    const every = curry((f, coll) => {
      let t = false;
      return go(find(pipe(f, not, b => (t = true, b)), coll), isUndefined, r => r && t);
    });

    const tryCatch = (tryF, args, catchF) => {
      try {
          let res = tryF(...args);
          return res instanceof Promise ? res.catch(catchF) : res;
      } catch (e) {
          return catchF(e);
      }
    };

    const pipeT = (f, ...fs) => {
      let catchF = tap(console.error), finallyF = identity, interceptors = [];
  
      const hook = (f, args) => go(
        find(itc => itc.predi(...args), interceptors),
        itc => itc ?
          Break.of(itc.body(...args)) :
          tryCatch(f, args, e => Break.of(catchF(e))));
  
      fs.push(identity);
      return Object.assign((...args) => go(
        reduceB((arg, f) => hook(f, [arg]), fs, hook(f, args)),
        finallyF
      ), {
        catch(...fs) {
          catchF = pipe(...fs);
          return this;
        },
        finally(...fs) {
          finallyF = pipe(...fs);
          return this;
        },
        addInterceptor(...fs) {
          let itc = { predi: pipe(...fs) };
          return (...fs) => {
            itc.body = pipe(...fs);
            interceptors.push(itc);
            return this;
          }
        }
      })
    }

    const negate = f => pipe(f, not);

    const reject = curry((f, coll) => filter(negate(f), coll));

    const compact = filter(identity);

    const contains = curry((list, target) => list.includes(target));

    const pick = curry((ks, obj) => reduce((acc, k) => {
      if (has(k, obj)) acc[k] = obj[k];
      return acc;
    }, ks, {}));

    const isMatch = curry((a, b) =>
      typeof a == 'function' ? !!a(b)
      :
      isArray(a) && isArray(b) ? every(v => b.includes(v), a)
      :
      typeof b == 'object' ? every(([k, v]) => b[k] == v, entriesL(a))
      :
      a instanceof RegExp ? b.match(a)
      :
      a == b
    );

    const findWhere = curry((w, coll) => find(isMatch(w), coll));

    function baseMatch(targets) {
      let cbs = [];

      function evl() {
        return go(cbs,
          find(pb => { return pb._case(...targets); }),
          pb => pb._body(...targets))
      }

      function _case(f) {
        cbs.push({ _case: typeof f == 'function' ? pipe(...arguments) : isMatch(f) });
        return _body;
      }
      _case.case = _case;

      function _body() {
        cbs[cbs.length-1]._body = pipe(...arguments);
        return _case;
      }

      _case.else = function() {
        _case(_=> true) (...arguments);
        return targets ? evl() : (...targets2) => ((targets = targets2), evl());
      };

      return _case;
    }

    const match = (..._) => baseMatch(_);
    match.case = (..._) => baseMatch(null).case(..._);

    const or = (...fs) => {
      const last = fs.pop();
      return (...args) =>
        go(fs,
          findVal(pipe(
            f => f(...args),
            a => a ? a : undefined)),
          a => a ? a : last(...args))
    };

    const and = (...fs) => {
      const last = fs.pop();
      return (...args) =>
        go(fs,
          findVal(pipe(
            f => f(...args),
            a => a ? undefined : a)),
          a => a === undefined ? last(...args) : a)
    };

    const baseSel = sep => curry((selector, acc) =>
      !selector ?
        acc
      :
      isArray(selector) ?
        reduce(flip(baseSel(sep)), selector, acc)
      :
      typeof selector == 'object' || typeof selector == 'function' ?
        findWhere(selector, acc)
      :
      reduce(
        (acc, key, s = key[0]) =>
          !acc ? acc :
          s == '#' ? findWhere({ id: key.substr(1) }, acc) :
          s == '[' || s == '{' ? findWhere(JSON.parse(key), acc) :
          acc[key],
        selector.split(sep),
        acc)
    );

    const sel = baseSel(/\s*>\s*/);
  
    const nodeF = f => (..._) =>
      new Promise((resolve, reject) =>
        f(..._, (err, val) => err ? reject(err) : resolve(val)
      ));
  
    const join = curry((sep = '', coll) =>
      reduce((a, b) => `${a}${sep}${b}`, coll));
  
    const mix = (strs, vals) => {
      let i = 0;
      return reduce((res, str) => `${res}${vals[i++]}${str}`, strs);
    };
  
    const merge = coll => reduce((acc, obj) =>
      reduce(
        (acc, [k, v]) => isArray(v) ? catSel(acc, k, v) : addSel(acc, k, v),
        entriesL(obj),
        acc),
      coll,
      {});
  
    const baseExtend = set => (obj, ...objs) =>
      reduce(flip(reduce(set)), map(entriesL, objs), obj);
  
    const has = curry((k, obj) => obj.hasOwnProperty(k));
  
    const extend = baseExtend(tap(set2));
    const defaults = baseExtend(tap((obj, kv) => has(kv[0], obj) || set2(obj, kv)));

    global.FF = {
        log,

        curry, curryR,

        go, pipe, pipeT, tap, 

        identity, not, noop, noopObj, negate,
        isUndefined, isArray, isPlainObject, isString, toString,
        first, last,
        contains,

        push, push2, set, set2,

        keysL, valuesL, entriesL,
        mapL, filterL, flatL, flatMapL, 
        rangeL,

        hasIter, collIter,
        
        take, takeAll,

        map, filter, reduce, reduceB, Break,
        values, keys,
        reject, compact,
        each,

        range,

        findVal, find, none, some, every, findWhere,
        
        flip, join, mix, merge, extend, defaults, nodeF,
        pick, has,

        isMatch, match, and, or,

        flat, flatMap, 

        get,
        
        mapC, filterC, reduceC,
        takeC, takeAllC
    }
} (typeof window != 'undefined' ? window : global);