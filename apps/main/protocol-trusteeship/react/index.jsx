$FW.DOMReady(function () {
    ReactDOM.render(<Header title={'资金存管三方协议'}/>, document.getElementById('header'));

    $FW.Ajax({
        url: '',
        success: function (data) {
            document.getElementById('cnt').innerHTML = '暂无内容, 需求未定';
        }
    })
});