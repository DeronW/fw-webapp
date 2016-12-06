const HeaderTop = React.createClass({
    getInitialState: function () {
        return {
            backBtn:true
        }
    },
    render:function(){
      return  (
          <div className='headerCon' >
              {
                  this.state.backBtn ? <div className="imgBtn" onClick ={this.props.backBtn}><img src="./images/back.png" alt="" /></div> : null
              }
              <div className='headerConText'>
                  {this.props.title}
              </div>
          </div>
      )
    }
});

var SmallTitle = React.createClass({
    render:function(){
        return (
            <div className="smallTitle">
                 <p>{this.props.smallTitle}</p>
                {
                    this.props.more ? <span>
                                        {this.props.moreText}
                                        <img src="./images/arrow.png" alt=""/>
                                      </span> : null
                }
            </div>

        )
    }
});

const ContentMoney = React.createClass({
   render: function () {
       return(
           <div className='money' onClick={this.props.handlerTab}>
               <div className='moneyLeft'>{this.props.moneyText}</div>
               {
                   this.props.isImg ? <img src="./images/arrow.png" alt="" style={this.props.rotateStyle}/> : null
               }
               <div className='moneyRight'>
                   {
                       this.props.money.indexOf("/")>0 ? <img src={this.props.money} alt=""/> :
                           <span>{this.props.money}</span>
                   }
               </div>
           </div>
       )
   }
});

const ProductList = React.createClass({
   clickFun: function (index) {
        console.log(index);
   },
   render: function () {
       var _this = this;
       var list = function (item,index) {
           return <li key={index}>
                   <a><img src={item.img} alt=""/></a>
                   <div className='popScore'><span>{item.score}</span>{_this.props.scoreText? "工分" : null}</div>
               </li>
       };
       return(
           <ul>
               {
                   this.props.products.map(list,this)
               }
           </ul>
       )
   }
});

const TenderProduct = React.createClass({
    render: function () {
        return(
            <ProductList products={this.props.products} scoreText={this.props.scoreText}/>
        )
    }
});

const Tender = React.createClass({
    getInitialState: function() {
        return {
            tabShow: false,
            deg: 0
        }
    },
    handlerTab: function() {
        this.setState({
            tabShow: !this.state.tabShow,
            deg: !this.state.tabShow ? "180" : "0"
        });
    },
    backFun: function () {
        window.history.back();
    },
    render:function(){
        var tabBlock = function() {
            return <div className="hideInterest">
                        <div className="money hideMsg">
                            <div className='moneyLeft'> 预期收益 </div>
                            <div className='moneyRight'>￥<span>200.00</span></div>
                        </div>
                        <div className="money hideMsg">
                            <div className='moneyLeft'> 使用返现券收益 </div>
                            <div className='moneyRight'>￥<span>100.00</span></div>
                        </div>
                        <div className="money hideMsg">
                            <div className='moneyLeft'> 使用返息券收益 </div>
                            <div className='moneyRight'>￥<span>5.00</span> (工豆)</div>
                        </div>
                        <div className="money hideMsg">
                            <div className='moneyLeft'> 会员等级年化加息奖励 </div>
                            <div className='moneyRight'>￥<span>10.00</span> (工豆)</div>
                        </div>
                    </div>
        };

        var rotateStyle = {
            transform: "rotate("+ this.state.deg + "deg)"
        };

        var ticketData = [
            {
                img:"./images/move1.png",
                score:"￥50返现券"
            },
            {
                img:"./images/move2.png",
                score:"5%返息券"
            },
            {
                img:"./images/move3.png",
                score:"2个兑换券"
            },
            {
                img:"./images/move4.png",
                score:"+20000工分"
            }
        ];

        var productData = [
            {
                img:"./images/pop1.png",
                score:"399",
            },
            {
                img:"./images/pop2.png",
                score:"3999",
            },
            {
                img:"./images/pop3.png",
                score:"399",
            },
            {
                img:"./images/pop4.png",
                score:"3999",
            }
        ];

        return (
            <div className='container'>
                <HeaderTop title={"投标成功"}
                           backBtn={this.backFun}/>
                <div className='banner'>
                    <img src="./images/banner.png" alt=""/>
                </div>

                <SmallTitle smallTitle={"投资获利"}/>

                <div className='interest'>
                    <ContentMoney moneyText={"投资金额"}
                                  money={"￥10.00"} />
                    <ContentMoney moneyText={"总收益"}
                                  money={"￥20.00"}
                                  isImg={true}
                                  handlerTab={this.handlerTab}
                                  rotateStyle={rotateStyle} />
                    {
                        this.state.tabShow ? tabBlock() : null
                    }
                </div>
                <SmallTitle smallTitle={"投资奖励"} />

                <div className='imgMove'>
                    <TenderProduct products={ticketData} />
                </div>

                <SmallTitle smallTitle={"圈子奖励"}
                            more={true}
                            moreText={"小队数据页面"}/>
                <div className='interest circleReward'>
                    <ContentMoney moneyText={"获得个人任务贡献分"}
                                  money={"+3000"}/>
                    <ContentMoney moneyText={"获得小队奖励工分"}
                                  money={"+3000"}/>
                </div>

                <SmallTitle smallTitle={"会员等级"}/>
                <div className='interest level'>
                    <ContentMoney moneyText={"获得贡献值"}
                                  money={"+3000"} />
                    <ContentMoney moneyText={"当前会员等级"}
                                  money={"./images/vip.png"} />
                    <ContentMoney moneyText={"年化加息奖励"}
                                  money={"3.5%"} />
                </div>

                <SmallTitle smallTitle={"人气兑换"}
                            more={true}
                            moreText={"赚了工分？去商城转转"}/>

                <div className='imgMove popular'>
                    <TenderProduct products={productData} scoreText={true}/>
                </div>
                <div className="tranColor">
                </div>
                <div className="seeReward">
                    <div className="seeRewardText">查看投资奖励</div>
                </div>
            </div>
        )
    }
});

ReactDOM.render(
    <Tender />,
    document.getElementById("cnt")
);