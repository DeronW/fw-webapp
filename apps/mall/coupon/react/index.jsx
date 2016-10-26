'use strict';
const API_PATH = document.getElementById('api-path').value;




$FW.DOMReady(function() {
    NativeBridge.setTitle('查看物流');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"查看物流"} back_handler={backward}/>, document.getElementById('header'));
    ReactDOM.render(<BankInfo/>, document.getElementById('cnt'));
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}