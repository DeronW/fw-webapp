function fmOpt(sessionId) {
    window._fmOpt = {
        bd: true,
        partner: 'jrgc',
        appName: 'jrgc_web',
        token: sessionId
    };

    var cimg = new Image(1, 1);

    cimg.onload = function () {
        _fmOpt.imgLoaded = true;
    };

    cimg.src = "https://fp.fraudmetrix.cn/fp/clear.png?partnerCode=jrgc&appName=jrgc_web&tokenId=" + _fmOpt.token;

    var fm = document.createElement('script');
    fm.type = 'text/javascript';
    fm.async = true;

    fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.fraudmetrix.cn/fm.js?ver=0.1&t=' + (new Date().getTime() / 3600000).toFixed(0);

    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(fm, s);
}

var numberFormat = {
    val: "",
    format: function (val) {
        this.val = val.replace(/[^\d.]/g, "").
            //只允许一个小数点
            replace(/^\./g, "").replace(/\.{2,}/g, ".").
            //只能输入小数点后两位
            replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3');

        return this.val;
    }
};

function isInteger(obj) {
    return Math.floor(obj) === obj
}

//设置光标位置函数
function setCursorPosition(ctrl, pos) {
    if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos, pos);
    }
    else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

const Greater = React.createClass({
    popClickShow: function () {
        this.props.callbackCreateShow(true);
    },
    render: function () {
        return (
            <div className="modify" onClick={this.popClickShow}>
                <div className="wire"></div>
                <div className="pure">
                    <div className="xuanwu" style={{ fontSize: '32px' }}>{this.props.name ? this.props.name : '开户银行'}</div>
                    <div className="choice">
                        <div className="pleas" style={{ color: '#555555' }}>请选择</div>
                    </div>
                </div>
            </div>
        )
    }
})

$FW.DOMReady(function () {
    $FW.Ajax({
        url: `${API_PATH}mpwap/api/v1/getWithdrawInfo.shtml`,
        enable_loading: 'mini'
    }).then(data => {
        ReactDOM.render(<Content data={data} />, CONTENT_NODE)
        fmOpt(data.sessionId);
    })
});
