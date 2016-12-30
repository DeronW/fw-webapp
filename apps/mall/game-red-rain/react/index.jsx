const GameRedRain = React.createClass({
    getInitialState: function () {
        return {
            showReadyGo:true,
            finished:false
        }
    },
    componentDidMount: function () {
        // $FW.Ajax({
        //     url: `${location.protocol}//game.9888.cn/index.php?r=polymerization/gamelist&fr=shop`,//游戏中心所有列表
        //     withCredentials: true,
        //     success: (data) => {
        //
        //     }
    },
    showReadyGo:function(a){
        this.setState({
            showReadyGo:a
        })
    },
    setFinished:function(a){
        this.setState({
            finished:a
        })
        console.log("sdad:"+this.state.finished);
    },
    render: function(){
        return(
            <div className="red-rain-box">
                {this.state.showReadyGo?<ReadyGo showReadyGo={this.showReadyGo} />:<Play setFinished={this.setFinished} finished={this.state.finished}/>}
            </div>
        );
    }
});

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
let getRedNUM=0;
$FW.DOMReady(function(){
    $FW.Event.cancelSlideDownRefresh();
    ReactDOM.render(<GameRedRain/>, document.getElementById('cnt'));

});



