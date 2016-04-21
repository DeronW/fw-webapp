'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const DeliverAddress = React.createClass({
    getInitialState: function () {
        return {cur_index: 0}
    },
    clickHandler: function (id, index) {
        this.setState({
            address_id: id.address_id,
            cur_index: index
        });
    },
    render: function () {
        let _this = this;
        let productBizNo = $FW.Format.urlQuery().productBizNo;

        let address = function (i, index) {
            let link;
            if (!_this.props.preview) {
                link = "/order/confirm?address_id=" + i.address_id + "&productBizNo=" + productBizNo
            }
            return (
                <div key={index} className="address-panel"
                     onClick={function(){_this.clickHandler(i,index)}}
                     style={{background:"#fff url("+STATIC_PATH+"images/"+(index == _this.state.cur_index ? "checked-circle" :"check-circle")+".png) no-repeat 20px center"}}
                >
                    <a href={link}>
                        <div className="username">{i.username}</div>
                        <div className="phone">{i.phone}</div>
                        <div className="address">{i.address}</div>
                    </a>
                </div>
            )
        };

        let create_address;
        if (!this.props.preview) {
            create_address = (
                <div className="bottom-panel">
                    <a href="/delivery_address/create" className="create-address">+新建地址</a>
                </div>
            )
        }

        return (
            <div>
                {$FW.Browser.inApp() ? null : <Header title={'我的收货地址'}/>}
                <div className="address-list">
                    {this.props.address.map(address)}
                </div>
                {create_address}
            </div>
        )
    }
});

const Header = React.createClass({
    backClickHandler: function () {
        this.props.back_handler ? this.props.back_handler() : location.back();
    },
    render: function () {
        let style_a = {
            height: "100px"
        };

        let style_b = {
            position: "fixed",
            zIndex: "99",
            top: "0",
            width: "100%",
            height: "100px",
            textAlign: "center",
            lineHeight: "100px",
            fontSize: "40px"
        };

        let style_c = {
            display: "block",
            position: "absolute",
            width: "100px",
            height: "100px",
            lineHeight: "100px",
            fontSize: "40px",
            left: "0",
            top: "0"
        };

        return (
            <div style={style_a}>
                <div style={style_b}>
                    <b style={style_c} onClick={this.backClickHandler}>&lt;</b>
                    {this.props.title}
                </div>
            </div>
        )
    }
});


$FW.DOMReady(function () {
    NativeBridge.ajaxStart();
    NativeBridge.setTitle('我的收货地址');

    $FW.Ajax({
        url: API_PATH + 'mall/api/member/v1/delivery_address.json',
        success: function (data) {
            let preview = $FW.Format.urlQuery().preview == 'true';
            ReactDOM.render(<DeliverAddress address={data.address_list} preview={preview}/>, document.getElementById('cnt'));
            NativeBridge.ajaxComplete();
        }
    });
});

window.onNativeMessageReceive = function(msg){
    if(msg == 'history:back') location.href = '/user';
};