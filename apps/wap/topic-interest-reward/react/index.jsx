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
                document.getElementById('level').innerText = level > 0 ? 'VIP' + level : '普通会员';
                var n=parseFloat(interest_list[level]&&interest_list[level].describe);
                let v=n?n:"无";
                // let v = interest_list[level] ? parseFloat(interest_list[level].describe) : '无';
                document.getElementById('interest').innerText = v;
                console.log(v);
                if(v == '无') {
                    let e = document.getElementById('percent');
                    e.parentNode.removeChild(e);
                }else{
                    var p=document.getElementById("percent");
                    p.style.visibility="visible";
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

            for (var i = 0; i < rule.length; i++) {
                var interest = rule[i].addInterest;
                console.log(interest);//4个
                interest_list.push(rule[i].addInterest);
                // var t = '-';
                // if( parseFloat(interest && interest.describe)) {
                //     t =  interest.describe;
                // }
                var n = parseFloat(interest && interest.describe);
                document.getElementById("add-interest-text-" + i).innerHTML = n?n+'%':"-";
                // document.getElementById("add-interest-text-1").innerHTML="-";
                // var item=interest_list[i];
                // if(item)){
                //     document.getElementById("add-interest-text-" + i).innerHTML="-";
                // }

            }

        try {
        } catch (e) {
        }

        getCurrentUserInfo(interest_list);
    });
});