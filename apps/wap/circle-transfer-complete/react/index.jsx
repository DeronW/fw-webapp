const HeaderTop = React.createClass({
    getInitialState: function () {
        return{
            backBtn:true
        }
    },
   render: function () {
       return(
           <div className='headerCon'>
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

const SmallTitle = React.createClass({
   render: function () {
       return(
           <div className='smallTitle'>
               <p>{this.props.smallTitle}</p>
               {
                   this.props.more ? <span>
                        {this.props.titleText}
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
                   this.props.isImg ? <img src="./images/arrow.png" alt="" style={this.props.rotateStyle}/>:null
               }
               <div className='moneyRight'>
                   {
                       this.props.money.indexOf("/") > 0 ? <img src={this.props.money}/> : <span>{this.props.money}</span>
                   }

               </div>
           </div>
       )
   }
});

const ProductList = React.createClass({
   render: function () {
       var _this = this;
       var product = function (item,index) {
            return <li key={index}>
                <img src={item.img} alt=""/>
                <div className='popScore'><span>{item.score}</span>{_this.props.scoreText ? "工分":null}</div>
            </li>
       };
       return(
           <ul>
               {
                   this.props.products.map(product)
               }
           </ul>
       )
   }
});

const Transfer = React.createClass({
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
                    </div>
        };

        var rotateStyle = {
            transform: "rotate("+ this.state.deg + "deg)"
        };

        var productsData=[
            {
                img:'./images/pop1.png',
                score:'399'
            },
            {
                img:'./images/pop2.png',
                score:'3991'
            },
            {
                img:'./images/pop3.png',
                score:'3992'
            },
            {
                img:'./images/pop4.png',
                score:'3992'
            }
        ];
        return (
            <div className='container'>
                <HeaderTop title={"投资成功"}
                           backBtn={this.backFun}/>

                <div className='banner'>
                    <img src="./images/banner.png" alt=""/>
                </div>
                <SmallTitle smallTitle={"投资获利"}/>
                <div className='interest'>
                    <ContentMoney moneyText={"投资金额"}
                                  money={"￥10.00"}/>
                    <ContentMoney handlerTab={this.handlerTab}
                                  isImg={true}
                                  rotateStyle={rotateStyle}
                                  moneyText={"总收益"}
                                  money={"￥10.00"}/>
                    {
                        this.state.tabShow ? tabBlock() : null
                    }
                </div>
                <SmallTitle smallTitle={"会员等级"}/>
                <div className='interest level'>
                    <ContentMoney moneyText={"获得贡献值"}
                                  money={"+3000"}/>
                    <ContentMoney moneyText={"当前会员等级"}
                                  money={"./images/vip.png"}/>
                </div>
                <SmallTitle smallTitle={"人气兑换"}
                            more={true}
                            titleText={"赚了工分？去商城转转"}/>
                <div className='imgMove'>
                      <ProductList products={productsData} scoreText={true} />
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
    <Transfer />,
    document.getElementById("cnt")
);