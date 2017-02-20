const GameGuess_inf = React.createClass({
    render: function () {
        return (
            <div className="inf-result">
                <div className="inf-box">
                    <div className="inf-close" onClick={this.props.changeInfHandler}></div>
                    <div className="inf-cnt-box">
                        <div className="inf-cnt">
                            <div className="inf-cnt-title inf-cnt-title1">活动时间</div>
                            <div className="inf-cnt-li">2016/09/02 0:00 ~ 2016/09/08 24:00</div>
                            <div className="inf-cnt-title inf-cnt-title2">活动奖品</div>
                            <div className="inf-cnt-li">iPhone6s（64G）、小辣椒手机、经典干红葡萄酒、爱奇艺月卡、爱奇艺周卡、5元返现券、10工分、5工分。</div>
                            <div className="inf-cnt-title inf-cnt-title3">活动说明</div>
                            <div className="inf-cnt-li">1、10工分即可参与大转盘抽奖一次，大转盘100%有奖；<br />2、抽奖获得任意奖品，均实时发放(实物奖品以兑换券形式实时发放到工场账户，中奖者到豆哥商城自行兑换)；<br />3、所获得5元返现券为全场通用券，不限标的（债权转让除外）；<br />4、本活动规则解释权归金融工场所有。
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
});
