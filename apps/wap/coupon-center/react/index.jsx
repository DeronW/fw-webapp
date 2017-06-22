class CouponCenter extends React.Component {

    constructor() {
        super()
        this.state = {
            giftList: [],
            limitList: [],
            endList: [],
            isShowEmpty: false,
            requestToken: null
        }
    }

    componentDidMount() {
        this.requestGiftList()
    }

    requestGiftList = () => {
        $FW.Ajax({
            url: `${API_PATH}/mpwap/api/v2/getCouponList.shtml`,
            method: 'post',
        }).then(data => {
            if ((data.packageList.length == 0 && data.couponAvailableList.length == 0 && data.couponEndList.length == 0)) {
                this.setState({isShowEmpty: true})
            }
            this.setState({
                requestToken: data.couponToken,
                giftList: data.packageList,
                limitList: data.couponAvailableList,
                endList: data.couponEndList
            })
        })
    }

    render() {
        let {isShowEmpty, giftList, limitList, endList, requestToken} = this.state;

        return <div className="totalBox">
            {isShowEmpty && <EmptyShow />}
            {<GiftBagList giftList={giftList} refreshHandler={this.requestGiftList} token={requestToken}/>}
            {<LimitBagList limitList={limitList} refreshHandler={this.requestGiftList} token={requestToken}/>}
            {<EndList endList={endList} refreshHandler={this.requestGiftList}/>}
        </div>
    }
}

$FW.DOMReady(function () {
    if (!$FW.Browser.inApp()) {
        ReactDOM.render(<Header title={'领券中心'}
                                sub_text={'我的优惠券'}
                                sub_url='javascript:NativeBridge.toNative("app_invest_list")'/>, HEADER_NODE);
    }
    ReactDOM.render(<CouponCenter />, CONTENT_NODE)
});
