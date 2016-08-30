const PopPrize = React.createClass({
    render: function () {
        var prize = "恭喜您，获得5工分！";
        if (this.props.masker == 0) {
            prize = "恭喜您，获得Iphone6s（64G）";
        } else if (this.props.masker == 1) {
            prize = "恭喜您，获得小辣椒手机！";
        } else if (this.props.masker == 2) {
            prize = "恭喜您，获得经典干红葡萄酒！";
        } else if (this.props.masker == 3) {
            prize = "恭喜您，获得爱奇艺月卡！";
        } else if (this.props.masker == 4) {
            prize = "恭喜您，获得爱奇艺周卡！";
        } else if (this.props.masker == 5) {
            prize = "恭喜您，获得5元返现券";
        } else if (this.props.masker == 6) {
            prize = "恭喜您，获得10工分！";
        } else if (this.props.masker == 7) {
            prize = "恭喜您，获得5工分！";
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
                        <div className="pop-prize-text2">{prize}</div>
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
