'use strict';

const API_PATH = document.getElementById('api-path').value;
const ActivityId='huodongid';
const GameGuess = React.createClass({
    getDefaultProps: function () {
        return {}
    },
    getInitialState: function () {
        return {
            show_inf: false,
            show_pop: false,
            init_roll: false,
            level: 0,
            checked:-1,
            cost_score:10,
            up_mark:0,
            down_mark:1,
            can_click:true,
            total_score:12000,
            result:false,
            getPrize:''
        }
    },
    componentDidMount: function () {
        this.initUpRoll();
        this.initDownRoll();
        // $FW.Ajax({
        //     url: `${API_PATH}/mall/api/v1/activity/guessCost.json`,//一上来获取
            // method:post,
            // data:{activityId:ActivityId,level:this.state.level},
            //      success: (data) =>{
            //     	data.list=data.list||[];
                    let mydata={
                        costScore:100,
                        totalScore:3324320
                    };
                 	this.setState({
                     cost_score: mydata.costScore,
                     total_score: mydata.totalScore,
                  });
            //     }
        // });
    },
    changeInfHandler:function(){
        console.log(1);
        this.setState({show_inf:!this.state.show_inf});
    },
    checkHandler:function(value){
        if(this.state.can_click){
            // $FW.Ajax({
            //     url: `${API_PATH}/mall/api/v1/activity/guessDraw.json,//获奖结果
            //     data:{activityId:ActivityId,level:this.state.level},
            //     success: (data) =>{
                    var data={
                        getPrize:"20工分",
                        remainScore:930400,
                        result:Math.floor(Math.random()*2)
                    };
                    this.setState({
                        checked:value,
                        can_click:false,
                        getPrize:data.getPrize
                    });
                    let upValue=0;
                    console.log(data.result);
                    if(data.result){
                        switch (value){
                            case 0:
                                upValue=2;
                                break;
                            case 1:
                                upValue=0;
                                break;
                            case 2:
                                upValue=1;
                                break;
                        }
                    }else{
                        switch (value){
                            case 0:
                                upValue=1;
                                break;
                            case 1:
                                upValue=2;
                                break;
                            case 2:
                                upValue=0;
                                break;
                        }
                    }
                    this.setState({
                        total_score:this.state.total_score-this.state.cost_score,
                        result:data.result
                    });
                    this.stopUpRoll(upValue,data.remainScore);
                    this.stopDownRoll(value);
            //     }
            // });
        }
    },
    initDownRoll:function(value){
        this.myDowntime=setInterval(()=>{
            this.setState({down_mark:(this.state.down_mark+1)%3})
        },200)
    },
    initUpRoll:function(value){
        this.myUptime=setInterval(()=>{
            this.setState({up_mark:(this.state.up_mark+1)%3})
        },100)
    },
    stopUpRoll:function(value,newScore){
        clearInterval(this.myUptime);
        this.initUpRoll();
        setTimeout(()=>{
            clearInterval(this.myUptime);
            this.setState({
                up_mark:value,
                can_click:true,
                total_score:newScore,
                show_pop:true
            });

        },1200)
    },
    stopDownRoll:function(value){
        clearInterval(this.myDowntime);
        this.setState({
            down_mark:value
        });
    },
    nextHandler:function(){
        console.log(11111);
        this.setState({
            show_pop:false,
            level:this.state.level+1
        });
        // $FW.Ajax({
        //     url: `${API_PATH}/mall/api/v1/activity/guessCost.json`,//一上来获取
        // method:post,
        // data:{activityId:ActivityId,level:this.state.level},
        //      success: (data) =>{
        //     	data.list=data.list||[];
        let mydata={
            costScore:100,
            totalScore:3324320
        };
        this.setState({
            cost_score: mydata.costScore,
            total_score: mydata.totalScore,
        });
        //     }
        // });
    },
    hideResultHandLer:function(){
    this.setState({
        show_pop:false
    });
    },
    render: function () {
        let cost_tip=(level,cost)=>{
            return (
                <div className="cost">第<span className="pass-num">{level+1}</span>关仅<span className="cost-score">{cost}</span>工分，选手势赢翻倍积分! </div>
            )
        };
        let check_img=[0,1,2].map((value,index)=>{
            let check_state=(value==this.state.checked)?"smallimg-on":"smallimg";
            return (
                <div key={index} className={"check check"+value} onClick={()=>{this.checkHandler(value)}}><img src={"images/"+check_state+value+".png"}/></div>
            )
        });
        return (
            <div className={"game-guess bg"+this.state.level}>
               <div className="game-guess-head">
                   <a href="#" className="game-guess-back">&nbsp;</a>
                   <div className="total-score">{this.state.total_score}</div>
               </div>
                <a href="http://10.105.6.217:8047/mallmain/build/mall/user-prize-record/index.html?_ijt=c3cdc0c3eo3ocr56ghpeh235ce" className="record">&nbsp;</a>
                <a href="#" className="inf" onClick={this.changeInfHandler}>&nbsp;</a>
                    {cost_tip(this.state.level,this.state.cost_score)}
                <div className="guess-cont">
                    <div className="guess-up"><img src={"images/bigimg"+this.state.up_mark+".png"}/></div>
                    <div className="guess-down"><img src={"images/bigimg"+this.state.down_mark+".png"}/></div>
                </div>
                <div className="guess-check">
                    {check_img}
                </div>
                {this.state.show_inf?<GameGuess_inf changeInfHandler={this.changeInfHandler} />:null}
                {this.state.show_pop?<GameGuess_popResult data={
                    {
                        result:this.state.result,
                        level:this.state.level,
                        getPrize:this.state.getPrize,
                        hideResultHandLer:this.hideResultHandLer,
                        nextHandler:this.nextHandler
                    }
                } />:null}
            </div>
        )
    }
});
$FW.DOMReady(function () {
    // var title='和豆哥猜拳'
    // NativeBridge.setTitle(title);
    // if ($FW.Utils.shouldShowHeader()) {
    //     ReactDOM.render(<Header title={title} back_handler={backward}/>, document.getElementById('header'));
    // }
    //
    // $FW.Ajax({
    //     url: API_PATH + 'mall/api/magic/v1/user.json', //用户信息
    //     success: (data) => {
    let data={"isLogin":true,"sex":"1","userCode":"A362006","userLevel":2,"userName":"13**62","realName":"李建光","avatar":"http://mall.9888.cn/img//boy.jpg"};
    ReactDOM.render(<GameGuess user={data}/>, document.getElementById('cnt'));
    //     }
    // })
});
function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}
function getBrowserType() {
    var t = 2; // 在移动浏览器内
    if ($FW.Browser.inApp()) {
        t = $FW.Browser.inIOS() ? 3 : 4
    }
    return t;
}