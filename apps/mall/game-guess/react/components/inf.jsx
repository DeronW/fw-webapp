'use strict';
const GameGuess_inf = React.createClass({
    render:function(){
        return (
            <div className="inf-result">
                <div className="inf-box">
                    <div className="inf-title">活动说明</div>
                    <div className="inf-cnt">
                        <div className="inf-cnt-li">1.奥斯卡的几哈开始打好点啥都看见</div>
                        <div className="inf-cnt-li">2.奥斯卡的几哈开始打好点啥都看见,始打好点啥都看见</div>
                        <div className="inf-cnt-li">3.奥斯卡的几哈开始打好点啥都看见</div>
                        <div className="inf-cnt-li">4.奥斯卡的几哈开始打好点啥都看见,始打好点啥都看见</div>
                        <div className="inf-cnt-li">5.奥斯卡的几哈开始打好点啥都看见,始打好点啥都看见</div>
                        <div className="inf-cnt-li">6.奥斯卡的几哈开始打好点啥都看见,始打好点啥都看见,始打好点啥都看见,始打好点啥都看见</div>
                    </div>
                </div>
                <div className="inf-close" onClick={this.props.changeInfHandler}></div>
            </div>
        )
    }
});

