'use strict';
const GameGuess_popResult = React.createClass({
    render:function(){
        let data=this.props.data;
        let getPrize=()=>{
            let text;
            if(data.result){
                text="恭喜您赢得"+data.getPrize;
            }else{
                text="没有获得奖品，再和豆哥来一局！";
            }
            return (
                <div className="pop-result-text">{text}</div>
            )
        };
        return (
            <div className="pop-result">
                <div className="pop-result-cnt">
                    {getPrize()}
                    <div className="pop-result-btn">
                        <div className="go-on" onClick={data.hideResultHandLer}>继续猜拳</div>
                        <div className={data.result&&data.level<2?"go-next":"go-next off"} onClick={data.result&&data.level<2?data.nextHandler:null}>下一关</div>
                    </div>
                </div>
            </div>
        )
    }
});

