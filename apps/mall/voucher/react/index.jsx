const HomePage = React.createClass({
    render : function(){
        return (
            <div>
                <MyVoucher cxchangeCert={this.props.exchange_cert}/>
            </div>
        )
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
                        <div className="my-voucher-tab">
                            {this.state.voucher.map(btn_voucher)}
                            <div className="tab-vertical-line tab-line-position1"></div>
                            <div className="tab-vertical-line tab-line-position2"></div>
                        </div>
                    </div>

                    <div className="my-voucher-cont">
                        {voucher_list.length == 0 ?
                            <img className="empty-voucher" src='images/empty.jpg'/> : null}
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

        let mark_images = {
            'used': 'images/mark-used.png',
            'dated': 'images/mark-dated.png',
            '0': 'images/mark-0.png',
            '2': 'images/mark-2.png',
            '3': 'images/mark-3.png'
        };

        let watermark_img = mark_name ?
            <img className="watermark" src={mark_images[mark_name]}/> : null;

        let gray_bg = this.props.state != 'normal';
        let exchange_btn = mark_name ? null : <span className="btn-exchange"></span>;

        let voucher_score = data.score ? <span>{data.score}工分</span> : null;
        let voucher_price = (data.price > 0 || data.score == 0) ?
            <span>&yen;{$FW.Format.currency(data.price)}</span> : null;

        return (
            <div className={ this.props.state == "used" || this.props.state == "dated" ? "my-voucher-cont-list gray-bg" : "my-voucher-cont-list color-bg"}>
                <a href={ (this.props.state == 'used' || this.props.state == 'dated') ? 'javascript:void(0)' : '/static/mall/product-detail/index.html?bizNo=' + data.product_biz_no}>
                    <div className={gray_bg ? "t-info b-color" : "t-info"}>
                        <div className="title-info">
                            <span className="title-text">{data.title}</span>
                        </div>
                        <div className="clear-info">
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

$FW.DOMReady(function() {
    NativeBridge.setTitle('兑换券');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"兑换券"} back_handler={backward}/>, document.getElementById('header'));
    $FW.Ajax({
        //url: API_PATH + 'mall/api/member/v1/user.json',
        url:`${API_PATH}mall/api/member/v1/user.json`,
        enable_loading: true,
        success: function (data) {
            console.log(data)
            ReactDOM.render(<HomePage {...data}/>, document.getElementById('cnt'));
        }
    });
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}
