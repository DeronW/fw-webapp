const PopInf = React.createClass({
    render: function () {
        return (
            <div className="pop-inf-box on">
                <div className="pop-inf">
                    <div className="pop-inf-title">活动说明</div>
                    <div className="pop-inf-cnt">
                        <div className="pop-inf-li">
                            <div className="pop-inf-h">一.活动时间:</div>
                            <div className="pop-inf-detail">2016年10月25日00:00:00</div>
                        </div>
                        <div className="pop-inf-li">
                            <div className="pop-inf-h">二.活动奖品:</div>
                            <div className="pop-inf-detail">豆哥双肩包（星星款）、迪士尼电饼铛、10元返现券、5元返现券、1.5%返息券、0.6%返息券、20工分、5工分</div>
                        </div>
                        <div className="pop-inf-li">
                            <div className="pop-inf-h">三.活动内容:</div>
                            <div className="pop-inf-detail">1、10工分即可参与大转盘抽奖一次。<br/>
2、本次大转盘活动仅限移动端参与。参与方式：打开金融工场手机APP—点击“豆哥商城”—“大转盘”即可抽奖。。<br/>
3、抽奖获得任意奖品，均实时发放（实物奖品以兑换券形式实时发放到工场账户，兑换券有效期30天。请中奖者收到兑换券后30天内到豆哥商城自行兑换，过期按自动放弃领取奖品对待）。<br/>
4、所获得5元、10元返现券、0.6%、1.5%返息券均为全场通用券，不限标的、期限（投资债权转让项目除外），返现券、返息券有效期7天。<br/>
5、本活动长期有效，实物奖品不定期更换，不再另行通知，以实时抽到奖品为准。<br/>
6、本活动规则解释权归金融工场所有。</div>
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