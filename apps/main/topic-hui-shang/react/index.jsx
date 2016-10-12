$FW.DOMReady(function() {    
    if($FW.Browser.inApp()) {    
        document.getElementById("header").style.display = "none";
        document.getElementById("openUserBtn").style.display = "none";
    }        
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={'徽商专题'}/>, document.getElementById('header'))
});