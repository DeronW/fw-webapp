const GameGuess_popResult = React.createClass({
    render: function () {
        let data = this.props.data;
        let win;
        if (data.level == 0) {
            win = <div className={"pop-win-box pop-win-box"+data.level}>
                <div className="pop-win-cnt">
                    <div className="pop-win-title">天降横财</div>
                    <div className="pop-win-get">本局获得:&nbsp;<span>{data.get_prize}</span></div>
                    <div className="pop-win-btn">
                        <div className="win-tip">第{(data.level + 1) % 3 + 1}局胜利可得{data.next_get_prize}哦
                            <div className="win-tip-triangle">&nbsp;</div>
                        </div>
                        <div className="win-on" onClick={()=>{data.nextHandler((data.level+1)%3)}}>
                            <span>{data.next_cost_score}</span>&nbsp;继续挑战
                        </div>
                        <div className="win-int" onClick={()=>{data.nextHandler(0)}}>再战第1关</div>
                    </div>
                </div>
            </div>;
        } else if (data.level == 1) {
            win = <div className={"pop-win-box pop-win-box"+data.level}>
                <div className="pop-win-cnt">
                    <div className="pop-win-title">人品爆发中</div>
                    <div className="pop-win-get">本局获得:&nbsp;<span>{data.get_prize}</span></div>
                    <div className="pop-win-btn">
                        <div className="win-tip">第{(data.level + 1) % 3 + 1}局胜利可得{data.next_get_prize}哦
                            <div className="win-tip-triangle">&nbsp;</div>
                        </div>
                        <div className="win-on" onClick={()=>{data.nextHandler((data.level+1)%3)}}>
                            <span>{data.next_cost_score}</span>&nbsp;继续挑战
                        </div>
                        <div className="win-int" onClick={()=>{data.nextHandler(0)}}>再战第1关</div>
                    </div>
                </div>
            </div>;
        } else if (data.level == 2) {
            win = <div className={"pop-win-box pop-win-box"+data.level}>
                <div className="pop-win-cnt">
                    <div className="pop-win-title">高手在民间</div>
                    <div className="pop-win-get">本局获得:&nbsp;<span>{data.get_prize}</span></div>
                    <div className="pop-win-btn">
                        <div className="win-tip">没玩够？想赚更多
                            <div className="win-tip-triangle">&nbsp;</div>
                        </div>
                        <div className="win-on" onClick={()=>{data.nextHandler((data.level+1)%3)}}><span></span>&nbsp;
                            再来一轮
                        </div>
                        <div className="win-int" href="http://mmall.9888.cn/">去购物</div>
                    </div>
                </div>
            </div>;
        }

        let lose = <div className="pop-lose-box">
            <div className="pop-lose-cnt">
                <div className="pop-lose-title1">挑战失败</div>
                <div className="pop-lose-title2">别灰心，坚持就会有收获</div>
                <div className="pop-lose-btn">
                    <div className="lose-int" onClick={()=>{data.nextHandler(0)}}>开启第一关</div>
                    <a href="http://mmall.9888.cn/" className="lose-go-buy">购物去</a>
                </div>
            </div>
        </div>;
        return (
            <div className="pop-result">
                {data.result ? win : lose}
            </div>
        )
    }
});

