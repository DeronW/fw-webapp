
import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Link} from 'react-router-dom'
import ProductDisplay from '../components/productDisplay'
import {Header} from '../../lib/components'
import {Browser, Post, NativeBridge, Storage} from '../../lib/helpers'

import {Utils, Components} from 'fw-javascripts'

import styles from '../css/loan-fxh-confirm.css'
@inject("fxh")
@observer
@CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})
export default class FxhConfirm extends React.Component {
  state = {
          checked: true,
          orderGid: null,
          phoneNum: null,
          countdown: 0,
          show_warn: false,
          value: '',
          codePop:false,
          otherTip:false,
          loanShow:false,
          failMsg:'',
          loanStatus:'',
          loanResult:false,
          checkResult:false,
          itemShow: false,
          verifyCodeShow: false,
          noticeShow: false,
          successResult: false,
          failResult: false,
          reSetState:false

  }
  componentDidMount() {
    document.title = "确认借款";
    let {fxh} = this.props;
    let loanNum = Utils.hashQuery.loanNum;
    fxh.saveLoanNum(loanNum);
    fxh.saveOrderGid(orderGid);
    fxh.get_base_info();
  }
  confirmHandler = () => {
        if (this.state.checked == false) {
            Components.showToast("请同意借款服务协议，借款确认书和代扣服务协议");
        } else {
            // let query = $FW.Format.urlQuery();
            // let {fxh} = this.props;
            // let orderGid = Utils.hashQuery.orderGid;
            // // let orioleOrderGid = Utils.hashQuery.orioleOrderGid;
            // let loanNum = Utils.hashQuery.loanNum;
            // fxh.saveOrderGid(orderGid);
            // // fxh.saveOrioleOrderGid(orioleOrderGid);
            // fxh.saveLoanNum(loanNum);

            fxh.getVerifyCode().then(() => {
                 this.setState({codePop:true});
                 this.countingDown();
                //this.setState({orderGid: data.orderGid});
            }, (err) => Components.showToast(err.message));
        }
    }
    gotoHandler = link => {
          location.href = encodeURI(link);
      }
    checkHandler = () => {
        this.setState({ checked: !this.state.checked });
    }
    detailHandler = () => {
      this.setState({ itemShow: true });
    }
    itemHideHandler = () => {
      this.setState({itemShow:false});
    }
    showNotice = () => {
        this.setState({ noticeShow: true });
    }
    closeNotice = () => {
        this.setState({ noticeShow: false });
    }

