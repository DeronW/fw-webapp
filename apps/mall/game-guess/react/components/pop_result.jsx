'use strict';
const GameGuess_popResult = React.createClass({
    render:function(){
        let data=this.props.data;
        let win=<div className="pop-win-box">
            <div className="pop-win-cnt">
                <div className="pop-win-title">天降横财</div>
                <div className="pop-win-get">本局获得:&nbsp;<span>{data.get_prize}</span></div>
                <div className="pop-win-btn">
                    <div className="win-tip">第{data.level+2}局胜利可得{data.next_get_prize}哦<div className="win-tip-triangle">&nbsp;</div></div>
                    <div className="win-on" onClick={()=>{data.nextHandler(data.level+1)}}><span>{data.next_cost_score}工分</span>继续挑战</div>
                    <div className="win-int" onClick={()=>{data.nextHandler(0)}}>好汉从头再来</div>
                </div>
            </div>
        </div>;
        let lose= <div className="pop-lose-box">
            <div className="pop-lose-cnt">
                <div className="pop-lose-title1">挑战失败</div>
                <div className="pop-lose-title2">别灰心，坚持就会有收获</div>
                <div className="pop-lose-btn">
                    <div className="lose-int" onClick={()=>{data.nextHandler(0)}}>开启第一关</div>
                    <a href="#" className="lose-go-buy" onClick={data.hideResultHandLer}>购物去</a>
                </div>
            </div>
        </div>;
        return (
            <div className="pop-result">
                {data.result?win:lose}
            </div>
        )
    }
});

