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

            var F = $FW.Format.currency;

            var score = data.levelConfig;
            g('vip-0').innerText = '0-' + F(score.maxLv1);
            g('vip-1').innerText = F(score.minLv2) + '-' + F(score.maxLv2);
            g('vip-2').innerText = F(score.minLv3) + '-' + F(score.maxLv3);
            g('vip-3').innerText = F(score.minLv4) + '-' + F(score.maxLv4);
            g('vip-4').innerText = F(score.minLv5) + '以上';

            g('limitDays').innerText = F(data.limitDays);
            g('firstInvestAmount').innerText = F(data.firstInvestAmount);
            g('sendStore').innerText = F(data.sendStore);
            g('maxSendStore').innerText = F(data.sendStore * 100);


            g('limitDays2').innerText = F(data.limitDays);
            g('firstInvestAmount2').innerText = F(data.firstInvestAmount);
            g('sendStore2').innerText = F(data.sendStore);
        }
    });

    function g(id) {
        return document.getElementById(id)
    }
});