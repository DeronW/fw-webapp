'use strict';

const API_PATH = document.getElementById('api-path').value;
//window._nine_data={
	
//};
//this.setState({
//    account: numberFormat.format(event.target.value)
//});
//模拟数据
var data=[
	{
		avatar:'images/img4.png',
		name:'my**12',
		usableScore:567675670,
		level:'VIP1',
	},
	{
		needScore:3000,
		remainTimes:30,
	},
	{
		prizeList:[
			{
				avatar:'images/img4.png',
				name:'my1**12',
				prize:'抽到了100元返现券',
				time:'2016.06.08',				
			},
			{
				avatar:'images/img1.png',
				name:'my1**12',
				prize:'抽到了5元红包',
				time:'2016.06.08',				
			},
			{
				avatar:'images/img3.png',
				name:'my1**12',
				prize:'抽到了50元红包',
				time:'2016.06.08',				
			},
			{
				avatar:'images/img2.png',
				name:'my1**12',
				prize:'抽到了10元红包',
				time:'2016.06.08',				
			},
		]
	},
	{
		prize:'抽到了100元红包',
		usableScore:333330,
		remainTimes:10,
		prizeMark:7
	}
];
const NineActivity = React.createClass({
	getInitialState: function () {
        return {
        	showPopInf:false,
        	showPopPrize:false,
        	masker:2,
        	usableDraw:true,
        	moveNum:0       	
        }
   },
    showPopPrize:function(){
    	this.setState({
    		PopPrize:true
    	});
    },
    showPopInf:function(){
    	this.setState({
    		showPopInf:true
    	});
    },
    hidePopInf:function(){
    	this.setState({
    		showPopInf:false
    	});
    },
    hidePopPrize:function(){
    	this.setState({
    		showPopPrize:false
    	});
    },
    clickDraw:function(){
    	if(this.props.rule.remainTimes>0&&this.state.usableDraw){
    		this.setState({
	    		usableDraw:false
	    	});

    	//  $FW.Ajax({
		//      url: API_PATH + 'mall/api/index/v1/activity.json?bizNo=' + bizNo,
		//      enable_loading: true,
		//      success: function (data) {
			var _this=this;

			
			clearTimeout(drawTime);
			drawMove();
			function drawMove(){
				clearTimeout(drawTime);
				drawTime=setTimeout(function(){
					drawSpeed=drawSpeed+timeStep;					
					if(drawSpeed>=300){
						timeStep=-timeStep;
					}else if(drawSpeed<=20){
						timeStep=10;
					}else if(drawSpeed==200&&timeStep>0||drawSpeed==205&&timeStep>0){
						timeStep=10;
					}else if(drawSpeed==200&&timeStep<0||drawSpeed==205&&timeStep<0){
						timeStep=-5;
					}else if(drawSpeed>240&&timeStep>0){
						timeStep=timeStep+5;
					};
					_this.setState({
			    		masker:_this.state.masker>=8?1:_this.state.masker+1
			    	});
			    	console.log(drawSpeed);			    	
			    	drawMove();			    	
		    	},drawSpeed);
			}
			
			setTimeout(function(){
				_this.props.rule.remainTimes = _this.props.draw.remainTimes;
				_this.props.user.usableScore = _this.props.draw.usableScore;
				_this.setState({
		    		showPopPrize:true,
		    		usableDraw:data[3].remainTimes>0?true:false,
		    		masker:data[3].prizeMark
		    	});
		    	clearTimeout(drawTime);
		    	timeStep=10;
		    	drawSpeed=10;
			},3000);
				
		            
		//      }
		//  });
    	}else{
    		this.setState({
		    	usableDraw:false
		    })
    	}
    },
    render: function () {     	
    	
        return (
            <div className="nine-box">        		 
        		 <Ninehead user={this.props.user}/>
        		 <NineDraw rule={this.props.rule} masker={this.state.masker} clickDraw={this.clickDraw}/>
        		 <NineList list={this.props.list}/>
        		 <PopInf showPopInf={this.state.showPopInf} hidePopInf={this.hidePopInf}/>
        		 <PopPrize showPopPrize={this.state.showPopPrize} hidePopPrize={this.hidePopPrize}  masker={this.state.masker} remainTimes={this.props.rule.remainTimes}/>
        		 <div className="btn-inf-show" onClick={this.showPopInf}></div>
        		
            </div>
        )
    }
});
const Ninehead = React.createClass({
    render: function () {       
        return (
            <div className="Ninehead">
        		<div className="usable-score">{this.props.user.usableScore}</div>  
        		<div className="my-level">{this.props.user.level}</div>
            </div>
        )
    }
});
const NineDraw = React.createClass({
    render: function () {
    	var prizeNum=[1,2,3,4,5,6,7,8];
    	var masker=this.props.masker;
        return (
            <div className="Nine-draw">
        		<div className="tip">
        			<div className="tip-score">单次消耗<span>{this.props.rule.needScore}</span>工分</div>
        			<div className="tip-line"></div>
        			<div className="tip-score">今日剩<span>{this.props.rule.remainTimes}</span>次</div>        			
        		</div>
        		<div className="prize-box">
	        		{		        			
	        			prizeNum.map(function(data){
	        				return(
	        					<div className={"prize-li prize-li"+data}>
		        				<div className={"prize prize"+data}></div>
		        					<div className={data==masker?"prize-masker on":"prize-masker"}></div>       				
		        				</div>
	        				)	        				
	        			})
	        		}        			
        		</div>
        		<div className={this.props.rule.remainTimes>0?"prize-btn":"prize-btn off"} onClick={this.props.clickDraw}><img src="images/gray-start.png"/></div>
            </div>
        )
    }
});

