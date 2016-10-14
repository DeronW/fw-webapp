
const API_PATH = document.getElementById('api-path').value;

$FW.DOMReady(function() {    
    if($FW.Browser.inApp()) {    
        document.getElementById("header").style.display = "none";
        document.getElementById("openUserBtn").style.display = "none";
    } else {
        document.getElementById("openUserBtn").style.display = "block";
    }        

    document.getElementById("openUserBtn").onclick = function() {
        $FW.Ajax({
         url: API_PATH + "mpwap/api/v1/getOpenAccountInfo.shtml",
         enable_loading: true,
         success: function (data) {
             if(data.openStatus < 3) {
                window.location.href = "http://m.9888.cn/static/wap/open-account/index.html"
             } else if(data.openStatus == 3) {
                window.location.href = "http://m.9888.cn/static/wap/set-deal-password/index.html"
             } else if (data.openStatus > 3) {
                $FW.Component.Alert("已经开户成功");
             } else {
               
             }
         }

     });
    };
});

function backURL () {
    window.location.href = "http://m.9888.cn"
}

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={'徽商专题'} back_handler={backURL}/>, document.getElementById('header'))
});