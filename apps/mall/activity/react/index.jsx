$FW.DOMReady(function () {

    let bizNo = $FW.Format.urlQuery().bizNo;
    $FW.Ajax({
        url: `${API_PATH}/mall/api/index/v1/activity.json?bizNo=${bizNo}`,
        success: (data)=> {
            NativeBridge.setTitle(data.title);
            ReactDOM.render(<Header title={data.title}/>, document.getElementById('header'));
        }
    });

    let store = Redux.createStore(reducer, Redux.applyMiddleware(...[ReduxThunk.default]));

    window.__store = store;

    let cnt = (
        <ReactRedux.Provider store={store}>
            <AppContainer />
        </ReactRedux.Provider>
    );

    ReactDOM.render(cnt, document.getElementById('cnt'));
});