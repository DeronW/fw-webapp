//取消下拉刷新
$FW.DOMReady($FW.Event.cancelSlideDownRefresh);

$FW.DOMReady(function () {
    //倒计时准备开始
    readyCounting(
        () => fnStartRedbag(
            (result) => fnShowResult(result)
        )
    );
})
