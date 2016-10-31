const API_PATH = document.getElementById('api-path').value;

$FW.DOMReady(function () {
    if ($FW.Browser.inApp()) {
        NativeBridge.setTitle('VIP等级加息')
    } else {
        ReactDOM.render(<Header title={'VIP等级加息'}/>, document.getElementById('header'))
    }

    function getCurrentUserInfo(interest_list) {
        if (interest_list.length == 0) {
            interest_list = [null, null, {describe: '0.2'}, {describe: '0.4'}, {describe: '0.6'}]
        }
        $FW.Ajax({
            url: API_PATH + 'mpwap/api/v1/user/level-info.shtml',
            success: (data)=> {
                var level = data.userLevel - 1;
                // console.log(level);
                // console.log(interest_list[level]);
                // console.log(interest_list[level].describe);
                document.getElementById('level').innerText = level > 0 ? 'VIP' + level : '普通会员';
                let v = interest_list[level] ? parseFloat(interest_list[level].describe) : '无';
                document.getElementById('interest').innerText = v;

                if(v == '无') {
                    let e = document.removeElem('percent');
                    e.parentNode.removeChild(node);
                }

                // if(level>1){
                //     document.getElementById("percent").style.visibility="visible";
                // }
                // if(level==1||level==0){
                //     document.getElementById('interest').innerText="无";
                // }
            }
        });
    }

    $FW.getJSONP('http://www.9888.cn/api/userLevel/v1/giftVO.json', (data)=> {
        if (data.code != 10000) throw new Error('接口异常, 无法获取等级反息信息');

        var rule = data.data.levelGiftRule, interest_list = [];

        try {
            for (var i = 0; i < rule.length; i++) {
                var interest = rule[i].addInterest;
                console.log(interest);//4个
                interest_list.push(rule[i].addInterest);
                document.getElementById("add-interest-text-" + i).innerHTML = interest ? interest.describe : '-';
                // document.getElementById("add-interest-text-1").innerHTML="-";

            }
        } catch (e) {

        }

        getCurrentUserInfo(interest_list);
    });
});