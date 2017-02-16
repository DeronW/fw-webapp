$FW.DOMReady(function () {
    if ($FW.Browser.inApp()) {
        document.getElementById("header").style.display = "none";
        document.getElementById("openUserBtn").style.display = "none";
    } else {
        document.getElementById("openUserBtn").style.display = "block";
    }

    document.getElementById("openUserBtn").onclick = function () {
        $FW.Ajax({
            url: API_PATH + "mpwap/api/v1/getOpenAccountInfo.shtml",
            enable_loading: true,
            success: function (data) {
                if (data.openStatus < 3) {
                    window.location.href = location.protocol + "//m.9888.cn/static/wap/open-account/index.html"
                } else if (data.openStatus == 3) {
                    window.location.href = location.protocol + "//m.9888.cn/static/wap/reset-deal-password/index.html"
                } else if (data.openStatus > 3) {
                    $FW.Component.Alert("已经开户成功");
                }
            }

        });
    };
});

function backURL() {
    window.location.href = location.protocol + "//m.9888.cn"
}

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={'金融工场徽商银行存管上线'} back_handler={backURL}/>, HEADER_NODE)
});