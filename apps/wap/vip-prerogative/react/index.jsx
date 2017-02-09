$FW.DOMReady(function () {
    if ($FW.Browser.inApp()) {
        NativeBridge.setTitle('升级攻略');
    } else {
        ReactDOM.render(<Header title={'升级攻略'}/>, HEADER_NODE);
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
        },
        fail: () => true
    });

    function g(id) {
        return document.getElementById(id)
    }


    $FW.getJSONP('https://www.9888.cn/api/userLevel/v1/giftVO.json', {}, function (data) {
        if (data.code != 10000) throw new Error('接口异常, 无法获取用户等级信息');

        var rule = data.data.levelGiftRule;
        for (var i = 0; i < rule.length; i++) {
            var interest = rule[i].addInterest;
            if (interest) {
                g("add-interest-text-" + i).innerHTML = interest.describe;
            }

            var birthday = rule[i].birthdayBag;
            if (birthday) {
                g("birthday-text-" + i).innerHTML = birthday.describe;
            }

            var levelUp = rule[i].levelUpBag;
            if (levelUp) {
                g("level-text-" + i).innerHTML = levelUp.describe;
            }
        }
    }, 'json');
});
