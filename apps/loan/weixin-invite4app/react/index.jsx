$FW.DOMReady(function () {
    let inviteCode = $FW.Format.urlQuery().yqm;
    $(".activity-btn").click(function () {
        $(".mask").show();
    });

    $(".close-btn").click(function () {
        $(".mask").hide();
    });
    $("#tab-content").height($(document).height() - 440 + "px");
    $("#yqm").text(inviteCode);
    $(".invite-btn").click(function(){
        NativeBridge.share({
            title: '掌上钱包，随用随取',
            image: 'https://static.9888.cn/images/loan/invitation.jpg',
            link: `https://m.easyloan888.com/static/loan/outside-register/index.html?channelCode=OFFICIAL&invitationCode=${inviteCode}&jumpType=wx`,
            desc: '缺钱不用愁，注册放心花，借款神器，急速到账'
        })
    });
})
