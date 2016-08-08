'use strict';

const API_PATH = document.getElementById('api-path').value;

const NineActivity = React.createClass({
	getInitialState: function () {
        return {}
    },
    render: function () {
       
        return (
            <div className="nine-box" style={{backgroundImage:'url(images/bg.jpg)'}}>
        		 <Ninehead/>   
        		 <NineDraw/>
        		 <NineList/>
        		 <PopInf/>
        		 <PopPrize/>
        		 <div className="btn-inf-show"></div>
            </div>
        )
    }
});
const Ninehead = React.createClass({
    render: function () {       
        return (
            <div className="Ninehead">
        		<div className="usable-score">111</div>  
        		<div className="my-level">VIP4</div>
            </div>
        )
    }
});
const NineDraw = React.createClass({
    render: function () {       
        return (
            <div className="Nine-draw">
        		<div className="tip">
        			<div className="tip-score">单次消耗<span>3000</span>工分</div>
        			<div className="tip-line"></div>
        			<div className="tip-score">今日剩<span>30</span>次</div>        			
        		</div>
        		<div className="prize-box">
        			<div className="prize-li prize-li1">
        				<div className="prize prize1"></div>
        				<div className="prize-masker on"></div>
        			</div>
        			<div className="prize-li prize-li2">
        				<div className="prize prize2"></div>
        				<div className="prize-masker"></div>
        			</div>
        			<div className="prize-li prize-li3">
        				<div className="prize prize3"></div>
        				<div className="prize-masker"></div>
        			</div>
        			<div className="prize-li prize-li4">
        				<div className="prize prize4"></div>
        				<div className="prize-masker"></div>
        			</div>
        			<div className="prize-li prize-li5">
        				<div className="prize prize5"></div>
        				<div className="prize-masker"></div>
        			</div>
        			<div className="prize-li prize-li6">
        				<div className="prize prize6"></div>
        				<div className="prize-masker"></div>
        			</div>
        			<div className="prize-li prize-li7">
        				<div className="prize prize7"></div>
        				<div className="prize-masker"></div>
        			</div>
        			<div className="prize-li prize-li8">
        				<div className="prize prize8"></div>
        				<div className="prize-masker"></div>
        			</div>
        		</div>
        		<div className="prize-btn off"><img src="images/gray-start.png"/></div>
            </div>
        )
    }
});

const NineList = React.createClass({
    render: function () {       
        return (
            <div className="Nine-list-box">
        		<div className="Nine-list-ul">
        			<div className="Nine-list-li">
        				<div className="avatar"><img src="images/img5.png"/></div>
        				<div className="name">sad***kk</div>
        				<div className="get-prize">抽到了100元红包</div>
        				<div className="time">2016.08.04</div>
        			</div>
        			<div className="Nine-list-li">
        				<div className="avatar"><img src="images/img5.png"/></div>
        				<div className="name">sad***kk</div>
        				<div className="get-prize">抽到了100元红包</div>
        				<div className="time">2016.08.04</div>
        			</div>
        			<div className="Nine-list-li">
        				<div className="avatar"><img src="images/img5.png"/></div>
        				<div className="name">sad***kk</div>
        				<div className="get-prize">抽到了10元返现券</div>
        				<div className="time">2016.08.04</div>
        			</div>
        		</div>
            </div>
        )
    }
});
const PopPrize = React.createClass({
    render: function () {       
        return (
            <div className="pop-prize-box">
        		<div className="pop-prize">
        			<div className="pop-prize-cnt">
        				<div className="pop-prize-text1">手气爆棚</div>
        				<div className="pop-prize-text2">恭喜您，获得100元红包！</div>
        				<div className="pop-prize-btn1">今日还有<span>2</span>次机会</div>
        				<a className="pop-prize-btn2">投资赚工分</a>
        			</div>
        			<div className="pop-prize-close"></div>
        		</div>
        		<div className="pop-prize-light"></div>
        		<div className="pop-prize-masker"></div>
            </div>
        )
    }
});
const PopInf = React.createClass({
    render: function () {       
        return (
            <div className="pop-inf-box">
        		<div className="pop-inf">
        			<div className="pop-inf-title">活动说明</div>
        			<div className="pop-inf-cnt">
        				<div className="pop-inf-li">1、活动期间，若被邀请人首次投资选择债权转让项目，则该被邀请的好友不计入邀请人奖励统计；且投资人投资债权转让项目，该笔投资不享受活动福利。</div>        				
        				<div className="pop-inf-li">2、返息券每次投标仅可使用一张，每张返息券仅可使用一次；</div>
        				<div className="pop-inf-li">3、实物奖统一于活动结束后、8月25日之前统一发送所获奖品兑换券至用户账号内，实物奖图片仅供参考；</div>
        				<div className="pop-inf-li">4、累投年化金额所得奖金将在活动结束后7个工作日内，以工豆形式发放至获奖用户账户内，工豆有效期为15天；</div>
        				<div className="pop-inf-li">5、活动最终解释权归金融工场所有，活动详情致电客服热线咨询:400-0322-988。</div>
        			</div>
        			<div className="pop-inf-close"></div>
        		</div>
        		<div className="pop-inf-light"></div>
        		<div className="pop-inf-masker"></div>
            </div>
        )
    }
});


$FW.DOMReady(function () {
	NativeBridge.setTitle('豆哥玩玩乐');
	if ($FW.Utils.shouldShowHeader())
	ReactDOM.render(<Header title={"豆哥玩玩乐"} back_handler={backward}/>, document.getElementById('header'));
//  $FW.Ajax({
//      url: API_PATH + 'mall/api/index/v1/activity.json?bizNo=' + bizNo,
//      enable_loading: true,
//      success: function (data) {
            ReactDOM.render(<NineActivity />, document.getElementById('cnt'));
            
//      }
//  });
});

function backward(){
	$FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}

window.onNativeMessageReceive = function (msg) {
	if (msg == 'history:back') backward()
};
