const PopInf = React.createClass({
    render: function () {
        return (
            <div className="pop-inf-box on">
                <div className="pop-inf">
                    <div className="pop-inf-title">活动说明</div>
                    <div className="pop-inf-cnt">
                        <div className="pop-inf-li">
                            1、活动期间，若被邀请人首次投资选择债权转让项目，则该被邀请的好友不计入邀请人奖励统计；且投资人投资债权转让项目，该笔投资不享受活动福利。
                        </div>
                        <div className="pop-inf-li">2、返息券每次投标仅可使用一张，每张返息券仅可使用一次；</div>
                        <div className="pop-inf-li">3、实物奖统一于活动结束后、8月25日之前统一发送所获奖品兑换券至用户账号内，实物奖图片仅供参考；</div>
                        <div className="pop-inf-li">4、累投年化金额所得奖金将在活动结束后7个工作日内，以工豆形式发放至获奖用户账户内，工豆有效期为15天；</div>
                        <div className="pop-inf-li">5、活动最终解释权归金融工场所有，活动详情致电客服热线咨询:400-0322-988。</div>
                    </div>
                    <div className="pop-inf-close" onClick={this.props.hidePopInf}></div>
                </div>
                <div className="pop-inf-light"></div>
                <div className="pop-inf-masker"></div>
            </div>
        )
    }
});