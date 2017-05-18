class CouponCenter extends React.Component {
    constructor(){
        super();
        this.state={
            isShowEmpty:false,
            isShowGiftBag:false,
            isShowList:false,
        }
    }
    componentDidMount(){
        this.setState({isShow:false,isShowGiftBag:true,isShowList:true});
    }
    render(){
        let {isShowEmpty,isShowGiftBag,isShowList} = this.state;
        return  <div className="totalBox">
            {isShowEmpty&&<EmptyShow isShow={isShow}/>}
            {isShowGiftBag&&<GiftBag/>}
            {isShowList&&<List/>}
        </div>
    }
}
$FW.DOMReady(function () {
    if (!$FW.Browser.inApp()) {
        ReactDOM.render(<Header title={'领券中心'}/>, HEADER_NODE);
    }
    ReactDOM.render(<CouponCenter />, CONTENT_NODE)
});
