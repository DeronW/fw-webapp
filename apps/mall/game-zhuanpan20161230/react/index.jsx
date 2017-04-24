const ACTIVITY_ID = '8a652a6c12b7418f942e4c86289d139a';

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
        }
    },
    componentDidMount: function () {
        $FW.Ajax({
            url: `${API_PATH}/mall/api/magic/v1/winnersList.json?activityId=${ACTIVITY_ID}&num=20`,//获奖名单
            success: (data) => {
                data.list = data.list || [];
                this.setState({prize_list: data.list})
            }
        });
    },

    toggleDetailHandler: function () {
        this.setState({show_detail: !this.state.show_detail})
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


            </div>
        )
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('大转盘');
    if ($FW.Utils.shouldShowHeader()) {
        ReactDOM.render(<Header title={"大转盘"} back_handler={backward}/>, HEADER_NODE);
    }

    $FW.Ajax({
        url: `${API_PATH}/mall/api/magic/v1/user.json`, //用户信息
        success: (data) => {
            ReactDOM.render(<NineActivity user={data}/>, CONTENT_NODE);
        }
    })
});
function backward() {
    // $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/static/mall/game/index.html?mallHead=true' 
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/static/mall/home/index.html' 
}
function getBrowserType() {
    var t = 2; // 在移动浏览器内
    if ($FW.Browser.inApp()) {
        t = $FW.Browser.inIOS() ? 3 : 4
    }
    return t;
}
