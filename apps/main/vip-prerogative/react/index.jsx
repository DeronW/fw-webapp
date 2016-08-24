const API_PATH = document.getElementById('api-path').value;

$FW.DOMReady(function () {
    if ($FW.Browser.inApp()) {
        NativeBridge.setTitle('升级攻略');
    } else {
        ReactDOM.render(<Header title={'升级攻略'}/>, document.getElementById('header'));
    }

    $FW.Ajax({
        url: API_PATH + 'mpwap/api/v1/upgrade-formula.shtml',
        success: function (data) {

            var score = data.levelScore;
            g('vip-0').innerText = '0-' + score.maxLv1;
            g('vip-1').innerText = score.minLv2 + '-' + score.maxLv2;
            g('vip-2').innerText = score.minLv3 + '-' + score.maxLv3;
            g('vip-3').innerText = score.minLv4 + '-' + score.maxLv4;
            g('vip-4').innerText = score.minLv5 + '以上';

            g('limitDays').innerText = data.limitDays;
            g('firstInvestAmount').innerText = data.firstInvestAmount;
            g('sendStore').innerText = data.sendStore;
            g('maxSendStore').innerText = data.sendStore * 100;


            g('limitDays2').innerText = data.limitDays;
            g('firstInvestAmount2').innerText = data.firstInvestAmount;
            g('sendStore2').innerText = data.sendStore;
        }
    });

    function g(id) {
        return document.getElementById(id)
    }
});