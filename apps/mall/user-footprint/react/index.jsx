const FootPrint = React.createClass({
    getInitialState: function () {
        return {
            list: [],
            hasNextPage:true,
            page:0
        }
    },
    componentDidMount: function () {
        this.loadMoreProductHandler();
        $FW.Event.touchBottom(this.loadMoreProductHandler);
    },
    loadMoreProductHandler: function (done) {
        // let data={"list":[{"date":"1月3日","score":0,"bizNo":"B0000002884","img":"http://mmall.9888.cn/images/20161008/B0000002884_title1475916515730_M.jpg","price":23213,"title":"jd积分大姐夫哈市第","id":"sadasdd"},
        //     {"date":"1月3日","score":1,"bizNo":"B0000002884","img":"http://mmall.9888.cn/images/20161008/B0000002884_title1475916515730_M.jpg","price":23213,"title":"jd积分大姐夫哈市第","id":"sadasdd"},
        //     {"date":"1月4日","score":2,"bizNo":"B0000002884","img":"http://mmall.9888.cn/images/20161008/B0000002884_title1475916515730_M.jpg","price":23213,"title":"jd积分大姐夫哈市第","id":"sadasdd"},
        //     {"date":"1月3日","score":3,"bizNo":"B0000002884","img":"http://mmall.9888.cn/images/20161008/B0000002884_title1475916515730_M.jpg","price":0,"title":"jd积分大姐夫哈市第","id":"sadasdd"},{"date":"1月3日","score":0,"bizNo":"B0000002884","img":"http://mmall.9888.cn/images/20161008/B0000002884_title1475916515730_M.jpg","price":23213,"title":"jd积分大姐夫哈市第","id":"sadasdd"},
        //     {"date":"1月3日","score":1,"bizNo":"B0000002884","img":"http://mmall.9888.cn/images/20161008/B0000002884_title1475916515730_M.jpg","price":23213,"title":"jd积分大姐夫哈市第","id":"sadasdd"},
        //     {"date":"1月4日","score":2,"bizNo":"B0000002884","img":"http://mmall.9888.cn/images/20161008/B0000002884_title1475916515730_M.jpg","price":23213,"title":"jd积分大姐夫哈市第","id":"sadasdd"},
        //     {"date":"1月3日","score":3,"bizNo":"B0000002884","img":"http://mmall.9888.cn/images/20161008/B0000002884_title1475916515730_M.jpg","price":0,"title":"jd积分大姐夫哈市第","id":"sadasdd"},{"date":"1月3日","score":0,"bizNo":"B0000002884","img":"http://mmall.9888.cn/images/20161008/B0000002884_title1475916515730_M.jpg","price":23213,"title":"jd积分大姐夫哈市第","id":"sadasdd"},
        //     {"date":"1月3日","score":1,"bizNo":"B0000002884","img":"http://mmall.9888.cn/images/20161008/B0000002884_title1475916515730_M.jpg","price":23213,"title":"jd积分大姐夫哈市第","id":"sadasdd"},
        //     {"date":"1月4日","score":2,"bizNo":"B0000002884","img":"http://mmall.9888.cn/images/20161008/B0000002884_title1475916515730_M.jpg","price":23213,"title":"jd积分大姐夫哈市第","id":"sadasdd"},
        //     {"date":"1月3日","score":3,"bizNo":"B0000002884","img":"http://mmall.9888.cn/images/20161008/B0000002884_title1475916515730_M.jpg","price":0,"title":"jd积分大姐夫哈市第","id":"sadasdd"}],"hasNextPage":false};

        this.state.hasNextPage?
            AjaxList(this.state.page + 1, (data)=> {
               this.appendProducts(data);
                this.setState({
                    page: this.state.page + 1,
                    hasNextPage: data.hasNextPage
                });
                done && done()
            }) : null;
    },
    appendProducts: function (data) {
        var list = this.state.list.slice();
        var newList = list.concat(data.list || []);
        this.setState({list: newList})
    },
    clearAllHandler:function(){
        $FW.Ajax({
            url: `${API_PATH}mall/api/v1/footPrintDel.json`,//足迹删除
            data:{
                type:'all',
                id:''
            },
            method:'post',
            success: function(){
                this.setState({list:[]});
            }
        });
    },
    delHandler:function(id,key){
        $FW.Ajax({
            url: `${API_PATH}mall/api/v1/footPrintDel.json`,//足迹删除
            data:{
                type:'one',
                id:id
            },
            method:'post',
            success: function(){
                let list=this.state.list
                list.splice(key,1)
                this.setState({list:list});
            }
        });
    },
    render: function(){
        let myList=(list,key)=>{
            let date=key>0&&(this.state.list[key-1].date==list.date)?null:<div className="footPrint-data">{this.state.list[key].date}</div>;
            let price=list.price?<span className="footPrint-price"><span>¥</span>{$FW.Format.currency(list.price)}</span>:null;
            let score=list.score?<span className="footPrint-score">{list.score}工分</span>:null;
            let priceBox=()=>{
                return(
                    <div className="footPrint-pay" >
                        {price}
                        {list.price&&list.score?<span className="footPrint-plus">+</span>:null}
                        {score}
                    </div>
                )
            };
            return(
                <div key={key}>
                    {date}
                    <div className="footPrint-li">
                        <a href="#" className="footPrint-a">
                            <img src={list.img} className="footPrint-img"/>
                            <div className="footPrint-detail">
                                <div className="footPrint-title">{list.title}</div>
                                    {priceBox()}
                            </div>
                        </a>
                        <div className="footPrint-del" onClick={()=>{this.delHandler(list.id,key)}}></div>
                    </div>
                </div>
                )
        };
        return (
           <div className="foot-print">
                <div className="footPrint-clear" style={{"zIndex":10}} onClick={this.clearAllHandler}>清空</div>
                <div className="footPrint-ul">
                    {this.state.list.map(myList)}
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
    ReactDOM.render(<FootPrint />, document.getElementById('cnt'));

});
function AjaxList(page,callback){
    $FW.Ajax({
        url: `${API_PATH}mall/api/v1/footPrintList.json`,//足迹
        data:{
            num:10,
            pageNo:page
        },
        method:'post',
        success: data => callback(data)
    });
}
function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}


