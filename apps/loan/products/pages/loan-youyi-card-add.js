import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Utils, Components } from 'fw-javascripts'
import { Header } from '../../lib/components'
import { Post, NativeBridge, Browser } from '../../lib/helpers'
import styles from '../css/loan-youyi-card-add.css'

function isMobilePhone(phone) {
  return /^1(3|4|5|7|8)\d{9}$/.test(phone)
}

// 验证身份证
function isCardNo(card) {
  var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return pattern.test(card);
}

var numberFormat = {
  val: "",
  format: function (val) {
      if (!isNaN(val.replace(/[0-9]/g, ""))) {
          this.val = val.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");//四位数字一组，以空格分割
      }
      return this.val;
  }
};

function verificationNum(val) {
  var reg = new RegExp("^[0-9]*$");
  return reg.test(val)
}

function space(str) {
  return str.replace(/ /g, "");
}

function trim(s) {
  return s.replace(/(^\s*)|(\s*$)/g, '')
}
@inject('loopLoan')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class LoopLoanCardAdd extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          name: '',
          id: '',
          bankNum: '',
          bankName: '',
          phone: '',
          cardinfoBankName: '',
          cardinfoLogoUrl: '',
          cardType: '',
          loading: false,
          canVerify: '',
          codePop:false,
          value: "",
          smsValue: "",
          remain: 0
        }
        
    }

    componentDidMount() {
        document.title = '设置提现卡';
      
    }

    changeName = (e) => {
      let v = e.target.value;
      let meizu = window.navigator.userAgent.indexOf('MX4 Pro') > -1;
      if(!meizu){
          v = v.replace(/[0-9a-z]/gi, '');
      }
      v.length < 21 && this.setState({ name: trim(v) });
    }

    changeIdHandler = (e) => {
        let v = e.target.value;
        v = v.replace(/[a-w|y|z]/gi, '');
        v.length <= 18 && this.setState({ id: v });
    }

    changeBankNum = (e) => {
        let v = e.target.value;
        //v.length < 19 + 5 && this.setState({ bankNum: numberFormat.format(v) });
        v.length < 19 + 5 && this.setState({ bankNum: v });
    }

    blurBankNum = (e) => {

        let {bankNum} = this.state, len = space(this.state.bankNum).length;
        if (len < 16 || len > 19) return Components.showToast("储蓄卡格式不对");

        Post(`/api/bankcard/v1/cardinfo.json`, {
            bankCardNo: space(this.state.bankNum)
        }).then(data => {
            let ci = data.cardInfo;
            if (ci.cardType == -1) Components.showToast('不支持该银行卡号');

            this.setState({
                cardinfoBankName: ci.bankName,
                cardinfoLogoUrl: ci.logoUrl,
                cardType: ci.cardType,
                canVerify: ci.canVerify,
                bankName: ci.bankName
            });
        }, e => Components.showToast(e.message))
    }

    changePhone = (e) => {
        let val = e.target.value;
        verificationNum(val) &&
        val.length <= 11 &&
        this.setState({ phone: space(val) });
    }

    handlerNext = () => {
        let err, {name, id, bankName, bankNum, phone, cardType, canVerify} = this.state;
        if (canVerify == 0) err = "不支持绑定此类卡";
        if (cardType == 1) err = "请绑定借记卡";
        if (!isMobilePhone(phone)) err = "手机号格式不对";
        if (phone == '') err = "手机号不能为空";
        if (space(bankNum).length > 19 || space(bankNum).length < 16) err = "储蓄卡格式不对";
        if (bankNum == '') err = "储蓄卡不能为空";
        if (!isCardNo(id)) err = "身份证格式不对";
        if (id == '') err = "身份证不能为空";
        if (name.length > 20) err = "姓名不能超过20个字符";
        if (name == '') err = "姓名不能为空";

        err ?
            Components.showToast(err) :
            Post(`/api/bankcard/v1/commitinfo.json`, {
                bankName: bankName,
                cardHolderName: name,
                cardNo: space(bankNum),
                cardType: cardType,
                idCard: id,
                mobile: phone,
                operatorType: USER.status < 2 ? 1 : 2
            }).then((data) => {
                this.setState({codePop:true})
            }, (e) => {
                Components.showToast(e.message);
            });
    }


    smsValueHandler = (e) => {
        if (e.target.value.length <= 8) {
            this.setState({ smsValue: e.target.value })
        }
    }

    countingDown = () => {
        if (this.state.remain <= 1) window.clearInterval(this._timer);
        this.setState({ remain: this.state.remain - 1 });
    }

    tick = () => {
        this.setState({ remain: 60 });
        window.clearInterval(this._timer);
        this._timer = setInterval(this.countingDown, 1000);
    }

    componentWillUnmount() {
        clearInterval(this._timer);
    }

    getSMSCode = () => {
        if (this.state.remain <= 0) {
            this.tick();
            this.props.loopLoan.regetSMSCode();
        }
    }

    loanConfirmHandler = () => {
        if (this.state.smsValue.length >= 4) {
            this.props.loopLoan.check_loanStatus(this.state.smsValue).then(() => {
                this.props.history.push('/loan-youyi-result')
            }, (e) => {
                Components.showToast(e.message)
            });
        }
    }

    popupHideHandler = () => {
        this.setState({codePop:false})
    }

    render() {
        let { history, loopLoan } = this.props;
        let {cardinfoBankName} = this.state;
        return (
            <div styleName="cnt-container">
                {!Browser.inFXHApp && <Header title="设置提现卡" history={history} />}
                <div styleName="set-cash-card-cnt">
                    <div styleName="ui-froms">
                        <div styleName="list">
                            <span styleName="text">姓名</span>
                            <div styleName="input">
                                <input onChange={this.changeName} value={this.state.name}
                                    type="text" placeholder="请输入姓名" />
                            </div>
                        </div>
                        <div styleName="list">
                            <span styleName="text">身份证号</span>
                            <div styleName="input">
                                <input onChange={this.changeIdHandler} value={this.state.id}
                                    type="number" placeholder="请输入身份证号码" />
                            </div>
                        </div>
                    </div>
    
                    <div styleName="ui-froms">
                        <div styleName="list prompt-list">
                            <span styleName="text">储蓄卡号</span>
                            <div styleName="input">
                                <input onChange={this.changeBankNum} onBlur={this.blurBankNum}
                                    value={this.state.bankNum} type="number" placeholder="输入储蓄卡号" />
                            </div>
    
                            <div styleName="list-bank-li">
                                <a styleName="prompt-text" href="/static/loan/user-bank-support/index.html">
                                    支持银行
                                    <img src={require("../images/loan-youyi-card-add/prompt-icon.png")} />
                                </a>
                                {cardinfoBankName != '' && <span styleName="bank"> {cardinfoBankName}</span>}
                            </div>
                        </div>
                    </div>
    
                    <div styleName="ui-froms">
                        <div styleName="list">
                            <span styleName="text">手机号</span>
                            <div styleName="input">
                                <input onChange={this.changePhone} value={this.state.phone}
                                    type="number" placeholder="银行卡预留手机号" />
                            </div>
                        </div>
                    </div>
        
                    <div styleName="next-btn">
                        <div onClick={this.handlerNext} styleName="ui-btn">确定</div>
                    </div>
                </div>

                {this.state.codePop && <div styleName="mask"><div styleName="verify-popup">
                    <div styleName="verify-popup-wrap">
                        <div styleName="verify-popup-close" onClick={this.popupHideHandler}></div>
                        <div styleName="verify-popup-title">短信验证</div>
                        <div styleName="verify-popup-tip">
                            已向{loopLoan.mask_phone}发送短信验证码
                        </div>
                        <div styleName="verify-input">
                            <input styleName="sms-input" type="number" name="number"
                                value={this.state.smsValue} placeholder="输入验证码" onChange={this.smsValueHandler} />
                            <span styleName="btn-countdown" onClick={this.getSMSCode}>
                                {this.state.remain > 0 ? this.state.remain + 's' : '获取验证码'}</span>
                        </div>
                        <div styleName={this.state.smsValue.length >= 4 ? "confirm-btn blue" : "confirm-btn gray"}
                            onClick={this.loanConfirmHandler}>确定
                        </div>
                    </div>
                </div></div>}
  

            </div>
        )
    }
}

