'use strict';
const API_PATH = document.getElementById('api-path').value;

$FW.DOMReady(function () {
    NativeBridge.setTitle('购物车');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"购物车"} back_handler={backward}/>, document.getElementById('header'));
    $FW.Ajax({
        url: API_PATH + "mall/api/member/v1/user_level_points.json",
        enable_loading: true,
        success: function (data) {

        }
    });
    ReactDOM.render(<VipZone/>, document.getElementById('cnt'));
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}