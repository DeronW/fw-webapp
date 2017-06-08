class CouponCenter extends React.Component {

    constructor() {
        super()
        this.state = {
            giftList: [],
            limitList: [],
            endList: [],
            isShowEmpty: false
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
            let packageList = data && data.packageList;
            let couponAvailableList = data && data.couponAvailableList;
            let couponEndList = data && data.couponEndList;
            this.setState({
                giftList: packageList,
                limitList: couponAvailableList,
                endList: couponEndList
            })
            if ((!!data)||(packageList.length == 0 && couponAvailableList.length == 0 && couponEndList.length == 0)) {
                this.setState({ isShowEmpty: true })
            }
        })
    }

    render() {
        let { isShowEmpty, giftList, limitList, endList } = this.state;

        return <div className="totalBox">
            {isShowEmpty && <EmptyShow />}
            <GiftBagList giftList={giftList} refreshHandler={this.requestGiftList} />
            <LimitBagList limitList={limitList} refreshHandler={this.requestGiftList} />
            <EndList endList={endList} refreshHandler={this.requestGiftList} />
        </div>
    }
}

$FW.DOMReady(function () {
    if (!$FW.Browser.inApp()) {
        ReactDOM.render(<Header title={'领券中心'}
            sub_text={'我的优惠券'}
            sub_url='javascript:NativeBridge.toNative("app_coupon")' />, HEADER_NODE);
    }
    ReactDOM.render(<CouponCenter />, CONTENT_NODE)
});
