'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const HomePage = React.createClass({
    getInitialState: function () {
        return {}
    },
    render: function () {
        return (
            <div>
                <UserInfo
                    userAvatar={this.props.avatar}
                    user_level={this.props.vip_level}
                    show_user_level={this.props.isOpenJiFenLevel}
                    userName={this.props.username}

                    prepareCount={this.props.prepare_count}
                    shippingCount={this.props.shipping_count}
                    completeCount={this.props.complete_count}
                />

                <Account
                    money={this.props.money}
                    voucher_count={this.props.voucher_count}
                    score={this.props.score}
                    disable_score={this.props.disable_score}
                    show_score={this.props.isOpenJiFenLevel}
                    bean={this.props.bean}
                />

                <MyVoucher cxchangeCert={this.props.exchange_cert}/>
            </div>
        );
    }
});

const UserInfo = React.createClass({
    render: function () {
        let user_level = null;
        if (this.props.show_user_level) {
            user_level = this.props.user_level == 1 ?
                <span style={{color: 'gray'}}>VIP1</span> :
                <em className="vip-text">VIP{this.props.user_level - 1}</em>;
        }

        return (
            <div>
                <div className="user-area">
                    <div className="user-info">
                        <div className="user-portrait">
                            <img src={this.props.userAvatar}/>
                        </div>

                        <div className="usr-info-block">
                            <div className="user-name">
                                <span className="user-name-text">{this.props.userName}</span>
                            </div>

                            <div className="usr-info-vip">
                                <span className="text">会员等级 {user_level}</span>
                            </div>
                        </div>
                    </div>

                    <div className="user-info-r">
                        <a className="user-get-adders" href="/delivery_address?preview=true">
                            <i className="adders-icon">
                                <img src={STATIC_PATH + "images/address-icon.png"}/>
                            </i>
                            <span className="text">收货地址</span>
                        </a>
                    </div>
                </div>
                <MyOderBlock/>

                <DeliveryProcessList
                    perpareCount={this.props.prepareCount}
                    shippingCount={this.props.shippingCount}
                    completeCount={this.props.completeCount}
                />
            </div>
        );
    }
});

const MyOderBlock = React.createClass({
    render: function () {
        return (
            <div>
                <div className="my-oder-block">
                    <span className="title">我的订单</span>
                    <a href="/order/mine" className="oder-lick-text">
                        查看全部订单
                    </a>
                </div>
            </div>
        );
    }
});

const DeliveryProcessList = React.createClass({
    render: function () {
        let marKion = (numberText) => <span className="mark-icon">{numberText}</span>;

        return (
            <div className="delivery-list">
                <div className="info-block">
                    <a className="icon" href="/order/mine#prepare">
                        <img src={STATIC_PATH + "images/shopping-ship-icon.png"}/>
                        {this.props.perpareCount >= 1 ? marKion(this.props.perpareCount) : null }
                        <span className="text">待发货</span>
                    </a>
                </div>
                <div className="info-block">
                    <a className="icon" href="/order/mine#shipping">
                        <img src={STATIC_PATH +"images/shopping-conduct-icon.png"}/>
                        {this.props.shippingCount >= 1 ? marKion(this.props.shippingCount) : null }
                        <span className="text">待收货</span>
                    </a>
                </div>
                <div className="info-block">
                    <a className="icon" href="/order/mine#complete">
                        <img src={STATIC_PATH +"images/shopping-complete-icon.png"}/>
                        <span className="text">已完成</span>
                    </a>
                </div>
            </div>
        );
    }
});

