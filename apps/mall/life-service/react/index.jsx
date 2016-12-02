const Service = React.createClass({
    render: function(){
        return (
            <div>
                <div className="banner-wrap">
                    <div className="header"><a className="back-arrow"></a><span className="big-title">生活服务</span><a className="record-link">缴费记录</a></div>
                </div>
                <div className="charge-wrap">
                    <div className="water-charge">
                        <div className="water-item">
                            <img className="icon-img" src="images/water-icon.png"/><span className="water-title">水费</span><a className="charge-link">缴费</a>
                        </div>
                        <a className="charge-item"><span>北京朝阳丰联广场1105</span><span className="right-link-arrow"></span></a>
                    </div>
                    <div className="water-charge">
                        <div className="water-item">
                            <img className="icon-img" src="images/gas-icon.png"/><span className="water-title">天然气</span><a className="charge-link">缴费</a>
                        </div>
                        <a className="charge-item"><span>北京朝阳丰联广场1105</span><span className="right-link-arrow"></span></a>
                        <a className="charge-item"><span>北京朝阳丰联广场1105</span><span className="right-link-arrow"></span></a>
                        <a className="charge-item"><span>北京朝阳丰联广场1105</span><span className="right-link-arrow"></span></a>
                    </div>
                    <div className="water-charge">
                        <div className="water-item">
                            <img className="icon-img" src="images/ele-icon.png"/><span className="water-title">电费</span><a className="charge-link">缴费</a>
                        </div>
                        <a className="charge-item"><span>北京朝阳丰联广场1105</span><span className="right-link-arrow"></span></a>
                        <a className="charge-item"><span>北京朝阳丰联广场1105</span><span className="right-link-arrow"></span></a>
                        <a className="charge-item"><span>北京朝阳丰联广场1105</span><span className="right-link-arrow"></span></a>
                        <a className="charge-item"><span>北京朝阳丰联广场1105</span><span className="right-link-arrow"></span></a>
                    </div>
                </div>
                <div className="select-wrap">
                    <div className="select-box">
                        <select className="city-list">
                            <option value='' disabled selected>请选择城市</option>
                            <option value ="">1</option>
                            <option value ="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                        </select>
                        <select className="charge-company">
                            <option value='' disabled selected>请选择缴费公司</option>
                            <option value =""></option>
                            <option value =""></option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                        <div className="client-id">
                            <input type="text" value="" placeholder="请输入客户编号"/>
                        </div>
                    </div>
                    <a className="check-info-btn">查询</a>
                </div>

            </div>
        )
    }
});

$FW.DOMReady(function() {
    NativeBridge.setTitle('生活服务');
    ReactDOM.render(<Service/>, document.getElementById('cnt'));
});

function back_handler() {
    location.href = '/static/mall/home/index.html';
}