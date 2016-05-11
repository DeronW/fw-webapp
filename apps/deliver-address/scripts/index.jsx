'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const DeliverAddress = React.createClass({
    getInitialState: function () {
        return {}
    },
    markDefaultHandler: function (address_id) {
        console.log(address_id);
        $FW.Ajax({
            url: API_PATH + 'mall/api/member/v1/address/set_default.json',
            method: 'post',
            data: {id: address_id},
            success: function () {
                location.reload()
            }
        });
    },
    render: function () {
        let _this = this;
        let productBizNo = $FW.Format.urlQuery().productBizNo;
        let productCount = $FW.Format.urlQuery().count || 1;
        let preview = this.props.preview;

        let address = function (address, index) {
            let link;
            if (!preview) {
                link = "/order/confirm?address_id=" + address.address_id + "&productBizNo=" + productBizNo + '&count=' + productCount;
            }
            let checked_flag = null;
            if (!preview)
                checked_flag = ( <div className="checked-flag"> {address.isDefault ? <div></div> : null} </div> );

            let set_default = null;
            if (preview)
                set_default = address.isDefault ? (
                    <div className="set-default"
                         style={{backgroundImage: 'url(' + STATIC_PATH + 'images/default-address.png)'}}>
                    </div>
                ) : (
                    <div className="set-default" onClick={() => _this.markDefaultHandler(address.id)}>设为默认</div>
                );

            return (
                <div key={index} className="address-panel">
                    {checked_flag}
                    {set_default}
                    <a href={link}>
                        <div className="username">
                            {address.username} {address.isDefault ? <span>(默认)</span> : null}</div>
                        <div className="phone">{address.phone}</div>
                        <div className="address">{address.address}</div>
                    </a>
                </div>
            )
        };

        let create_link = preview ?
            "/delivery_address/create?preview=true" :
            ("/delivery_address/create?productBizNo=" + productBizNo + '&count=' + productCount);

        return (
            <div>
                <div className={preview ? "address-list preview" : "address-list"}>
                    {this.props.address.map(address)}
                </div>

                <div className="bottom-panel">
                    <a href={create_link} className="create-address">+ 新建地址</a>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('我的收货地址');

    $FW.Component.showAjaxLoading();
    $FW.Ajax({
        url: API_PATH + 'mall/api/member/v1/delivery_address.json',
        //url: 'http://localhost/address.json',
        success: function (data) {
            $FW.Component.hideAjaxLoading();
            let preview = $FW.Format.urlQuery().preview == 'true';
            ReactDOM.render(<DeliverAddress address={data.address_list} preview={preview}/>,
                document.getElementById('cnt'));
        }
    });

    if (!$FW.Browser.inApp()) {
        ReactDOM.render(<Header title={"我的收货地址"} back_handler={back_handler}/>, document.getElementById('header'));
    }
});

function back_handler() {
    history.back();
}

window.onNativeMessageReceive = function (msg) {
    if (msg == 'history:back') back_handler()
};