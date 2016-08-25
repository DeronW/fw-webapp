'use strict';

const API_PATH = document.getElementById('api-path').value;
const NineActivity = React.createClass({
    getInitialState: function () {
        return {
            showPopInf: false,
            showPopPrize: false,
            usableDraw: true,
            moveNum: 0,
            prize_list:this.props.prizeList.list,    
            usableScore:this.props.cost.usableScore,
            remainTimes:this.props.cost.remainTimes,
            masker:null,
            showAlertMessage:false,
            alertMessage:''
        }
    },
    setRemainTimes:function(n){
    	this.setState({
            remainTimes: n
       });
    },
    
    showPopPrize: function () {
        this.setState({
            showPopPrize: true
        });     
    },
    showPopInf: function () {
        this.setState({
            showPopInf: true
        });      
    },
    hidePopInf: function () {
        this.setState({
            showPopInf: false
        });
    },
    hidePopPrize: function () {
        this.setState({
            showPopPrize: false
        });
    },
    showAlertMessage: function (message) {
        this.setState({
        	alertMessage:message,
            showAlertMessage: true
        });
    },
    hideAlertMessage: function () {
        this.setState({
            showAlertMessage: false
        });
    },

    addPriceList: function (prize) {
    	
        var price_list = [prize].concat(this.state.prize_list);
        
        this.setState({prize_list: price_list});
       
    },
    setUsableScore: function (n) {        
        this.setState({usableScore:n});
    },
    setMasker:function (n) {        
        this.setState({masker:n});
    },
    
    render: function () {
    	let myLevel='普通用户';
    	if(this.props.user.userLevel==0){
    		myLevel='普通用户'
    	}else if(this.props.user.userLevel==1){
    		myLevel='VIP1'
    	}else if(this.props.user.userLevel==2){
    		myLevel='VIP2'
    	}else if(this.props.user.userLevel==3){
    		myLevel='VIP3'
    	}else if(this.props.user.userLevel==4){
    		myLevel='VIP4'
    	}
        return (
            <div className="nine-box">
                <div className="Ninehead">
                    <div className="usable-score">{this.state.usableScore}</div>
                    <div className="my-level">{myLevel}</div>
                </div>
                <NineDraw cost={this.props.cost} masker={this.setMasker} setUsableScore={this.setUsableScore} infinitely={this.props.cost.infinitely}
                user={this.props.user} addPriceList={this.addPriceList} showAlertMessage={this.showAlertMessage}
                showPopPrize={this.showPopPrize} setRemainTimes={this.setRemainTimes}/>

                <NineList prize_list={this.state.prize_list}/>

                {this.state.showPopInf ? <PopInf hidePopInf={this.hidePopInf}/> : null}

                <PopPrize infinitely={this.props.cost.infinitely} showPopPrize={this.state.showPopPrize} hidePopPrize={this.hidePopPrize}
                          masker={this.state.masker} remainTimes={this.state.remainTimes}/>
                <div className="btn-inf-show" onClick={this.showPopInf}></div>
                {this.state.showAlertMessage ? <AlertMessage hideAlertMessage={this.hideAlertMessage} showAlertMessage={this.showAlertMessage} alertMessage={this.state.alertMessage} /> : null}
            	
            </div>
        )
    }
});

const NineDraw = React.createClass({
    getInitialState: function () {
        this._usable = true;
        this._timer = null;
        return {
            masker: null,
            remainTimes: this.props.cost.remainTimes
        }
    },
    startRoll: function () {
        this._timer = setInterval(()=> {
            this.setState({masker: (this.state.masker + 1) % 8})
        }, 800 / 8);
    },
    stopRoll: function (n,myPrize) {
        clearInterval(this._timer);
        var remain = (7 - this.state.masker) + 8*2 + n - 1;
        var orig_remain = remain;
        var myDate = new Date();
        var year=myDate.getFullYear();
        var month=(myDate.getMonth()+1)>=10?myDate.getMonth()+1:'0'+(myDate.getMonth()+1);
        var Mydate=myDate.getDate();  
        var myTime=year+"."+month+"."+Mydate;
        var myPrizeList={
        	avatar:this.props.user.avatar,
        	name:this.props.user.userName,
        	prizeName:myPrize,
        	time:myTime
        };
        var run = () => {
            setTimeout(()=> {
                if (remain-- >= 0) {
                    this.setState({masker: (this.state.masker + 1) % 8});
                    run()
                }
                if(remain==-1){        			
                	this.props.showPopPrize();                	
			        this.props.addPriceList(myPrizeList);	
			        
			        this._usable=true;
                }
            }, 1000 / 8 + (orig_remain - remain) * 10);
        };
        run();
    },
    hideRoll: function () {
        clearInterval(this._timer);
        this.setState({masker: null});
    },
    clickHandler: function () {
        if (!this._usable) return;
        if (this.state.remainTimes < 1) return;
        this._usable=false;

        $FW.Ajax({
            url: API_PATH + '/mall/api/magic/v1/draw.json',
            method: 'post',
            data: {activityId:'1ead8644a476448e8f71a72da29139ff',source:myBrowerType},
           success: (data) => {        	
        	if(data.code==10000){
	        	this.setState({   
	        		remainTimes:data.data.remainTimes
	        	});
	        	this.props.masker(data.data.prizeMark);
	        	this.props.setRemainTimes(data.data.remainTimes);
	        	this.stopRoll(data.data.prizeMark,data.data.prizeName);
	        	this.props.setUsableScore(data.data.usableScore);
        	}else{
        		this._usable=true;
        		this.props.showAlertMessage(data.message);
        	}
        	        	                
            },
           fail: () => {
                this.hideRoll()
            }
        });
    },
    render: function () {
        let cell = function (n, index) {
            let active = this.state.masker !== null && n == this.state.masker + 1;
            return (
                <div key={index} className={"prize-li prize-li"+n}>
                    <div className={"prize prize" + n}></div>
                    <div className={active ? "prize-masker on":"prize-masker"}></div>
                </div>
            )
        }.bind(this);

		let score = () => {
			if(this.props.infinitely) {
				return <div className="tip-score">不限次抽奖</div>
			} else {
				return <div className="tip-score">
					今日剩<span>{this.state.remainTimes}</span>次
					</div>
			}
		}
		
        return (
            <div className="Nine-draw">
                <div className="tip">
                    <div className="tip-score">单次消耗<span>{this.props.cost.costScore}</span>工分</div>
                    <div className="tip-line"></div>
                    {score()}
                </div>
                <div className="prize-box">
                    { [1, 2, 3, 4, 5, 6, 7, 8].map(cell) }
                </div>
                <div className={this.state.remainTimes > 0 ? "prize-btn":"prize-btn off"}
                     onClick={this.clickHandler}><img src="images/gray-start.png"/></div>
            </div>
        )
    }
});

