const DeliverAddress = React.createClass({
    getInitialState: function () {
        return {}
    },
    markDefaultHandler: function (address_id) {
        console.log(address_id);
        $FW.Ajax({
            url: `${API_PATH}mall/api/member/v1/address/set_default.json`,
            method: 'POST',
            enable_loading: true,
            data: {id: address_id}
        }).then(data =>{
            location.reload()
        })
    },
    render: function () {
        let _this = this;
        let cartFlag = $FW.Format.urlQuery().cartFlag;
        let prdString= cartFlag ? "prd":"productBizNo";
        let prd = $FW.Format.urlQuery().prd;
        let buyNum = $FW.Format.urlQuery().buyNum;
        let preview = this.props.preview;

        let address = function (address, index) {
            let link;
            if (!preview) {
                link = "/static/mall/order-confirm/index.html?address_id=" + address.address_id +"&cartFlag=" + cartFlag + "&"+prdString+"=" + prd + '&buyNum=' + buyNum;
            }
            let checked_flag = null;
            if (!preview) {
                let aid = $FW.Format.urlQuery().address_id;
                checked_flag = ( <div className="checked-flag"> {aid && aid == address.address_id ? <div></div> : null} </div> );
            }

            let set_default = null;
            if (preview)
                set_default = address.isDefault ? (
                    <div className="set-default"
                         style={{backgroundImage: 'url(images/default-address.png)'}}>
                    </div>
                ) : (
                    <div className="set-default" onClick={() => _this.markDefaultHandler(address.address_id)}>设为默认</div>
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
            "/static/mall/order-build-deliver/index.html?preview=true" :
            ("/static/mall/order-build-deliver/index.html?prd=" + prd + '&buyNum=' + buyNum);

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
        enable_loading: true,
        success: function (data) {
            $FW.Component.hideAjaxLoading();
            let preview = $FW.Format.urlQuery().preview == 'true';
            ReactDOM.render(<DeliverAddress address={data.address_list} preview={preview}/>,
                document.getElementById('cnt'));
        }
    });

    if ($FW.Utils.shouldShowHeader()) {
        ReactDOM.render(<Header title={"我的收货地址"} back_handler={back_handler}/>, document.getElementById('header'));
    }
});

function back_handler() {
    if ($FW.Format.urlQuery().preview == 'true' && !$FW.Browser.inApp()) {
        location.href = '/static/mall/user/index.html'
    } else {
        history.back();
    }
}

window.onNativeMessageReceive = function (msg) {
    if (msg == 'history:back') back_handler()
};
