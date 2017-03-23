$FW.DOMReady(function () {
    if ($FW.Browser.inApp()) {
        NativeBridge.setTitle('掌上钱包让你放心花');
    } else {
        ReactDOM.render(<Header title={'掌上钱包让你放心花'}/>, document.getElementById('header'));
    }
   $(".instruction-tap").click(function(){
       $(".mask").show();
   });
    $(".close").click(function(){
        $(".mask").hide();
    });
});
