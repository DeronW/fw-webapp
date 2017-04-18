const Form = React.createClass({
    let query=$FW.Format.urlQuery();
    $FW.Ajax({
                url: `${API_PATH}/mall/api/payment/v1/alipay_topay.json`,
                enable_loading: true,
                data: {
                    payType: 3,
                    orderBizNo: queryNew.orderBizNo,
                    orderGroupBizNo: queryNew.orderGroupBizNo,
                    orderTime: queryNew.orderTime,
                    amount: queryNew.amount,
                    UserId:""
                },
            }).then(data=> {
            document.write(data.form);
        }, e => {
            $FW.Component.Alert(e.message);
        })
});


$FW.DOMReady(function () {
            ReactDOM.render(<Form />, CONTENT_NODE);
});

