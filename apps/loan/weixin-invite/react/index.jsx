$FW.DOMReady(function () {
    var page = 1;
    var loadNextPage = true;
    $("#tab-content").height($(document).height() - 535 + "px");
    $(".tabs span").click(function () {
        var index = $(this).index();
        $(this).addClass('selected').siblings().removeClass('selected');
        $(".tab-content-item").eq(index).show().siblings().hide();
    });
    $(".get-btn").click(function () {
        $(".mask").show();
    });
    $(".mask").click(function () {
        $(this).hide();
    });
    function loadMoreHandler(done) {
        if (loadNextPage) {
            console.log(page);
            $FW.Post(`${API_PATH}api/userBase/v1/invitationRecord.json`, {
                pageIndex: page,
                pageSize: 20,
                userGid: $FW.Store.getUserDict().gid
            }).then((data) => {
            if (data.invitationRecord.length == 0 && page == 1) {
                $("#more").html("暂无数据");
            } else if (data.invitationRecord.length < 20 && page == 1) {
                $("#more").html("已经到结尾");
            }
            if (data.invitationRecord.length > 0 && page < 5) {
                var str = '';
                for (var i = 0; i < data.invitationRecord.length; i++) {
                    str += '<div class="invite-item">';
                    str += '<span class="phone-num">' + data.invitationRecord[i].mobile + '</span>';
                    str += '<span class="invite-status">' + data.invitationRecord[i].userStatus + '</span>';
                    str += '<span class="invite-date">' + data.invitationRecord[i].createTime + '</span>';
                    str += '</div>';
                }
                $(".tab-content-item-wrap2").append(str);
                page++;
            } else {
                loadNextPage = false
                $("#more").html("已经到结尾");
            }
            done && done();
            }, e => $FW.Capture(e));
        }
    }
    loadMoreHandler();
    $FW.Event.touchBottom(loadMoreHandler);
});
