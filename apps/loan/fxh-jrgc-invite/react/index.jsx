const USER = $FW.Store.getUserDict();
$FW.DOMReady(function () {
    if ($FW.Browser.inApp()) {
        NativeBridge.setTitle('掌上钱包，随用随取');
    } else {
        ReactDOM.render(<Header title={'掌上钱包，随用随取'}/>, document.getElementById('header'));
    }
   $(".instruction-tap").click(function(){
       $(".mask").show();
   });
    $(".close").click(function(){
        $(".mask").hide();
    });
    $(".invite-btn").click(function(){
        NativeBridge.share({
            title:'掌上钱包，随用随取' , // 标题
            image: 'https://static.9888.cn/images/loan/invitation.jpg', // 图标
            link: `https://m.easyloan888.com/static/loan/outside-register/index.html?invitationCode=${USER.code}`, // 链接
            desc:'缺钱不用愁，注册放心花，借款神器，急速到账'  // 描述
        });
    });
});