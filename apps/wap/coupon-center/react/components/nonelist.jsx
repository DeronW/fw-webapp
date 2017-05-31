class NoneList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            none_list: this.props.list,
        }
    }

    componentDidMount() {
    }

    render() {
        let {none_list} = this.state;
        let none_list_func = (item, index) => {
            let none_no =  <div className="none_item_right">
                <div className="gray_state"></div>
                <div className="state_button gray_lq">领取</div>
            </div>;
            let none_yes = <a className="none_item_right" href="www.baidu.com">
                <div className="red_state"></div>
                <div className="state_button red_invest">去投资</div>
            </a>
            let none_get = item.isGet == "0" ? none_no : none_yes;
            return <div className={item.isGet =="0"?"none_item_box none_noget":"none_item_box none_get"} key={index}>
                <div className="none_item_left">
                    <div className="detail_left">
                        <div className="list_amount"><span className="list_rmb">￥</span>{item.limitAmount}</div>
                        <div className="list_name">{item.sourceTitle}</div>
                    </div>
                    <div className="detail_right">
                        <div>满￥{}可用</div>
                        <div>任意期限可用</div>
                        <div>有效期至</div>
                        <div>适用：</div>
                    </div>
                </div>
                {none_get}
            </div>
        }
        return <div className="none_box">
            <div className="none_box_title">
                <img src="images/icon-end.png" className="icon_end"/>
                <span className="end_title">已结束</span>
            </div>
            {none_list.length > 0 && none_list.map(none_list_func)}
        </div>
    }
}
