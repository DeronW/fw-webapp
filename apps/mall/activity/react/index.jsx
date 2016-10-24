const API_PATH = document.getElementById('api-path').value;

$FW.DOMReady(function () {
    let title = decodeURIComponent($FW.Format.urlQuery().title);
    if (title == "undefined") title = '商品列表';

    NativeBridge.setTitle(title);

    ReactDOM.render(<Header title={title}/>, document.getElementById('header'));

    let store = Redux.createStore(reducer, Redux.applyMiddleware(...[ReduxThunk.default]));

    window._store = store;

    let cnt = (
        <ReactRedux.Provider store={store}>
            <AppContainer />
        </ReactRedux.Provider>
    );

    ReactDOM.render(cnt, document.getElementById('cnt'));
});

function trim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, '')
}
