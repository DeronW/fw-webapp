const PopPrize = React.createClass({
    render: function () {
        let prize =()=>{
        	return <div className="pop-prize-text2">恭喜您,获得{this.props.popPrizeName}!</div>
        } 
        let popPrizeBtn1 = ()=> {
            if (this.props.infinitely) {
                return <div className="pop-prize-btn1" onClick={this.props.hidePopPrize}>
                    继续抽奖
                </div>
            } else {
                return <div className="pop-prize-btn1" onClick={this.props.hidePopPrize}>
                    今日还有<span>{this.props.remainTimes}</span>次机会
                </div>
            }
        };

        return (
            <div className="pop-prize-box on">
                <div className="pop-prize">
                    <div className="pop-prize-cnt">
                        <div className="pop-prize-text1">手气爆棚</div>
                        {prize()}
                        {popPrizeBtn1()}
                    </div>
                    <div className="pop-prize-close" onClick={this.props.hidePopPrize}></div>
                </div>
                <div className="pop-prize-light"></div>
                <div className="pop-prize-masker"></div>
            </div>
        )
    }
});