class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buyingList: [],
            noneList: [],
            current_time:""
        }
    }

    componentDidMount() {
        $FW.Ajax({
            url: API_PATH + '/activity/v1/timestamp.json',
            type: 'get',
            data: {},
            dataType: 'json',
            fail: () => true,
            complete: data => {
                // console.log(data);
                console.log(data.data.timestamp)
                this.setState({currentTime: data.data.timestamp})
            }
        });

    }

    render() {
        let {buyingList, noneList} = this.state;
        let buy_func = (item,index)=>{
                let show_name,show_time,show_get;
                if(item.start_time < current_time){
                    show_name="开抢时间"
                    show_time = item.start_time
                }else if(item.end_time < current_time){
                    show_name="已抢光"
                }
                return <div>
                    <div>{item.title}</div>
                    <div>{item.date}</div>
                    <div>{item.des}</div>
                    <div className={show_name=="已抢光"? "done":"name"}>{show_name}</div>
                </div>
        }
        let none_func =(item,index)=>{

        }
        return <div className="list-box">
            这是下面的列表
            {buyingList.length > 0 && buyingList.map(buy_func)}
            {noneList.length > 0 && noneList.map(none_func)}
        </div>
    }
}
