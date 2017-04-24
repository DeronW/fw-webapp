$FW.DOMReady(function () {
    if ($FW.Browser.inApp()) {
        NativeBridge.setTitle('年化加息奖励')
    } else {
        ReactDOM.render(<Header title={'年化加息奖励'} />, HEADER_NODE)
    }

    function getCurrentUserInfo(interest_list) {
        if (interest_list.length == 0) {
            interest_list = [null, null, { describe: '0.2' }, { describe: '0.4' }, { describe: '0.6' }]
        }
        $FW.Ajax({
            url: API_PATH + '/mpwap/api/v1/user/level-info.shtml',
            success: (data) => {
                var level = data.userLevel - 1;
                document.getElementById('level').innerText = level > 0 ? 'VIP' + level : '普通会员';
                var n = parseFloat(interest_list[level] && interest_list[level].describe);
                let v = n ? n : "无";
                // let v = interest_list[level] ? parseFloat(interest_list[level].describe) : '无';
                document.getElementById('interest').innerText = v;
                if (v == '无') {
                    let e = document.getElementById('percent');
                    e.parentNode.removeChild(e);
                } else {
                    var p = document.getElementById("percent");
                    p.style.visibility = "visible";
                }
            }
        });
    }

    $FW.getJSONP('https://www.9888.cn/api/userLevel/v1/giftVO.json', (data) => {
        if (data.code != 10000) throw new Error('接口异常, 无法获取等级反息信息');

        var rule = data.data.levelGiftRule, interest_list = [];

        for (var i = 0; i < rule.length; i++) {
            var interest = rule[i].addInterest;
            interest_list.push(rule[i].addInterest);
            var n = parseFloat(interest && interest.describe);
            document.getElementById("add-interest-text-" + i).innerHTML = n ? n + '%' : "-";
        }
        getCurrentUserInfo(interest_list);
    });
});
