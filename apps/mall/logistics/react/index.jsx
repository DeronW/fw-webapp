'use strict';
const API_PATH = document.getElementById('api-path').value;

const Logistics = React.createClass({
    render:function(){
        let ls = this.props.data.logistics;
        let logisticsItem = (l,index)=>{
            return (
                <div className="logistics-li" key={index}>
                    {index==0?<span className="first-mark-status"></span>:<span className="mark-status"></span>}
                    <span className="logistics-vertical-line"></span>
                    <div className={index==0? "logistics-title green":"logistics-title grey"}>{ls[index].text}</div>
                    <div className={index==0? "logistics-date green":"logistics-date grey"}>{ls[index].date}</div>
                </div>
            )
        };
        return (
            <div className="logistics">
                <div className="product-info">
                    <div className="logistics-info">
                        <div className="logistics-item logistics-margin-top-space">物流状态：运输中</div>
                        <div className="logistics-item">物流名称：{this.props.data.sendChannel}</div>
                        <div className="logistics-item">物流编号：40989666892359</div>
                    </div>
                </div>
                <div className="logistics-wrap">
                    {ls.map((l, index) => logisticsItem(l, index)) }
                </div>
            </div>
        )
    }
});


$FW.DOMReady(function() {
    NativeBridge.setTitle('查看物流');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"查看物流"} back_handler={backward}/>, document.getElementById('header'));
    $FW.Ajax({
        url: "http://localhost/nginx-1.9.12/html/logistics.json",
        enable_loading: true,
        success: function (data) {
            console.log(data);
            ReactDOM.render(<Logistics data={data}/>, document.getElementById('cnt'));
        }
    });
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}