const NineList = React.createClass({
    getInitialState: function () {
        return {
            position: 0,
            with_animate: true
        }
    },
    componentDidMount: function () {
        this.startScroll()
         console.log(this.props.prize_list);
    },
    startScroll: function () {
        this._timer = setInterval(this.moveUp, 2000);
    },
    moveUp: function () {
    	if(this.props.prize_list.length>2){
	        var next_p = this.state.position + 2;
	        this.setState({
	            position: this.state.position + 2,
	            with_animate: true
	        }, ()=> {
	            if (next_p >= this.props.prize_list.length) {
	                setTimeout(function () {
	                    this.setState({
	                        with_animate: false,
	                        position: 0
	                    })
	                }.bind(this), 1000)
	            }
	        });
        }
    },
    render: function () {
        let prize = (d, index) => {
            if (!d) return null;
            return <div key={index} className="Nine-list-li">
                <div className="avatar"><img src={d.avatar}/></div>
                <div className="name">{d.name}</div>
                <div className="get-prize">抽中了{d.prizeName}</div>
                <div className="time">{d.time.substring(0,10)}</div>
            </div>
        };

        let prize_list = this.props.prize_list;

        return (
            <div className="Nine-list-box">
                <div
                    className={this.state.with_animate ? "Nine-list-ul with-animate" : "Nine-list-ul"}
                    style={{top: -152 * this.state.position / 2+'px'}}>
                    {prize_list.map(prize)}
                    {prize_list.length>2?[prize_list[0], prize_list[1]].map(prize):null}
                </div>
            </div>
        );
    }
});

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
        };
        let popPrizeBtn1=()=>{
        	if(this.props.infinitely){
        		return <div className="pop-prize-btn1" onClick={this.props.hidePopPrize}>
                           继续抽奖
                        </div>
        	}else{
        		return <div className="pop-prize-btn1" onClick={this.props.hidePopPrize}>
                           今日还有<span>{this.props.remainTimes}</span>次机会
                        </div>
        	}
        };

        return (
            <div className={this.props.showPopPrize?"pop-prize-box on":"pop-prize-box"}>
                <div className="pop-prize">
                    <div className="pop-prize-cnt">
                        <div className="pop-prize-text1">手气爆棚</div>
                        <div className="pop-prize-text2">{prize}</div>
                            {popPrizeBtn1()}                       
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
            <div className="pop-inf-box on">
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
const AlertMessage = React.createClass({
    render: function () {
        return (
            <div className="alert-box">
                <div className="alert-cont">
                    <div className="alert-text">{this.props.alertMessage}</div>
                    <div className="alert-btn" onClick={this.props.hideAlertMessage}>确定</div>
                </div>
                <div className="alert-masker"></div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('豆哥玩玩乐');

    if ($FW.Utils.shouldShowHeader()){
    	ReactDOM.render(<Header title={"豆哥玩玩乐"} back_handler={backward}/>, document.getElementById('header'));
    }    
    var in_mobile = navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i)?true:false;
	var app=navigator.userAgent.match(/FinancialWorkshop/i)?true:false;
	var ios=navigator.userAgent.match(/iPhone|iPad/i)?true:false;
	var myBrowerType=1;
	if(in_mobile){
		if(app){
			if(ios){
				myBrowerType=3
			}else{
				myBrowerType=4
			}
		}else{
			myBrowerType=2
		}
	}else{
		myBrowerType=1
	}
  $FW.BatchGet([
      API_PATH + '/mall/api/magic/v1/user.json', //用户信息
      API_PATH + '/mall/api/magic/v1/cost.json?activityId=1ead8644a476448e8f71a72da29139ff', //活动消耗工分
      API_PATH + '/mall/api/magic/v1/winnersList.json?activityId=1ead8644a476448e8f71a72da29139ff&num=20',//获奖名单        
  ], function (data) {
        var user = data[0], cost = data[1],prizeList=data[2];
        console.log(user);console.log(cost);console.log(prizeList.data.list);
        if (typeof(user) == 'undefined' || typeof(cost) == 'undefined' || typeof(prizeList) == 'undefined') $FW.Component.Alert('error: empty data received');
        ReactDOM.render(<NineActivity user={user.data} cost={cost.data} prizeList={prizeList.data}/>,
        document.getElementById('cnt'));
  }, true);
    
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}
window.onNativeMessageReceive = function (msg) {
    if (msg == 'history:back') backward()
};
