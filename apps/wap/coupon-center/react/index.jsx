class CouponCenter extends React.Component {

    constructor() {
        super()
        this.state = {
            giftList: [],
            limitList: [],
            endList: []
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
            this.setState({
                giftList: data.packageList,
                limitList: data.couponAvailableList,
                endList: data.couponEndList
            })
        })
    }
    render() {
        let { giftList, limitList, endList } = this.state;

        let isNotEmpty = giftList.length || limitList.length || endList.length;

        return <div className="totalBox">
            {!isNotEmpty && <EmptyShow />}
            <GiftBagList giftList={giftList} refreshHandler={this.requestGiftList} />
            <LimitBagList limitList={limitList} refreshHandler={this.requestGiftList} />
            <EndList endList={endList} refreshHandler={this.requestGiftList} />
        </div>
    }
}

$FW.DOMReady(function () {
    if (!$FW.Browser.inApp()) {
        ReactDOM.render(<Header title={'领券中心'} sub_text={'我的优惠券'}
            sub_url='/static/wap/faq/index.html' />, HEADER_NODE);
    }
    ReactDOM.render(<CouponCenter />, CONTENT_NODE)
});
