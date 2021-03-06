const BindBankCard = React.createClass({
    getInitialState: function () {
        return {
            popShow: false,
            bankName: {
                bankZone: this.props.item.bankInfoDetail.bankzone
            }
        }
    },
    getPopShow: function (boolVal) {
        this.setState({
            popShow: boolVal
        })
    },
    getBankName: function (val) {
        this.setState({
            bankName: {
                bankZone: val.bankName
            }
        });
        $FW.Ajax({
            url: API_PATH + "/mpwap/api/v1/updateBankZone.shtml",
            data: {
                relevBankCard: val.bankNo
            },
            success: function (data) {
                //$FW.Component.Alert('修改成功');
            },
            fail: function (data) {
                $FW.Component.Alert('修改失败，请再试一次');
            }
        });
    },
    render: function () {
        let prohibited = this.props.item.bankInfoDetail.openStatus;

        return (
            <div>
                {prohibited < 3 ? <Invalid  /> : null}
                {prohibited == 3 ? <Valid  /> : null}
                {prohibited == 5 ? <Cover hide={this.hideHandler}/> : null}
                {prohibited == 5 ?
                    <Bomb hide={this.hideHandler} username={this.props.item.bankInfoDetail.realName}/> : null}

                <div className={prohibited < 3 ? "bank bank-top1" : "bank bank-top2"}>
                    <div className="ash clearfix">
                        <div className={prohibited < 3 ? "img gray-img" : "img"}><img
                            src={this.props.item.bankInfoDetail.bankLogo}/></div>
                        <div className="bankname">{this.props.item.bankInfoDetail.bankName}</div>
                    </div>
                    <div className="belon">
                        <div className="name">{this.props.item.bankInfoDetail.realName}</div>
                        <div className="num">{this.props.item.bankInfoDetail.bankCard}</div>
                        {prohibited < 3 ? <div className="card-e"></div> : null}
                    </div>
                    <div className={prohibited < 3 ? "instant-icon gray-img" : "instant-icon"}></div>
                </div>

                {/*<Sup/>*/}
                {
                    this.state.popShow ? <SelectBankList
                        callbackSelectBankHide={this.getPopShow}
                        callbackBankName={this.getBankName}/> : null
                }
                {
                    prohibited == 3 || prohibited == 4 ?
                        <Bran propsBankName={this.state.bankName.bankZone}
                              callbackPopShow={this.getPopShow}
                              propsIsUpdateBank={this.props.item.isUpdateBank}
                              propsBankInfoDetail={this.props.item.bankInfoDetail}
                            /> : null
                }


                {
                    prohibited < 3 ? <Branch propsBankZone={this.props.item.bankInfoDetail.bankzone}
                                             callbackPopShow={this.getPopShow}
                        /> : null
                }
                <Warm />
            </div>
        )
    }
})

const Cover = React.createClass({
    render: function () {
        return (
            <div className="black"></div>
        )
    }
})

//弹层
const Bomb = React.createClass({
    render: function () {
        return (
            <div className="boun">
                <div className="resp">尊敬的{this.props.username}，您好！</div>
                <div className="beca">
                    由于您的身份信息无法通过系统验证，为了保证您的账户资金安全，您当前无法进行线上充值、投资、更换银行卡等交易。您当前的账户资金安全无虞，若有可用余额，可自行发起提现申请。
                </div>
                <div className="ever">有任何问题，请联系客服：<span>400-0322-988</span></div>
                <div className="close"><a onClick={this.props.hide}>关闭</a></div>
            </div>
        )
    }
})

const Invalid = React.createClass({
    render: function () {
        return (
            <a className="upgrade" href="/static/wap/open-account/index.html">
                <div className="dep clearfix">
                    <div className="pdlf">银行卡已失效，升级银行存管账户重新激活</div>
                    <div className="pdrt"><a href=""><img src="images/card-a.png"/></a></div>
                </div>
            </a>
        )
    }
});

const Valid = React.createClass({
    render: function () {
        return (
            <a className="upgrade" href="/static/wap/reset-deal-password/index.html">
                <div className="dep clearfix">
                    <div className="pdlf">点击设置交易密码</div>
                    <div className="pdrt"><a href=""><img src="images/card-a.png"/></a></div>
                </div>
            </a>
        )
    }
});

const Sup = React.createClass({
    render: function () {
        return (
            <div className="port">如果您绑定的银行卡暂不支持手机一键支付请联系客服<span className="blue">400-0322-988</span></div>
        )
    }
});

const Bran = React.createClass({
    handleJump: function () {
        this.props.callbackPopShow(true);
    },
    render: function () {
        return (
            <div>
                {
                    !this.props.propsBankInfoDetail.isCompanyAgent ? <div className="modify">
                        {
                            this.props.propsIsUpdateBank == 1 ?
                                <a className="pure-a" href="/static/wap/change-bank-card/index.html">
                                    <div className="xuanwu-a">修改绑定银行卡</div>
                                    <div className="choice-a">
                                        <div className="pleas-a">申请修改</div>
                                    </div>
                                </a> : null
                        }
                        <div className="wire-a"></div>
                        <div className="pure-a" onClick={this.handleJump}>
                            <div
                                className="xuanwu-a">{this.props.propsBankName == "" ? "开户支行" : this.props.propsBankName}</div>
                            <div className="choice-a">
                                <div className="pleas-a">请选择</div>
                            </div>
                        </div>
                    </div> : null
                }
            </div>


        )
    }
});

const Branch = React.createClass({
    handleJump: function () {
        this.props.callbackPopShow(true);
    },
    render: function () {
        return (
            <div className="pure" onClick={this.handleJump}>
                <div className="xuanwu">{this.props.propsBankZone === "" ? "开户开行" : this.props.propsBankZone}</div>
                <div className="choice">
                    <div className="pleas">请选择</div>
                </div>
            </div>
        )
    }
});

const Warm = React.createClass({
    render: function () {
        return (
            <div className="rmd">
                <div className="remin">温馨提醒</div>
                <div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">目前官网上可绑定的部分银行暂不支持手机快捷支付。</span>
                </div>
                <div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">银行卡账户信息一旦提交绑定，不可自行修改。</span>
                </div>
                <div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">开户行名称填写错误将无法提现,请拨打银行客服电话查询后进行修改。</span>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"绑定银行卡"}/>, HEADER_NODE);

    $FW.Ajax({
        url: API_PATH + "/mpwap/api/v1/showBankCardMess.shtml",
        enable_loading: true,
        success: function (data) {
            ReactDOM.render(<BindBankCard item={data}/>, CONTENT_NODE);
        }
    });

});