const Account = React.createClass({
    render: function () {

        let score = null;
        if (this.props.show_score) {
            score = (
                <div>
                    <span className="l-text">工分</span>
                    {this.props.disable_score ?
                        <span className="r-text" style={{color: "red"}}>禁用</span> : null}
                    <span className="r-text">{$FW.Format.currency(this.props.score)}工分</span>
                </div>
            )
        }
        return (
            <div>
                <div className="my-account-block">
                    <div className="my-account-title">
                        <span className="l-text">我的余额</span>
                        <span className="r-text money-number">&yen;{$FW.Format.currency(this.props.money)}</span>
                    </div>

                    <div className="voucher-list">
                        <div>
                            <span className="l-text">优惠券</span>
                            <span className="r-text">{this.props.voucher_count}张</span>
                        </div>
                        {score}
                        <div>
                            <span className="l-text">工豆</span>
                            <span className="r-text">&yen;{$FW.Format.currency(this.props.bean / 100.0)}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

const MyVoucher = React.createClass({
    getInitialState: function () {
        return {
            index: 0,
            voucher: ['normal', 'used', 'dated']
        };
    },

    clickHandler: function (index) {
        this.setState({index: index});
    },

    render: function () {
        var self = this;

        var voucher_name = function (v) {
            switch (v) {
                case 'normal':
                    return '未使用';
                case 'used':
                    return '已使用';
                case 'dated':
                    return '已过期'
            }
        };

        var btn_voucher = (v, index) => (
            <div key={index}
                 className={index == this.state.index ? "select-li" : ""}
                 onClick={function(){self.clickHandler(index)}}>
                <span className="tab-text"> {voucher_name(v)} </span>
            </div>
        );

        let voucher_list = [];
        if (this.state.index == 0) {
            voucher_list = this.props.cxchangeCert.normal
        } else if (this.state.index == 1) {
            voucher_list = this.props.cxchangeCert.used
        } else if (this.state.index == 2) {
            voucher_list = this.props.cxchangeCert.dated
        }

        return (
            <div>
                <div className="my-voucher">
                    <div className="my-voucher-title">
                        <span className="title-text">我的兑换券</span>
                        <div className="my-voucher-tab">
                            {this.state.voucher.map(btn_voucher)}
                        </div>
                    </div>

                    <div className="my-voucher-cont">
                        {voucher_list.length == 0 ?
                            <img className="empty-voucher" src={STATIC_PATH + 'images/empty.jpg'}/> : null}
                        { voucher_list.map((i, index) =>
                            <Voucher key={index} data={i} state={this.state.voucher[this.state.index]}/>) }
                    </div>
                </div>
            </div>
        );
    }
});

const Voucher = React.createClass({
    render: function () {
        // data.mark, 兑换券状态  0-未上架 1-已上架 2-已下架 3已删除

        let data = this.props.data;

        let mark_name;
        if (this.props.state == 'used') {
            mark_name = 'used'
        } else if (this.props.state == 'dated') {
            mark_name = 'dated'
        } else {
            if (data.mark != 1) mark_name = data.mark.toString();
        }

        let date_text;
        if (this.props.state == 'used') {
            date_text = '使用日期'
        } else if (this.props.state == 'dated') {
            date_text = '过期时间'
        } else {
            date_text = '有效期至'
        }

        let watermark_img = mark_name ?
            <img className="watermark" src={STATIC_PATH + 'images/mark-' + mark_name + '.png'}/> : null;
        let gray_bg = this.props.state != 'normal';
        let exchange_btn = mark_name ? null : <span className="btn-exchange">点我兑换</span>;

        let voucher_score = data.score ? <span>{data.score}工分</span> : null;
        let voucher_price = (data.price > 0 || data.score == 0) ? <span>&yen;{data.price}</span> : null;

        return (
            <div className="my-voucher-cont-list">
                <a href={ (this.props.state == 'used' || this.props.state == 'dated') ? 'javascript:void(0)' : '/productDetail?bizNo=' + data.product_biz_no}>
                    <div className={gray_bg ? "t-info b-color" : "t-info"}>
                        <div className="title-info">
                            <span className="title-text">{data.title}</span>
                            <span className="money-text">
                                {voucher_price}
                                {data.price > 0 && data.score ? ' + ' : null}
                                {voucher_score}
                            </span>
                        </div>
                        <div className="clear-info">
                            <span className="text">来源 {data.type}</span>
                            <span className="text-timer">{date_text} <em>{data.indate}</em></span>
                        </div>
                    </div>
                </a>

                <div className="b-info">
                    <span className="text">备注:<em>{data.comment}</em></span>
                    {exchange_btn}
                </div>
                {watermark_img}
            </div>
        )
    }
});


$FW.DOMReady(function () {
    NativeBridge.setTitle('我的商城');

    $FW.Ajax({
        url: API_PATH + 'mall/api/member/v1/user.json',
        //url: 'http://localhost/user.json',
        enable_loading: true,
        success: function (data) {
            ReactDOM.render(<HomePage {...data}/>, document.getElementById("cnt"));
        }
    });

    if (!$FW.Browser.inApp()) {
        ReactDOM.render(<Header title={"我的商城"} back_handler={back_handler}/>,
            document.getElementById('header'));
    }
});

function back_handler() {
    location.href = '/';
}

window.onNativeMessageReceive = function (msg) {
    if (msg == 'history:back') back_handler()
};
