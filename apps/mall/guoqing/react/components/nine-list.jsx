const NineList = React.createClass({
    getInitialState: function () {
        return {
            position: 0,
            with_animate: true
        }
    },
    componentDidMount: function () {
        this.startScroll()
    },
    startScroll: function () {
        this._timer = setInterval(this.moveUp, 2000);
    },
    moveUp: function () {
        if (this.props.prize_list.length > 2) {
            var next_p = this.state.position + 2;
            this.setState({
                position: this.state.position + 2,
                with_animate: true
            }, ()=> {
                if (next_p >= this.props.prize_list.length) {
                    setTimeout(function () {
                        this.setState({
                            with_animate: false,
                            position: 0
                        })
                    }.bind(this), 1000)
                }
            });
        }
    },
    render: function () {
        let prize = (d, index) => {
            if (!d) return null;
            let time = d.time.substring(0, 10);
            return <div key={index} className="Nine-list-li">
                <div className="avatar"><img src={d.avatar}/></div>
                <div className="name">{d.name}</div>
                <div className="get-prize">抽中了{d.prizeName}</div>
                <div className="time">{time}</div>
            </div>
        };
		
        let prize_list = this.props.prize_list;
        let no_data=() => {
        	return <div className="Nine-list-no">暂无抽奖记录</div>
        };
        let end_data=() => {
        	return <div className="Nine-list-end">活动已结束</div>
        };        
		let data_list=() => {
			if(false){
				return (<div
                    className={"Nine-list-ul"}
                    style={{top: "0px"}}>
                    {end_data()}
                </div>)
			}else{
				return (<div
                    className={this.state.with_animate ? "Nine-list-ul with-animate" : "Nine-list-ul"}
                    style={{top: -152 * this.state.position / 2 + 'px'}}>
                    {prize_list.length==0?no_data():prize_list.map(prize)}
                    {prize_list.length > 2?[prize_list[0], prize_list[1]].map(prize):null}
                </div>)
			}
        	
       };
        return (
            <div className="Nine-list-box">            
                {data_list()}
            </div>
        );
    }
});
