const HotActivity = React.createClass({
    render: function(){
        let data=this.props.data.activities;
        let list=(pro,key)=>{
            return <a href={''+pro.bizNo}><img src={pro.img}/></a>
        };
        let li=(li,index)=>{
                return (
                        <div className="hot-li" key={index}>
                            <a href={'?'+li.activity_id} className="hot-banner"><img src={li.img}/> </a>
                            <div className="hot-list">{li.products(list)} </div>
                            <a href={'?'+li.activity_id} className="hot-all">查看全部>></a>
                        </div>
                    )
            };
        return (
           <div className="hot-activity">
               {data.map(li)}
           </div>
      )
    }
});
$FW.DOMReady(function(){
    NativeBridge.setTitle('热门活动');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"热门活动"}/>, document.getElementById('header'));
    $FW.Ajax({
        url: `${API_PATH}api/index/v1/activities.json`,//热门活动
        success: (data) => {
            ReactDOM.render(<HotActivity data={dataAjax} />, document.getElementById('cnt'));
        }
    });
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}