    changeValueHandler = (e) => {
        this.setState({value: e.target.value});
    }
    closePopHandler = () => {
        this.setState({codePop:false})
    }
    countingDown = () => {
        this.setState({
            countdown: 60
        });
        this.checkAjax();
        this.timer = setInterval(() => {
            let c = this.state.countdown;
            if (c % 5 === 0 && this.state.loanStatus <= 1) this.checkAjax();
            this.setState({
                countdown: c - 1
            });
            if (this.state.countdown <= 0) {
                clearInterval(this.timer);
            }
        }, 1000);
    }
    resultShow = () => {
      this.setState({ loanResult: true });
    }
    getLoanResultCheck = () => {
      this.setState({ checkResult: true });
    }
    checkAjax = () => {
        // let query = $FW.Format.urlQuery();
        let orderGid = Utils.hashQuery.orderGid;
        Post(`/api/loan/v1/status.json`, {
            orderGid: orderGid,
            with_out_loading:true
        }).then((data) => {
            let finishFlag = true;
            if(data.loanStatus == 2 || data.loanStatus == 3){
                this.setState({codePop:false,loanShow:true,failMsg:data.failReason,loanStatus:data.loanStatus})
            }else if(data.loanStatus >= 4){
                finishFlag = false
                this.setState({loanStatus:data.loanStatus});
            }else{
                finishFlag = false
            }

            if(this.state.countdown <= 0){
                if(data.loanStatus == 2 || data.loanStatus == 3){
                    this.setState({codePop:false,loanShow:true,failMsg:data.failReason,loanStatus:data.loanStatus})
                }else if(data.loanStatus >= 4){
                    finishFlag = false
                    this.setState({loanStatus:data.loanStatus});
                }else{
                    finishFlag = false
                }
            }

            if (finishFlag) clearInterval(this.timer);

        }, (err) => {
            clearInterval(this.timer);
            this.setState({codePop:false,loanShow:true,failMsg:err.message})
        });
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
    getSMSCode = () => {
        // let query = $FW.Format.urlQuery();
        let orderGid = Utils.hashQuery.orderGid;
        if (this.state.countdown <= 0) {
            this.countingDown();
            Post(`/api/loan/v1/resendverifycode.json`,{orderGid: orderGid});
        }
    }
    codeConfirmBtnHandler = () => {
        // let query = $FW.Format.urlQuery();
        let orderGid = Utils.hashQuery.orderGid;
        if (this.state.value == '')
            return Components.showToast("请输入短信验证码");

        Post(`/api/loan/v1/do.json`, {
            orderGid: orderGid,
            verifyCode: this.state.value
        }).then(() => {
                this.setState({codePop:false});
                if(Browser.inJRGCApp){
                    this.gotoHandler(`/static/loan/products/index.html#/loan-fxh-result?orderGid=${orderGid}`);
                }else{
                    this.resultShow;
                    this.getLoanResultCheck;
                }
            }, e => {
                if(e.code == 603002){
                    this.setState({codePop:false, loanShow:true, failMsg:e.message});
                }else{
                    Components.showToast(e.message)}
            }
        );
    }

    callbackHandler = () => {
        this.setState({loanShow:false});
    }

    render() {
      let {fxh,history} = this.props;
      let {accountInAmount,shouldRepaymentAmount,dueTimeStr,totalFeeAmount,feeExtList,latedescription} = fxh;
        let frequent_tip = this.state.show_warn &&
            <div styleName="wrong-tip">{this.state.show_text}</div>;

        let phone = Storage.getUserDict().phone;
        let item_list = (item, index) => {
                return (
                    <div styleName="item-list" key={index}><span styleName="item-left">{item.feeName}</span><span
                        styleName="item-right">{item.feeAmoutStr}元</span></div>
                )
            };
    return (
        <div>
            <Header title="确认信息" history={history}/>
            <div styleName="transfer-box">
                <div styleName="money-get">
                    <div styleName="transfer-money">{accountInAmount}</div>
                  <div styleName="transfer-title">到账金额(元)</div>
                </div>
                <div styleName="loan-info">
                    <div styleName="transfer-lines">
                        <div styleName="return-money">
                            <span styleName="return-money-num">{shouldRepaymentAmount}</span>
                          <span styleName="return-money-title">应还金额(元)</span>
                        </div>
                        <div styleName="return-date">
                            <span styleName="return-date-day">{dueTimeStr}</span>
                          <span styleName="return-date-title">应还日期</span>
                        </div>
                    </div>
                    <span styleName="vertical-line"></span>
                </div>
            </div>
            <div styleName="transfer-tip">请按时还款，避免<a onClick={this.showNotice}>逾期费用</a>。</div>
          <div styleName="loan-fee">
                <span styleName="loan-fee-num">借款费用{totalFeeAmount}元</span>
              <span styleName="loan-right-arrow" onClick={this.detailHandler}>详情</span>
            </div>
            <div styleName="agreement-issue">
                <div styleName={this.state.checked ? "checked-box" : "unchecked-box"}
                     onClick={this.checkHandler}></div>
                   <div styleName="check-item">同意<a href="/static/loan/products/index.html#/protocols/borrowing">《借款服务协议》</a>、<a
                    href="/static/loan/products/index.html#/protocols/partner">《借款确认书》</a>，<a href="/static/loan/products/index.html#/protocols/cost">《代扣服务协议》</a>，未按时还款将计入信用卡银行的信用报告
                </div>
            </div>
            <div styleName="confirm-btn" onClick={this.confirmHandler}>确定</div>
            {this.state.loanShow && <ProductDisplay callbackHandler={this.callbackHandler} errorMessage={this.state.failMsg} popTitle={"审核未通过"}/>}
            <div styleName={this.state.codePop ? "mask" : "mask dis"}>
                <div styleName="verify-popup">
                    <div styleName="verify-popup-wrap">
                        <div styleName="verify-popup-close" onClick={this.closePopHandler}></div>
                      <div styleName="verify-popup-title">短信验证</div>
                    <div styleName="verify-popup-tip">
                            已向手机号(尾号{phone.slice(-4)})发送短信验证码
                            {/* 已向{this.props.bankShortName}( {this.props.cardNo.slice(-4)} )银行预留手机号发送短信验证码。 */}
                        </div>
                        <div styleName="verify-input">
                            <input styleName="sms-input" type="number" name="number"
                                   value={this.state.value}
                                   placeholder="输入验证码" onChange={this.changeValueHandler}/>
                                 <span styleName="btn-countdown" onClick={this.getSMSCode}>
                                {this.state.countdown > 0 ? `${this.state.countdown}s` : '获取验证码'}</span>
                        </div>
                        {frequent_tip}
                        <div styleName="btn-list">
                            <div styleName="cancel-btn" onClick={this.closePopHandler}>取消</div>
                          <div styleName="confirm-btn" onClick={this.codeConfirmBtnHandler}>确定</div>
                        </div>
                    </div>
                </div>
            </div>
            {this.state.noticeShow && <div styleName="mask">
                    <div styleName="notice-pop">
                        <div styleName="notice-close"></div>
                      <div styleName="notice-title">逾期费用说明</div>
                    <div styleName="close-icon" onClick={this.closeNotice}></div>
                  <div styleName="notice-content">
                            {latedescription}
                        </div>
                        <div styleName="notice-btn" onClick={this.closeNotice}>知道了</div>
                    </div>
                </div>}
                {
                  this.state.itemShow && <div styleName="mask">
                            <div styleName="detail-pop">
                                <div styleName="close-icon" onClick={this.itemHideHandler}></div>
                              <div styleName="item-title">借款费用详情</div>
                            <div styleName="item-wrap">
                                    {feeExtList.map(item_list)}
                                </div>
                                <div styleName="know-btn" onClick={this.itemHideHandler}>知道了</div>
                            </div>
                        </div>
                }
        </div>
    )
}
}
