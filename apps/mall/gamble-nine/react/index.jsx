'use strict';

const API_PATH = document.getElementById('api-path').value;
const ACTIVITY_ID = '1ead8644a476448e8f71a72da29139ff';

const NineActivity = React.createClass({
    getDefaultProps: function () {
        return {}
    },
    getInitialState: function () {
        return {
            show_detail: false,
            showPopPrize: false,
            usableDraw: true,
            moveNum: 0,
            prize_list: [],

            usableScore: null,

            masker: null,

            showAlertMessage: false,
            alertMessage: ''
        }
    },
    componentDidMount: function () {
        $FW.Ajax({
            url: `${API_PATH}mall/api/magic/v1/winnersList.json?activityId=${ACTIVITY_ID}&num=20`,//获奖名单
            success: (data) => this.setState({prize_list: data.list})
        });
    },

    toggleDetailHandler: function () {
        this.setState({show_detail: !this.state.show_detail})
    },

    showAlertMessage: function (message) {
        this.setState({
            alertMessage: message,
            showAlertMessage: true
        });
    },
    hideAlertMessage: function () {
        this.setState({
            showAlertMessage: false
        });
    },

    addPriceList: function (prizeName) {
        var last = {
            avatar: this.props.user.avatar,
            name: this.props.user.userName,
            prizeName: prizeName,
            time: (new Date().toISOString()).split('T')[0]
        };
        var price_list = [last].concat(this.state.prize_list);

        this.setState({prize_list: price_list});

    },
    setUsableScore: function (n) {
        this.setState({usableScore: n});
    },
    setMasker: function (n) {
        this.setState({masker: n});
    },

    render: function () {
        let user = this.props.user;
        let levelName = `VIP${user.userLevel - 1}`;
        if (user.userLevel == 1) levelName = '普通用户';

        return (
            <div className="nine-box">
                <div className="Ninehead">
                    <div className="usable-score">{this.state.usableScore}</div>
                    <div className="my-level">{levelName}</div>
                </div>

                <NineDraw setUsableScore={this.setUsableScore}
                          addPriceList={this.addPriceList}/>

                <NineList prize_list={this.state.prize_list}/>

                {this.state.show_detail ?
                    <PopInf hidePopInf={this.toggleDetailHandler}/> : null}

                <div className="btn-inf-show" onClick={this.toggleDetailHandler}></div>

                {this.state.showAlertMessage ?
                    <AlertMessage hideAlertMessage={this.hideAlertMessage}
                                  showAlertMessage={this.showAlertMessage}
                                  alertMessage={this.state.alertMessage}/> :
                    null}

            </div>
        )
    }
});

const AlertMessage = React.createClass({
    render: function () {
        return (
            <div className="alert-box">
                <div className="alert-cont">
                    <div className="alert-text">{this.props.alertMessage}</div>
                    <div className="alert-btn" onClick={this.props.hideAlertMessage}>确定</div>
                </div>
                <div className="alert-masker"></div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('豆哥玩玩乐');
    if ($FW.Utils.shouldShowHeader()) {
        ReactDOM.render(<Header title={"豆哥玩玩乐"} back_handler={backward}/>, document.getElementById('header'));
    }

    $FW.Ajax({
        url: API_PATH + 'mall/api/magic/v1/user.json', //用户信息
        success: (data) => {
            ReactDOM.render(<NineActivity user={data}/>, document.getElementById('cnt'));
        }
    })
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}

function getBrowserType() {
    var t = 2; // 在移动浏览器内
    if ($FW.Browser.inApp()) {
        t = $FW.Browser.inIOS() ? 3 : 4
    }
    return t;
}