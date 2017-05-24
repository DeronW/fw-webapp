class CouponCenter extends React.Component {
    constructor(){
        super();
        this.state={
            isShowEmpty:false,
            giftList:[],
            limitList:[],
            endList:[]
        }
        this.requestGiftList = this.requestGiftList.bind(this)
    }
    componentDidMount(){
        this.requestGiftList();
    }
    requestGiftList(){
        console.log(111);
        $FW.Ajax({
            url: API_PATH+'/api/couponCenter/v2/getCouponList.json',
            type: 'get',
            data: {
            },
            dataType: 'json',
            fail: ()=>true,
            complete: data => {
                console.log(data);
                let packageList = data.data.packageList;
                let couponAvailableList = data.data.couponAvailableList;
                let couponEndList = data.data.couponEndList;
                this.setState({
                    giftList:packageList,
                    limitList:couponAvailableList,
                    endList:couponEndList
                })
                if (packageList.length==0&&couponAvailableList.length==0&&couponEndList.length==0){
                    this.setState({isShowEmpty:true})
                }
            }
        });
    }
    render(){
        let {isShowEmpty,giftList,limitList,endList} = this.state;
        return  <div className="totalBox">
            {isShowEmpty&&<EmptyShow/>}
            {giftList.length!==0&&<GiftBag list={giftList} request={this.requestGiftList}/>}
            {limitList.length!==0&&<List list={limitList} request={this.requestGiftList}/>}
            {endList.length!==0&&<NoneList list={endList} request={this.requestGiftList}/>}
        </div>
    }
}
$FW.DOMReady(function () {
    if (!$FW.Browser.inApp()) {
        ReactDOM.render(<Header title={'领券中心'}/>, HEADER_NODE);
    }
    ReactDOM.render(<CouponCenter />, CONTENT_NODE)
});
