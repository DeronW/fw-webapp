const PopPrize = React.createClass({
    render: function () {
        var prize = "谢谢参与！";
        if (this.props.masker == 1) {
            prize = "谢谢参与";
        } else if (this.props.masker == 2) {
            prize = "恭喜您，获得10工分！";
        } else if (this.props.masker == 3) {
            prize = "恭喜您，获得5元返现券！";
        } else if (this.props.masker == 4) {
            prize = "恭喜您，获得豆哥书包！";
        } else if (this.props.masker == 5) {
            prize = "恭喜您，获得100工分！";
        } else if (this.props.masker == 6) {
            prize = "谢谢参与！";
        } else if (this.props.masker == 7) {
            prize = "恭喜您，获得100元返现券！";
        } else if (this.props.masker == 8) {
            prize = "恭喜您，获得1%返息券！";
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
