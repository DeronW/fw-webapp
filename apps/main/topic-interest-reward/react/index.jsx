const API_PATH = document.getElementById('api-path').value;

$FW.DOMReady(function () {
    if ($FW.Browser.inApp()) {
        NativeBridge.setTitle('年化加息奖励')
    } else {
        ReactDOM.render(<Header title={'年化加息奖励'}/>, document.getElementById('header'))
    }

    $FW.Ajax({
        url: API_PATH + '/mpwap/api/v1/user/level-info.shtml',
        success: (data)=> {
            var level = data.userLevel - 1;

            document.getElementById('level').innerText = level > 1 ? 'VIP' + (level - 1) : '普通会员';

            var interest = '无';
            if (level == 1) {
                interest = '0.1'
            } else if (level == 2) {
                interest = '0.3'
            } else if (level == 3) {
                interest = '0.5'
            } else if (level == 4) {
                interest = '0.7'
            }
            document.getElementById('interest').innerText = interest;
        }
    })
});