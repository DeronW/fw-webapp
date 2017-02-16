$FW.DOMReady(function() {
    if($FW.Browser.inApp()) {
        document.getElementById("header").style.display = "none";
    }        
});


$FW.DOMReady(function () {
    ReactDOM.render(<Header title={'徽商用户操作指引'}/>, HEADER_NODE)
});