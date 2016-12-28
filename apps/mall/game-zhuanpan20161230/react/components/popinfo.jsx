const PopInf = React.createClass({
    render: function () {
        return (
            <div className="pop-inf-box on">
                <div className="pop-inf">
                    <div className="pop-inf-title">活动说明</div>
                    <div className="pop-inf-cnt">
                        <div className="pop-inf-li">
                            <div className="pop-inf-h">一.活动时间:</div>
                            <div className="pop-inf-detail">2016年12月31日开始</div>
                        </div>
                        <div className="pop-inf-li">
                            <div className="pop-inf-h">二.活动奖品:</div>
                            <div className="pop-inf-detail">德铂蒸锅、0.5%返息券、10元返现券、豆哥玩偶、20元返现券、5元返现券、豆哥台历、2元返现券</div>
                        </div>
                        <div className="pop-inf-li">
                            <div className="pop-inf-h">三.活动内容:</div>
                            <div className="pop-inf-detail">1、200工分即可参与大转盘抽奖一次。<br/>
                                2、抽奖获得任意奖品，均实时发放（实物奖品以兑换券形式实时发放到工场账户，兑换券有效期30天。请中奖者收到兑换券后30天内到豆哥商城自行兑换，过期按自动放弃领取奖品对待）。<br/>
                                3、	所获得2元、5元、10元、20元返现券及0.5%返息券，均为全场通用券，不限标的、期限（投资债权转让项目除外），返现券、返息券有效期7天。<br/>
                                4、活动规则解释权归金融工场所有。<br/>
                            </div>
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
