class CouponCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            isShowEmpty: false,
            giftList: [],
            limitList: [],
            endList: []
        }
    }
    componentDidMount() {
        this.requestGiftList();
    }
    requestGiftList = () => {
        $FW.Ajax({
            url: 'https://m.9888.cn/mpwap/api/v2/getCouponList.shtml ',
            method: 'post',
            data: {
            },
            success: data => {
                console.log(data);
                let packageList = data.data.packageList;
                let couponAvailableList = data.data.couponAvailableList;
                let couponEndList = data.data.couponEndList;
                this.setState({
                    giftList: packageList,
                    limitList: couponAvailableList,
                    endList: couponEndList
                })
                if (packageList.length == 0 && couponAvailableList.length == 0 && couponEndList.length == 0) {
                    this.setState({ isShowEmpty: true })
                }
            }
        });
    }
    render() {
        let { isShowEmpty, giftList, limitList, endList } = this.state;
        let myCoupon = <a className="myCoupon" href="/static/wap/faq/index.html"> 我的优惠券 </a>;

        return <div className="totalBox">
            {/*<EmptyShow/>*/}
            {myCoupon}
            {isShowEmpty && <EmptyShow />}
            {giftList.length !== 0 &&
                <GiftBag list={giftList} request={this.requestGiftList} />}
            {limitList.length !== 0 &&
                <List list={limitList} request={this.requestGiftList} />}
            {endList.length !== 0 &&
                <NoneList list={endList} request={this.requestGiftList} />}
        </div>
    }
}

$FW.DOMReady(function () {
    if (!$FW.Browser.inApp()) {
        ReactDOM.render(<Header title={'领券中心'} />, HEADER_NODE);
    }
    ReactDOM.render(<CouponCenter />, CONTENT_NODE)
});