const NineList = React.createClass({
	componentDidMount: function(){
		listMove();
	},
    render: function () {     	
        return (
            <div className="Nine-list-box" id="Nine-list-box">
        		<div className="Nine-list-ul Nine-list-ul1">
        			{	
        				this.props.list.prizeList.map(function(prizeList){
        					return(
        						<div className="Nine-list-li">
			        				<div className="avatar"><img src={prizeList.avatar}/></div>
			        				<div className="name">{prizeList.name}</div>
			        				<div className="get-prize">{prizeList.prize}</div>
			        				<div className="time">{prizeList.time}</div>
			        			</div>
        					)
        				})
        			}
        		</div>
        		<div className="Nine-list-ul">
        			{	
        				this.props.list.prizeList.map(function(prizeList){
        					return(
        						<div className="Nine-list-li">
			        				<div className="avatar"><img src={prizeList.avatar}/></div>
			        				<div className="name">{prizeList.name}</div>
			        				<div className="get-prize">{prizeList.prize}</div>
			        				<div className="time">{prizeList.time}</div>
			        			</div>
        					)
        				})
        			}
        		</div>	        		
            </div>
        )
    }
});
const PopPrize = React.createClass({
    render: function () {    
    	var prize="谢谢参与！";
		if(this.props.masker==1){
			prize="谢谢参与";
		}else if(this.props.masker==2){
			prize="恭喜您，获得10工分！";
		}else if(this.props.masker==3){
			prize="恭喜您，获得5元返现券！";
		}else if(this.props.masker==4){
			prize="恭喜您，获得豆哥书包！";
		}else if(this.props.masker==5){
			prize="恭喜您，获得100工分！";
		}else if(this.props.masker==6){
			prize="谢谢参与！";
		}else if(this.props.masker==7){
			prize="恭喜您，获得100元返现券！";
		}else if(this.props.masker==8){
			prize="恭喜您，获得1%返息券！";
		};
		
        return (
            <div className={this.props.showPopPrize?"pop-prize-box on":"pop-prize-box"}>
        		<div className="pop-prize">
        			<div className="pop-prize-cnt">
        				<div className="pop-prize-text1">手气爆棚</div>
        				<div className="pop-prize-text2">{prize}</div>
        				<div className="pop-prize-btn1" onClick={this.props.hidePopPrize}>今日还有<span>{this.props.remainTimes}</span>次机会</div>
        				<a className="pop-prize-btn2" onClick={this.props.hidePopPrize}>投资赚工分</a>
        			</div>
        			<div className="pop-prize-close" onClick={this.props.hidePopPrize}></div>
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
            <div className={this.props.showPopInf ?"pop-inf-box on":"pop-inf-box"}>
        		<div className="pop-inf">
        			<div className="pop-inf-title">活动说明</div>
        			<div className="pop-inf-cnt">
        				<div className="pop-inf-li">1、活动期间，若被邀请人首次投资选择债权转让项目，则该被邀请的好友不计入邀请人奖励统计；且投资人投资债权转让项目，该笔投资不享受活动福利。</div>        				
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

var listMoveTime="";
var drawTime='';
var drawSpeed=10;
var timeStep=10;
function listMove(){
	var objBox=document.getElementById("Nine-list-box");
	var objUl1=document.getElementsByClassName("Nine-list-ul")[0];
	var objUl2=document.getElementsByClassName("Nine-list-ul")[1];
	var objHeight=objUl1.offsetHeight;
	var moveHeight="152px";	
	function Marquee(){			
		if(objUl2.offsetHeight-objBox.scrollTop<=0){				
			objBox.scrollTop=0;
		}
		else{
			objBox.scrollTop++;				
		}
	}
	clearInterval(listMoveTime);
	console.log(listMoveTime);
	listMoveTime=setInterval(Marquee,20);
};
$FW.DOMReady(function () {
	NativeBridge.setTitle('豆哥玩玩乐');
	
	if ($FW.Utils.shouldShowHeader())
	ReactDOM.render(<Header title={"豆哥玩玩乐"} back_handler={backward}/>, document.getElementById('header'));
//	$FW.BatchGet([
//      API_PATH + 'mall/api/index/v1/nineUser.json', // 用户的工分,用户等级,用户头像链接,登录名
//      API_PATH + 'mall/api/index/v1/nineRule.json' // 活动消耗规则,每次消耗积分,还剩多少次
//      API_PATH + 'mall/api/index/v1/nineList.json' // 活动用户列表,用户登录名,头像地址,获得奖品,获得奖品时间.
//      API_PATH + 'mall/api/index/v1/nineDraw.json' // 活动进行抽奖,返回本次用户抽中奖品,还剩的次数,还剩的工分
//$FW.Component.showAjaxLoading();
//$FW.Component.hideAjaxLoading();



//      //'http://127.0.0.1/banners.json',
//      //'http://127.0.0.1/activities.json'
//  ], function (data) {
//      var banners = data[0].banners, activities = data[1].activities;
//      if (typeof(banners) == 'undefined' || typeof(activities) == 'undefined') $FW.Component.Alert('error: empty data received');
//      ReactDOM.render(<Mall banners={banners} activities={activities}/>, document.getElementById('cnt'));

	ReactDOM.render(<NineActivity user={data[0]} rule={data[1]} list={data[2]} draw={data[3]}/>, document.getElementById('cnt'));	
	
	
//  }, true);


//  $FW.Ajax({
//      url: API_PATH + 'mall/api/index/v1/activity.json?bizNo=' + bizNo,
//      enable_loading: true,
//      success: function (data) {
//            ReactDOM.render(<NineActivity />, document.getElementById('cnt'));
            
//      }
//  });
});

function backward(){
	$FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}

window.onNativeMessageReceive = function (msg) {
	if (msg == 'history:back') backward()
};
