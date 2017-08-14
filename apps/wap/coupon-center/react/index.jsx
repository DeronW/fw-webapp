class CouponCenter extends React.Component {

    constructor() {
        super()
        this.state = {
            giftList: [],
            limitList: [],
            endList: [],
            isEmpty: false,
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
            if ((data.packageList.length == 0 &&
                data.couponAvailableList.length == 0 &&
                data.couponEndList.length == 0))
                this.setState({ isEmpty: true })

            this.setState({
                requestToken: data.couponToken,
                giftList: data.packageList,
                limitList: data.couponAvailableList,
                endList: data.couponEndList
            })
        })
    }

    render() {
        let { isEmpty, giftList, limitList, endList, requestToken } = this.state;

        let empty_holder = isEmpty && <div className="empty-box">
            <img src="images/icon-empty.png" />
            <div className="empty_text">一大波“优惠券”即将来袭</div>
        </div>

        return <div className="totalBox">
            {<GiftBagList giftList={giftList} refreshHandler={this.requestGiftList} token={requestToken} />}
            {<LimitBagList limitList={limitList} refreshHandler={this.requestGiftList} token={requestToken} />}
            {<EndList endList={endList} refreshHandler={this.requestGiftList} />}
            {empty_holder}
        </div>
    }
}

$FW.DOMReady(function () {
    NativeBridge.setTitle('领券中心')
    ReactDOM.render(<CouponCenter />, CONTENT_NODE)
});
