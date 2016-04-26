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
                {$FW.Browser.inApp() ? null : <Header title={'我的商城'} back_handler={function(){location.href = '/'}}/>}
                <UserInfo
                    userAvatar={this.props.avatar}
                    userInfo={this.props.vip_level}
                    userName={this.props.username}

                    prepareCount={this.props.prepare_count}
                    shippingCount={this.props.shipping_count}
                    completeCount={this.props.complete_count}
                />

                <Account
                    money={this.props.money}

                    voucher_count={this.props.voucher_count}
                    score={this.props.score}
                    bean={this.props.bean}
                />

                <MyVoucher cxchangeCert={this.props.exchange_cert}/>
            </div>
        );
    }
});

const UserInfo = React.createClass({
    render: function () {
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
                                <span className="text">会员等级<em className="vip-text">VIP{this.props.userInfo}</em></span>
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
                    <i className="icon">
                        <img src={STATIC_PATH + "images/shopping-ship-icon.png"}/>
                    </i>

                    {this.props.perpareCount >= 1 ? marKion(this.props.perpareCount) : null }
                    <span className="text">待发货</span>
                </div>
                <div className="info-block">
                    <i className="icon">
                        <img src={STATIC_PATH +"images/shopping-conduct-icon.png"}/>
                    </i>

                    {this.props.shippingCount >= 1 ? marKion(this.props.shippingCount) : null }
                    <span className="text">待收货</span>
                </div>
                <div className="info-block">
                    <i className="icon">
                        <img src={STATIC_PATH +"images/shopping-complete-icon.png"}/>
                    </i>

                    {this.props.completeCount >= 1 ? marKion(this.props.completeCount) : null }
                    <span className="text">已完成</span>
                </div>
            </div>
        );
    }
});


const Account = React.createClass({
    render: function () {
        return (
            <div>
                <div className="my-account-block">
                    <div className="my-account-title">
                        <span className="l-text">我的账户</span>
                        <span className="r-text money-number">￥{$FW.Format.currency(this.props.money)}</span>
                    </div>

                    <div className="voucher-list">
                        <div>
                            <span className="l-text">优惠券</span>
                            <span className="r-text">{this.props.voucher_count}张</span>
                        </div>
                        <div>
                            <span className="l-text">工分</span>
                            <span className="r-text">{$FW.Format.currency(this.props.score)}分</span>
                        </div>
                        <div>
                            <span className="l-text">工豆</span>
                            <span className="r-text">￥{$FW.Format.currency(this.props.bean)}</span>
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
            selectClass: "select-li",
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
				<span className="tab-text">
					{voucher_name(v)}
				</span>
            </div>
        );

        let voucher = (i, index) => <Voucher key={index} data={i}/>;

        let normal_voucher = function () {
            return (
                <div className="my-voucher-not-used">
                    { (self.props.cxchangeCert.dated || []).map(voucher) }
                </div>)
        };

        let used_voucher = function () {
            return (
                <div className="my-voucher-not-used">
                    { self.props.cxchangeCert.normal.map(voucher) }
                </div>)
        };

        let dated_voucher = function () {
            return (
                <div className="my-voucher-not-used">
                    { self.props.cxchangeCert.used.map(voucher) }
                </div>)
        };

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
                        {this.state.index == 0 ? normal_voucher() : null}
                        {this.state.index == 1 ? used_voucher() : null}
                        {this.state.index == 2 ? dated_voucher() : null}
                    </div>
                </div>
            </div>
        );
    }
});

const Voucher = React.createClass({
    render: function () {
        let img = (src) => <img src={STATIC_PATH + src}/>;

        return (
            <div className="my-voucher-cont-list">
                <div className={this.props.data.mark >= 2 ? "t-info b-color" : "t-info"}>
                    <div className="title-info">
                        <h2 className="title-text">{this.props.data.title}</h2>
                        <span className="money-text">&yen;{this.props.data.price}</span>
                    </div>
                    <div className="clear-info">
                        <span className="text">来源 {this.props.data.type}</span>
                        <span className="text-timer">有效目期<em>{this.props.data.indate}</em></span>
                    </div>
                </div>

                <div className="b-info">
                    <span className="text">备注:<em>{this.props.data.comment}</em></span>
                </div>

                <div className="my-vorcher-mark">
                    {this.props.data.mark == 0 ? img("images/mark-delete.png") : null}
                    {this.props.data.mark == 2 ? img("images/mark-used.png") : null}
                    {this.props.data.mark == 3 ? img("images/mark-expired.png") : null}
                </div>
            </div>

        )
    }
});


$FW.DOMReady(function () {
    NativeBridge.setTitle('我的商城');
    NativeBridge.ajaxStart();

    $FW.Ajax({
        url: API_PATH + 'mall/api/member/v1/user.json',
        success: function (data) {
            ReactDOM.render(<HomePage {...data}/>, document.getElementById("cnt"));
            NativeBridge.ajaxComplete();
        }
    });
});

window.onNativeMessageReceive = function (msg) {
    if (msg == 'history:back') location.href = '/';
};
