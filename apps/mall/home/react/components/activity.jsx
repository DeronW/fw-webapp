const ActivityProduct = React.createClass({
    render: function () {
        let {img, title, activity_id, bizNo, products} = this.props;

        function click() {
            gotoHandler(`/static/mall/activity/index.html?bizNo=${bizNo}&activity_id=${activity_id}`)
        }

        let banner;
        if (img) {
            banner = (
                <div className="index-actList-img">
                    <a onClick={click}>
                        <img src={img || 'images/default-banner.jpg'}/>
                    </a>
                </div>
            )
        }

        return (
            <div className="index-actList-box">
                <ActivityProduct.TextBar title={title} bizNo={bizNo} activity_id={activity_id}/>
                {banner}
                <div className="index-actList-list">
                    {products.map((data, index) => <ProductItem {...data} key={index}/>)}
                </div>
            </div>
        )
    }
});

ActivityProduct.TextBar = React.createClass({
    render: function () {
        var props = this.props;

        function click() {
            var url = '/static/mall/activity/index.html?';
            url += 'title=' + encodeURIComponent(props.title);
            url += '&bizNo=' + props.bizNo;
            url += '&activity_id=' + props.activity_id;
            gotoHandler(url)
        }

        return (
            <div className="index-actList-h">
                <div className="index-actList-htext">
                    <span className="vertical-line"> </span>
                    {this.props.title}
                </div>
                <a onClick={click}
                   className="index-actList-hmore" id={this.props.activity_id}>更多</a>
            </div>
        )
    }
});
