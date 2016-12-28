const ReadyGo = React.createClass({
    getInitialState: function () {
        return {
            num:3
        }
    },
    componentDidMount: function () {
        let readyGo;
       clearInterval(readyGo);
        readyGo=setInterval(()=>{
            if(this.state.num==0){
                clearInterval(readyGo);
                this.props.showReadyGo(false);
            }else{
                this.setState({
                    num:this.state.num-1
                })
            }
        },1000)
    },
    render: function(){
        return(
                <div className="ready-go">
                    <div className="ready-go-text1">红包雨即将来袭！</div>
                    <div className="ready-go-text2">你准备好了吗？</div>
                    <div className="ready-go-num">{this.state.num}</div>
                </div>
        );
    }
});




