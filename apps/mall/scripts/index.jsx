'use strict';

var STATIC_PATH = document.getElementById('static-path').value;

(function () {

    var Content = React.createClass({
        getInitialState: () => {
            return {
                frame: parseInt(document.getElementById('frame').value),
                name: 'name',
                score: 2,
                showShare: false
            }
        },
        setNameScore: function (name, score) {
            this.setState({name: name, score: score})
        },
        nextFrame: function () {
            this.setState({frame: this.state.frame + 1})
        },
        firstFrame: function () {
            this.setState({frame: 1})
        },
        showShare: function () {
            this.setState({showShare: true})
        },
        render: function () {
            return (
                <div>
                    {this.state.frame == 1 ? <Content.Frame1 set_name_score={this.setNameScore}/> : null}
                    {this.state.frame == 2 ? <Content.Frame2 /> : null}
                    {this.state.frame == 3 ? <Content.Frame3 name={this.state.name} score={this.state.score}/> : null}
                    {this.state.frame == 4 ? <Content.Frame4 /> : null}
                    {[3, 4].indexOf(this.state.frame) > -1 ? <Content.Gift /> : null}
                    {[].indexOf(this.state.frame) > -1 ? <Content.Logo /> : null}
                    {this.state.showShare ? <Content.Share /> : null}
                </div>
            )
        }
    });

    Content.Frame1 = React.createClass({
        getInitialState: function () {
            return {name: ''}
        },
        clickHandler: function () {
            if (!this.state.name)
                return;
            var _this = this;
            window.Cnt.nextFrame();
            var short_name = _this.state.name.substr(0, 5);
            $.post(document.getElementById('api-path').value + 'weixin/fool/getname',
                {name: short_name},
                function (data) {
                    var t = parseInt(data.data.res);
                    _this.props.set_name_score(short_name, t);
                    window.Cnt.nextFrame();
                }, 'json')
        },
        changeHandler: function (e) {
            var v = e.target.value;
            var _this = this;
            this.setState({name: v});

            if (v.length > 5) {
                setTimeout(function () {
                    _this.setState({name: _this.state.name.substr(0, 5)});
                }, 1500)
            }
        },
        render: function () {
            return (
                <div className="frame1" style={{ backgroundImage: 'url(' + STATIC_PATH + "images/bg.jpg)" }}>
                    <img className="title-img" src={STATIC_PATH + "images/1-1.png"}/>
                    <img className="turn-round2" src={STATIC_PATH + "images/turn-round2.gif"}/>
                    <div className="form-panel" style={{ backgroundImage: 'url(' + STATIC_PATH + "images/1-2.png)" }}>
                        <input className="input" value={this.state.name} onChange={this.changeHandler}
                               onInput={this.inputHandler}
                               placeholder="请输入您的名字"/>

                        <a className="btn"
                           style={{ backgroundImage: 'url(' + STATIC_PATH + "images/" + (this.state.name.length > 0 ? '1-4' : '1-3') + ".png)" }}
                           onClick={this.clickHandler}> &nbsp; </a>
                    </div>
                </div>
            )
        }
    });

    Content.Frame2 = React.createClass({
        componentDidMount: () => {
            setTimeout(() => {
                //window.Cnt.nextFrame();
            }, 1000);
        },
        render: function () {
            return <div className="frame2">
                <img src={STATIC_PATH + "images/loading.gif"}/>
            </div>
        }
    });

    Content.Frame3 = React.createClass({
        getInitialState: function () {
            return {showCover: false}
        },
        retryHandler: ()=> {
            window.Cnt.firstFrame()
        },
        shareHandler: function () {
            this.setState({showCover: true})
        },
        hideShareHandler: function () {
            this.setState({showCover: false});
            //window.Cnt.nextFrame();
        },
        render: function () {
            let score = this.props.score;
            let summary = score < 50 ? '看谁还敢来骗你' : '听说容易被骗的人运气比较好喔';
            let text;

            if (score <= -200) {
                text = '说吧，你想去骗谁'
            } else if (score <= -100) {
                text = '别人不被你骗就不错了'
            } else if (score <= 1) {
                text = '相当警惕，极难受骗'
            } else if (score <= 10) {
                text = '只被假乞丐骗过2次钱'
            } else if (score <= 25) {
                text = '很聪明，很少受骗'
            } else if (score <= 57) {
                text = '太单纯了，经常受骗'
            } else if (score <= 79) {
                text = '跟三岁小孩一样好骗'
            } else if (score <= 99) {
                text = '被骗没商量'
            } else {
                text = '被卖了还帮忙数钱'
            }

            try {
                window.setShareMessage(this.props.name, summary, score);
            }
            catch (e) {
            }

            return (
                <div className="frame3" style={{ backgroundImage: 'url(' + STATIC_PATH + "images/bg.jpg)" }}>

                    { score > 50 ? <img className="dou-ge-gif" src={STATIC_PATH + "images/hight-score.gif"}/> : null }
                    { score <= 50 ? <img className="dou-ge-gif" src={STATIC_PATH + "images/low-score.gif"}/> : null }

                    <img className="left-hand" src={STATIC_PATH + 'images/left-hand.png'}/>
                    <img className="right-hand" src={STATIC_PATH + 'images/right-hand.png'}/>
                    <div className="board" style={{ backgroundImage: 'url(' + STATIC_PATH + "images/3-1.png)" }}>
                        <div className="test-text"> 经过测试,<span className="username">
                            {this.props.name}</span>的受骗指数是
                        </div>
                        <div className="score">{score}%</div>
                        <div className="advise">{text}</div>
                    </div>
                    <div className="summary">{summary}</div>
                    <a className="btn-retry" onClick={this.retryHandler}
                       style={{ backgroundImage: 'url(' + STATIC_PATH + "images/4-7.png)" }}>
                    </a>
                    <a className="btn-share" onClick={this.shareHandler}
                       style={{ backgroundImage: 'url(' + STATIC_PATH + "images/4-8.png)" }}>
                    </a>
                    <img className="logo" src={STATIC_PATH + "images/logo.png"}/>
                    <div className="height-holder"></div>
                    <div className={this.state.showCover ? "share-cover" : "hide"}>
                        <div className="bg" onClick={this.hideShareHandler}></div>
                        <div className="img">
                            <img src={STATIC_PATH + "images/share2.gif"}/>
                        </div>
                    </div>
                </div>
            )
        }
    });

    Content.Frame4 = React.createClass({
        getInitialState: function () {
            return {
                phone: '',
                applyVoucherFlag: false,
                applyState: 'no_apply'
            }
        },
        clickHandler: function () {
            if (this.state.phone == '') return;

            var _this = this;

            $.post(document.getElementById('api-path').value + 'weixin/fool/phone', {
                phone: this.state.phone
            }, function (data) {
                let state;
                if (data.res == 'success') {
                    state = 'success'
                } else if (data.res == 'timeout') {
                    state = 'timeout'
                } else if (data.res == 'yi_ling_qu') {
                    state = 'applied'
                } else {
                    state = 'not_apply'
                }
                _this.setState({
                    applyVoucherFlag: true,
                    applyState: state
                })
            }, 'json');
        },
        changeHandler: function (e) {
            let v = e.target.value;
            let phone = '';
            for (let i = 0; i < v.length; i++) {
                if (!isNaN(v[i])) {
                    phone += v[i]
                }
            }
            if (phone.length < 12)
                this.setState({phone: phone})
        },
        endHandler: function () {
            this.setState({applyVoucherFlag: false, phone: ''})
        },
        render: function () {
            return (
                <div className={this.state.applyVoucherFlag ? "frame4 hide-overflow" : "frame4"}
                     style={{ backgroundImage: 'url(' + STATIC_PATH + "images/bg.jpg)" }}>
                    <img className="title-img" src={STATIC_PATH + "images/4-1.png"}/>
                    <img className="zan" src={STATIC_PATH + "images/zan.png"}/>

                    <img className="left-hand" src={STATIC_PATH + 'images/left-hand.png'}/>
                    <div className="board" style={{ backgroundImage: 'url(' + STATIC_PATH + "images/4-2.png)" }}>>
                        <input className="input" value={this.state.phone} onChange={this.changeHandler}
                               placeholder="请输入手机号"/>

                        <a className="btn"
                           style={{ backgroundImage: 'url(' + STATIC_PATH + "images/" + (this.state.phone.length > 10 ? '4-3' : '4-4') + ".png)" }}
                           onClick={this.clickHandler}> &nbsp; </a>
                    </div>
                    <div className="instructions">
                        <div className="i-title">
                            <div className="i-line"></div>
                            <div className="i-text"> 返现券使用规则</div>
                        </div>
                        <div className="">1.返现券新老用户均可领取，每个账户限领取一次；老用户填写金融工场账户绑定的手机号；新用户填写常用手机号，并用此号码注册金融工场；</div>
                        <div className="">2.领取的返现券，将在您输入手机号的账户下，使用该手机号登陆金融工场，即可使用；</div>
                        <div className="">3.可在“个人中心”-“返现券”查看返现券使用规则详情；</div>
                        <div className="">4.本活动最终解释权归金融工场所有；</div>
                    </div>
                    <img className="logo" src={STATIC_PATH + "images/logo.png"}/>
                    <div className="height-holder"></div>

                    <div className={this.state.applyVoucherFlag ? "voucher" : "hide"}>
                        <div className="bg" onClick={this.endHandler}></div>

                        <div className={this.state.applyState == 'success' ? "apply" : "hide"} onClick={this.endHandler}
                             style={{ backgroundImage: 'url(' + STATIC_PATH + "images/4-6.png)" }}
                        >
                            <a className="btn-register"
                               style={{ backgroundImage: 'url(' + STATIC_PATH + "images/4-9.png)" }}
                               href="http://m.9888.cn/mpwap/orderuser/toRegister.shtml"></a>
                        </div>

                        <div className={this.state.applyState == 'timeout' ? "timeout" : "hide"}
                             onClick={this.endHandler}
                             style={{ backgroundImage: 'url(' + STATIC_PATH + "images/4-5.png)" }}
                        >
                        </div>

                        <div className={this.state.applyState == 'applied' ? "applied" : "hide"}
                             onClick={this.endHandler}
                             style={{ backgroundImage: 'url(' + STATIC_PATH + "images/4-10.png)" }}
                        >
                        </div>
                    </div>
                </div>
            )
        }
    });

    Content.Error = React.createClass({
        render: function () {
            return <div className="frame-error">
                <img src={STATIC_PATH + "images/404.jpg"}/>
            </div>
        }
    });

    Content.Gift = React.createClass({
        render: function () {
            return (
                <div className="frame-gift">
                    <a href="http://m.9888.cn/mpwap/orderuser/toRegister.shtml">
                        <img src={STATIC_PATH + "images/gift.gif"}/> </a>
                </div>
            )
        }
    });
    Content.Logo = React.createClass({
        render: function () {
            return (
                <img className="frame-logo" src={STATIC_PATH + "images/logo.png"}/>
            )
        }
    });
    Content.Share = React.createClass({
        render: function () {
            return (
                <div className="frame-share">
                    <div className="bg"></div>
                    <img src={STATIC_PATH + "images/share2.gif"}/>
                </div>
            )
        }
    });

    window.Cnt = ReactDOM.render(<Content />, document.getElementById('cnt'));

})();