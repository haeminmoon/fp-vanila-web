!function () {
    function $(sel, parent = document) {
        return parent.querySelector(sel);
    }

    $.all = (sel, parent = document) => parent.querySelectorAll(sel);

    $.find = curry($);

    $.findAll = curry($.all);

    $.closest = curry((sel, el) => el.closest(sel));

    $.els = htmlStr => {
        const container = document.createElement('div');
        container.innerHTML = htmlStr;
        return container.children;
    };

    $.el = pipe($.els, first);

    $.append = curry((parent, child) => parent.appendChild(child));

    $.prepend = curry((parent, child) => parent.insertBefore(child, parent.firstChild));

    $.on = function (el, event, sel, f, ...opts) {
        if (typeof el == 'string') { return el => $.on(el, ...arguments); }
        if (typeof sel != 'string') { return el.addEventListener(event, sel, f); }

        el.addEventListener(event, e => go(
            el,
            $.findAll(sel),
            find(el => el.contains(e.target)),
            currentTarget =>
                currentTarget &&
                f(defaults({ originalEvent: e, currentTarget, delegateTarget: el }, e))
        ));
        return el;
    };

    $.remove = el => el.parentNode.removeChild(el);

    $.text = el => el.textContent;

    $.html = el => el.innerHTML;

    $.setVal = curry((value, el) => el.value = value);
    $.setText = curry((value, el) => el.textContent = value);
    $.setHtml = curry((value, el) => el.innerHTML = value);

    $.val = el => el.value;
    $.trim = el => el.value.trim();

    $.attr = curry((kv, el) =>
        isString(kv) ?
            el.getAttribute(kv) :
            isArray(kv) ?
                el.setAttribute(...kv) :
                (each(kv => el.setAttribute(...kv), entriesL(kv)), el)
    );

    $.toJSON = pipe(
        $.findAll('[name]'),
        map(el => ({ [$.attr('name', el)]: $.val(el) })),
        (_) => extend(..._)
    );

    const resJSON = function (res) {
        return res.ok ? res.json() : Promise.reject(res);
    };

    const fetchBaseOpt = {
        headers: { "Content-Type": "application/json" },
        credentials: 'same-origin',
    };

    const fetchWithBody = method => curry((url, data) => go(
        fetch(url, Object.assign({
            method: method,
            body: JSON.stringify(data)
        }, fetchBaseOpt)),
        resJSON
    ));

    const fetchWithFile = method => curry((url, data) => go(
        fetch(url, Object.assign({
            method: method,
            body: data
        }))
    ));


    $.get = curry((url, paramObj) => go(
        fetch(
            url + (url.indexOf('?') == -1 ? '?' : '&') + $.param(paramObj),
            fetchBaseOpt),
        resJSON
    ));

    $.post = fetchWithBody('POST');
    $.postFormData = fetchWithFile('POST');
    $.put = fetchWithBody('PUT');
    $.delete = $.del = fetchWithBody('DELETE');

    $.param = pipe(entriesL, mapL(([k, v]) => `${k}=${v}`), join('&'));

    $.Status = {};

    $.status = s => sel($.statusSelector(s), $.Status.data);

    $.statusSelector = s => isString(s) ? s : $.elToStatusSelector(s);

    $.elToStatusSelector = (el, s = '') =>
        match($.attr('status', el))
            .case(a => a)(
                match
                    .case(/^\s*>/)(s1 => $.elToStatusSelector(el.parentNode, s1 + s))
                    .else(s1 => s1 + s))
            .else(
                _ => el,
                $.closest('[status]'),
                el => $.elToStatusSelector(el, s));

    $.statusAndParent = s => go(
        s,
        $.statusSelector,
        s => s.split(/\s*>\s*/),
        s => {
            const parent = sel(s.slice(0, -1), $.Status.data);
            const child = sel(last(s), parent);
            return [child, parent];
        }
    );

    $.openPopup = (url, name, option) => window.open(url, name, option);
    $.routing = (url) => _ => location.href = url;

    window.$ = $;
}();

