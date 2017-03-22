var numberFormat = {
    val: "",
    format: function (val) {
        if (!isNaN(val.replace(/[0-9]/g, ""))) {
            this.val = val.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");//四位数字一组，以空格分割
        }
        return this.val;
    }
};

function space(str) {
    return str.replace(/ /g, "");
}

// 验证身份证
function isCardNo(card) {
    var pattern = /(^\d{15}$)|(^\d{19}$)|(^\d{17}(\d|X|x)$)/;
    return pattern.test(card);
}

const SendCode = React.createClass({

    getInitialState: function () {
        var query = $FW.Format.urlQuery();
        var mobileNo = query.mobileNo;
        return {
            mobileNo: mobileNo,
            active: false,
            code: ""
        }
    },

    //加载完成之后立刻倒计时
    componentDidMount: function () {

    },

    //倒计时完成终止
    componentDidUpdate: function () {

    },

    //激活下一步
    changeVal: function (e) {
        var val = e.target.value;
        if (val != "") {
            this.setState({active: true});
        }
        else {
            this.setState({active: false});
        }
        this.setState({"code": val});
    },


    //短信验证码验证完成绑定
    nextStep: function () {
        if (!this.state.active) return;
        var FormData = {
            cheapCode: this.state.code
        }
        alert(JSON.stringify(FormData));
        $FW.Ajax({
            url: `/mall/api/cheap/v1/bondCheapCode.json`,
            enable_loading: 'mini',
            data: FormData,
            success: function (data) {
                location.href = ""
            }.bind(this)
        })
    },

    render: function () {
        return (
            <div>
                <div className="input-wrap">
                    <input type="text" defaultValue="" placeholder="" onChange={this.changeVal}/>
                    <input type="button" className={this.state.active ? "msg-tip active":"msg-tip"}
                           value={"兑换"}
                           onClick={this.nextStep}/>
                    <span className="vertical-line"></span>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {

    ReactDOM.render(<Header title={"优惠券"}/>, HEADER_NODE);

    ReactDOM.render(<SendCode/>, CONTENT_NODE);
});

