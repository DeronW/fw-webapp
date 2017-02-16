$FW.DOMReady(function () {
    $("#tab-content").height($(document).height()-535 + "px");
    $(".tabs span").click(function(){
        var index = $(this).index();
        $(this).addClass('selected').siblings().removeClass('selected');
        $(".tab-content-item").eq(index).show().siblings().hide();
    });
    $(".get-btn").click(function(){
        $(".mask").show();
    });
    $(".mask").click(function(){
        $(this).hide();
    });

    $FW.Ajax({
        url: `${API_PATH}api/userBase/v1/invitationRecord.json`,
        method: "post",
        data: {
            pageIndex:null,
            pageSize:null,
            userGid:null
        }
    }).then((data) => {

    }, e => $FW.Capture(e));


});
