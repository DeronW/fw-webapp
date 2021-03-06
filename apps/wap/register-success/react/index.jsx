var Pop = React.createClass({
    render: function () {
        return (
            <div className="pop-body" style={{ zIndex: 1000000 }}>
                <div className="pop-back"></div>
                <div className="pop-cnt">
                    <div className="pop-info">
                        <p>未开通微商存管不能投标、提现、充值。</p>
                    </div>
                    <div className="pop-btn">
                        <div className="cancel-btn btn l-btn" onClick={this.props.callbackCancelBtn}>取消</div>
                        <div className="confirm-btn btn r-btn" onClick={this.props.callbackConfirmBtn}>确定</div>
                    </div>
                </div>
            </div>
        );
    }
});

var TopNav = React.createClass({
    skipHandler: function () {
        //location.href = '/'
    },
    handlerBtn: function () {
        this.props.callbackPopShow(true);
    },
    render: function () {
        return (
            <div className="top-nav">
                <div className="info">
                    <div className="title">{this.props.title}</div>
                    <span className="r-text" onClick={this.handlerBtn}>
                        {this.props.btnText}</span>
                </div>
            </div>
        );
    }
});

var Btn = React.createClass({
    render: function () {
        return (
            <div className="btn-area">
                <div className="ui-btn ui-red-btn" onClick={this.props.Fun}>
                    {this.props.btnText}
                </div>
            </div>
        );
    }
});

var PromptBlock = React.createClass({
    render: function () {
		let cntTest = (type) => {
			if(type === 'A') {
				return '元返现券礼包已经转入您的账户中'
			} else if (type === 'B') {
				return 	'返息券已经转入您的账户中'
			} else if (type === 'C') {
				return '公分已经转入您的账户中'
			} else if (type === '1') {
				return '工豆已经转入您的账户中'
			}
		}

        return (

			<div className="ui-prompt">
                <div className="img">
                    <img src={this.props.imgUrl}/>
                </div>
                <div className="title">

                    {this.props.title}
                </div>

                {
                    this.props.resDetails != '' ? this.props.resDetails.registResult.map((data, index) => {
					   	
						return <div className="ui-prompt-text">
                            <span className="number-text">{data.resvalue}</span>

							{cntTest(data.restype)}
                        </div>

                    }) : null
                }
            </div>
        );
    }
});

//开户成功
var AccountSucceedBody = React.createClass({
    getInitialState: function () {
        return {
            popShow: false,
            registResultData: ""
        }
    },
    componentWillMount: function () {
        var _this = this;


        $FW.Ajax({
            url: API_PATH + "/mpwap/new/userLogin/registResult.shtml",
            success: function (data) {
                _this.setState({
                    registResultData: data
                });
            },
            fail: function () {

            }
        });
    },
    clickHandler: function () {
        location.href = 'https://m.9888.cn/static/wap/app-download/index.html'
        //location.href = '/static/wap/open-account/index.html'
    },
    handlerPopShow: function (booleanVal) {
        this.setState({
            popShow: booleanVal
        });
    },
    getCancelBtn: function () {
        this.setState({
            popShow: false
        });
    },
    getConfirmBtn: function () {
        window.location.href = location.protocol + "//m.9888.cn/mpwap/orderuser/getUserInfo.shtml";
    },
    render: function () {
        return (
            <div className="">
                <TopNav title={"注册成功"} callbackPopShow={this.handlerPopShow}/>

               	{/*<div className="nav-block">
                    <img src="images/process.png"/>
                </div>*/
				}
                <PromptBlock imgUrl={"images/succeed-1.png"} title={"注册成功"}
                             text={"元返现券已经转入您的账户中"}
                             resDetails={this.state.registResultData}
                    />
                <Btn btnText={"下载APP"} Fun={this.clickHandler}/>

				<div className="link-home">
					<a href="https://m.9888.cn">去首页转转</a>
				</div>

                {
                    this.state.popShow ? <Pop callbackCancelBtn={this.getCancelBtn}
                                              callbackConfirmBtn={this.getConfirmBtn}
                        /> : null
                }

            </div>
        );
    }
});
$FW.DOMReady(() => {
    ReactDOM.render(<AccountSucceedBody />, CONTENT_NODE);
});

