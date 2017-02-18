

const ItemDetail = React.createClass({
    itemHideHandler: function () {
        this.props.callbackItemDetailHide(false);
    },
    render: function () {
        let item_list = (item, index) => {
            return (
                <div className="item-list" key={index}><span className="item-left">{item.feeName}</span><span
                    className="item-right">{item.feeAmoutStr}元</span></div>
            )
        };
        return (
            <div className="mask">
                <div className="detail-pop">
                    <div className="close-icon" onClick={this.itemHideHandler}></div>
                    <div className="item-title">借款费用详情</div>
                    <div className="item-wrap">
                        {this.props.feeExtList.map(item_list)}
                    </div>
                    <div className="know-btn" onClick={this.itemHideHandler}>知道了</div>
                </div>
            </div>
        )
    }
});
