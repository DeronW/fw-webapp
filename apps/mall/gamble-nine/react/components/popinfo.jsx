const PopInf = React.createClass({
    render: function () {
        return (
            <div className="pop-inf-box on">
                <div className="pop-inf">
                    <div className="pop-inf-title">活动说明</div>
                    <div className="pop-inf-cnt">
                        <div className="pop-inf-li">
                            <div className="pop-inf-h">1.活动时间:</div>
                            <div className="pop-inf-detail">2016年9月5日-9月11日</div>
                        </div>
                        <div className="pop-inf-li">
                            <div className="pop-inf-h">2.活动奖品:</div>
                            <div className="pop-inf-detail">iPhone6s(64G)、小辣椒手机、经典干红葡萄酒、爱奇艺月卡、爱奇艺周卡、5元返现券、10工分、5工分</div>
                        </div>
                        <div className="pop-inf-li">
                            <div className="pop-inf-h">3.活动内容:幸运大转盘</div>
                            <div className="pop-inf-detail">① 普通会员可转动10次/每天;<br/>② VIP1会员可转动15次/每天;<br/>③ VIP2会员可转动20次/每天;<br/>④ VIP3会员可转动25次/每天;<br/>⑤ VIP4会员可转动30次/每天。</div>
                        </div>
                        <div className="pop-inf-li">
                        	<div className="pop-inf-h">4.活动说明:</div>
                            <div className="pop-inf-detail">① 10工分即可参与大转盘抽奖一次，100%有奖；<br/>② 抽奖获得任意奖品，均实时发放（实物奖品以兑换券形式实时发放到工场账户，兑换券有效期30天。请中奖者收到兑换券后30天内到豆哥商城自行兑换，过期按自动放弃领取奖品对待）；<br/>③ 所获得5元返现券为全场通用券，不限标的（债权转让除外）；<br/>④ 本活动规则解释权归金融工场所有。<br/></div>
                        </div>                       
                    </div>
                    <div className="pop-inf-close" onClick={this.props.hidePopInf}></div>
                </div>
                <div className="pop-inf-light"></div>
                <div className="pop-inf-masker"></div>
            </div>
        )
    }
});