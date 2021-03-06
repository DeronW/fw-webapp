const HotActivity = React.createClass({
    render: function () {
        let data = this.props.data.activities;
        let list = (pro, key)=> {
            if (key < 3) {
                return <a href={`/static/mall/product-detail/index.html?bizNo=${pro.bizNo}`} key={key}><img
                    src={pro.img||'images/default-product.jpg'}/></a>
            }
        };
        let li = (li, index)=> {
            return (
                <div className="hot-li" key={index}>
                    <a href={`/static/mall/activity/index.html?&bizNo=${li.bizNo}&activity_id=${li.activity_id}`}
                       className="hot-banner"><img src={li.img}/> </a>
                    <div className="hot-list">{li.products.map(list)}</div>
                    <a href={`/static/mall/activity/index.html?&bizNo=${li.bizNo}&activity_id=${li.activity_id}`}
                       className="hot-all">查看全部>></a>
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
$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"热门活动"}/>, HEADER_NODE);
    $FW.Ajax({
        url: `${API_PATH}/mall/api/index/v1/activities.json`,//热门活动
        success: (data) => {
            ReactDOM.render(<HotActivity data={data}/>, CONTENT_NODE);
        }
    });
});


