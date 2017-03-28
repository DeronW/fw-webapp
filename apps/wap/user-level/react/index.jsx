
let jsPost = function (action, values) {
    var id = Math.random();
    document.write('<form id="post' + id + '" name="post' + id + '" action="' + action + '" method="post">');
    for (var key in values) {
        document.write('<input type="hidden" name="' + key + '" value="' + values[key] + '" />');
    }
    document.write('</form>');
    document.getElementById('post' + id).submit();
};

let qryDetail = (giftBagId, level, bagType) => {
    let in_app = navigator.userAgent.indexOf('FinancialWorkshop') > -1;
    jsPost(`/mpwap/${in_app ? 'app/' : ''}vipTeQuan/qryVipTeQuanDetail.shtml`, {
        'level': level,
        'giftBagId': giftBagId,
        'bagType': bagType
    });
};

const Content = React.createClass({
    getInitialState() {
        return {
            current_level: null,
            user_level: null,
            tips: '',
            percent: '',
            value: '',
            gifts: []
        }
    },
    componentDidMount() {
        $FW.Ajax(`${API_PATH}mpwap/api/v1/user/level-info.shtml`).then(data => {
            this.setState({
                current_level: data.userLevel,
                user_level: data.userLevel,
                gifts: data.levelGifts,
                tips: data.leveHint,
                value: data.contributeValue,
                percent: data.contributePercent
            });
        })
    },
    redirectHandler() {
        $FW.Browser.inApp() ?
            NativeBridge.toNative('app_contribute_detail') :
            location.href = '/static/wap/user-contribute/index.html';
    },
    levelChangeHandler(level) {
        if (level > 0 && level < 6) this.setState({ current_level: level });
    },
    render() {
        let {tips, gifts, current_level, user_level} = this.state;
        let slide_data = {
            current_level: current_level,
            user_level: user_level,
            gifts: gifts,
            value: this.state.value,
            percent: this.state.percent
        };

        let slider = current_level &&
            <Slider data={slide_data} levelChangeHandler={this.levelChangeHandler} />;

        return (
            <div>
                <a className="level-notice" onClick={this.redirectHandler}>
                    <span>{tips}</span> <i> </i> </a>
                {slider}
                {Content.Prerogative(gifts, current_level, user_level)}
                <div className="bottom-btn">
                    <a href="/static/wap/vip-prerogative/index.html" className="btn-red">
                        查看升级攻略
                    </a>
                </div>
            </div>
        )
    }
});

Content.Prerogative = (all_gifts, current_level, user_level) => {
    if (user_level < 1) return null; // 用户等级在 1~5 之间, 表示普通用户, 等级1 ... 等级4
    let gifts = [];
    all_gifts.forEach(i => {
        if (i.level == current_level) gifts = i.lvGiftIdMap
    });

    let gift_items = (g, index) => {

        let img = (
            <a className="prerogative-item" key={index}
                onClick={() => qryDetail(g.giftBagId, current_level, g.bagType)}>
                <img src={`images/level-${current_level}-${g.bagType}.png`} />
            </a>
        )
        return g.giftBagId ? img : null;
    }

    let cn = 'prerogative';
    if (current_level != user_level) cn += ' gray-scale';
    return (
        <div className={cn}>
            {gifts.map(gift_items)}
            <a className="prerogative-item"> <img src='images/waiting.png' /> </a>
        </div>
    )
}

const Slider = React.createClass({
    getInitialState() {
        return {
            complete: false,
            no_update: false
        }
    },
    componentDidMount() {
        $(".levels-panel").on('init', () => {
            this.setState({
                complete: true
            }, () => this.setState({
                no_update: true
            }))
        });
        $(".levels-panel").slick({
            dots: true,
            infinite: true,
            centerMode: true,
            arrows: false,
            initialSlide: this.props.data.current_level - 1,
        }).on("afterChange", (slick, currentSlide) => {
            // 用户等级是 1~5, 组建序号是 0~4
            this.props.levelChangeHandler(currentSlide.currentSlide + 1)
        });

    },
    shouldComponentUpdate() {
        // return true
        return !this.state.no_update
    },
    render() {
        let {gifts, current_level, value, user_level, percent} = this.props.data;

        let card = (i, index) => {
            let pcn = 'progress', ccn = 'card';
            if (current_level != index + 1) {
                ccn += ' gray-scale';
                pcn += ' gray-progress gray-scale';
            }

            let interest;
            if (i.levelRate > 0)
                interest = <div className="interest">奖励加息+{i.levelRate}%</div>;

            let bg = `images/banner-vip${i.level - 1}${i.levelRate > 0 ? i.level - 1 : ''}.jpg`;
            let red_b_width = this.state.complete ? `${(user_level - 1) * 20}%` : '0px';
            let blue_b_width = this.state.complete ? `${percent}%` : '0px';
            return (
                <div className={ccn} key={index}>
                    <img src={bg} />
                    {interest}
                    <div className={pcn}>
                        <div className="bar">
                            <div className="red-bar" style={{ width: red_b_width }}></div>
                            <div className="blue-bar" style={{ width: blue_b_width }}>
                                <div className="cursor" style={
                                    { backgroundImage: `url(images/ico-level-vip${index}.png)` }
                                }></div>
                            </div>

                            <div className="sp-line" style={{ left: '20%' }}></div>
                            <div className="sp-line" style={{ left: '40%' }}></div>
                            <div className="sp-line" style={{ left: '60%' }}></div>
                            <div className="sp-line" style={{ left: '80%' }}></div>
                        </div>
                        <div className="cb-value">贡献值：{value}</div>
                    </div>
                </div>
            )
        }
        return (
            <div className="levels-panel slider">
                {gifts.map(card)}
            </div>
        )
    }
})

$FW.DOMReady(() => {
    $FW.Browser.inApp() ?
        NativeBridge.setTitle('会员等级') :
        ReactDOM.render(<Header title={'会员等级'} />, HEADER_NODE);

    ReactDOM.render(<Content />, CONTENT_NODE);
});

