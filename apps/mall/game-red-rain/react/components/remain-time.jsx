const RemainTime = React.createClass({
    getInitialState: function () {
        return {
            remainTime: 10,
        }
    },
    componentDidMount: function () {
        let remainTime;
        clearInterval(remainTime);
        remainTime = setInterval(()=> {
            if (this.state.remainTime == 0) {
                clearInterval(remainTime);
            } else {
                this.setState({
                    remainTime: this.state.remainTime - 1
                })
            }
        }, 1000)
    },
    render: function () {
        return (
                <div className="time-remain">倒计时：{this.state.remainTime}</div>
        );
    }
});




