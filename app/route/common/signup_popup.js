app.get('/common/signup_popup', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: `
        <link rel="stylesheet" href="/front/css/signup.css">
         `,
        header: `
        <div id="header">
            <h1 class="logo">
                <a href="/">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAAAaCAYAAADsZyMJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJCOTFCRDA1REI0NDExRTg4MkY3QTFCQUNEMDU1REIwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJCOTFCRDA2REI0NDExRTg4MkY3QTFCQUNEMDU1REIwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkI5MUJEMDNEQjQ0MTFFODgyRjdBMUJBQ0QwNTVEQjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkI5MUJEMDREQjQ0MTFFODgyRjdBMUJBQ0QwNTVEQjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5JrDadAAAJw0lEQVR42uxc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" class="logo" alt="spinprotocol logo">
                </a>
            </h1>
            <p class="tit">${__('signup')}</p>
        </div>
        `,
        main: `
        <div id="main">
            <div class="container">
                <div class="btn_wrap">
                    <p class="txt">어떤 역할로 가입을 하시나요?</p>
                    <a href="#" class="btn adv_signup">Advertiser</a>
                    <a href="#" class="btn inf_signup">Influencer</a>
                </div>
            </div>
        </div>
        `,
        footer: ``,
        script: `
        <script src="/front/script/common/signup_popup.js"></script>
        <script>
            go('.adv_signup', $, SignupPopup.Route.advSignup);
            go('.inf_signup', $, SignupPopup.Route.infSignup);
        </script>
        `
    }));
});