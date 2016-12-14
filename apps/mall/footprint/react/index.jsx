const FootPrint = React.createClass({
    getInitialState: function () {

        return {
            list: [],
            hasNextPage:true,
            page:0

        }
    },
    componentDidMount: function () {
        $FW.Event.touchBottom(this.loadMoreProductHandler);
    },
    loadMoreProductHandler: function (done) {
        this.state.hasData ?
            Filter.search({page: this.state.page + 1}, (data)=> {
                this.appendProducts(data);
                this.setState({
                    page: this.state.page + 1,
                    hasData: data.hasData
                });
                done && done()
            }) : null;
    },
    appendProducts: function (data) {
        var list = this.state.products.slice();
        var newList = list.concat(data.products || []);
        this.setState({products: newList})
    },

    render: function(){

        return (
           <div className="foot-print">
                <div className="footPrint-clear">清空</div>
                <div className="footPrint-ul">
                   <div className="footPrint-data">11月18日</div>
                   <div className="footPrint-li">
                       <a href="#" className="footPrint-a">
                           <img src="" className="footPrint-img"/>
                           <div className="footPrint-detail">
                               <div className="footPrint-title">Apple / 苹果   iPad Air2 128G WIFI 64g 金色</div>
                               <div className="footPrint-pay"><span className="footPrint-price"><span>¥</span>2,199</span><span className="footPrint-plus">+</span><span className="footPrint-score">22233320工分</span></div>
                           </div>
                       </a>
                       <div className="footPrint-del"></div>
                   </div>
                    <div className="footPrint-li">
                        <a href="#" className="footPrint-a">
                            <img src="" className="footPrint-img"/>
                            <div className="footPrint-detail">
                                <div className="footPrint-title">Apple / 苹果   iPad Air2 128G WIFI 64g 金色</div>
                                <div className="footPrint-pay"><span className="footPrint-price"><span>¥</span>2,199</span><span className="footPrint-plus">+</span><span className="footPrint-score">22233320工分</span></div>
                            </div>
                        </a>
                        <div className="footPrint-del"></div>
                    </div>
               </div>
           </div>
      )
    }
});
$FW.DOMReady(function(){
    NativeBridge.setTitle('足迹');
    if ($FW.Utils.shouldShowHeader()){
        ReactDOM.render(<Header title={"足迹"}/>, document.getElementById('header'));
    }

    $FW.Ajax({
        url: `${API_PATH}mall/api/index/v1/activities.json`,//热门活动
        success: (data) => {
            ReactDOM.render(<FootPrint data={data} />, document.getElementById('cnt'));
        }
    });
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}


