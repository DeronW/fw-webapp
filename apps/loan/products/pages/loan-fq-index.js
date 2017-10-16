import React from 'react'
import { render } from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/loan-fq-index.css'
import { observer, inject } from 'mobx-react'
import { Header } from '../../lib/components'
import { Components} from 'fw-javascripts'
import { NativeBridge, Browser, Storage } from '../../lib/helpers'
import ProductDisplay from '../components/productDisplay'

const TITLE = [
    '申请条件',
    '所需资料',
    '授权认证',
    '审核方式',
    '还款方式'
]

const INFO = [
    [
        '中国大陆公民，年龄22-55周岁；手机号实名认证且在网时间超过6个月；有正常使用的信用卡；芝麻信用分600分以上。'
    ],
    [
        '用户基本信息、信用卡、手机号、芝麻信用分。'
    ],
    [
        '手机运营商、银行卡、芝麻信用分。'
    ],
    [
        '纯线上审核。'
    ],
    [
        '用户可选择自动扣款，也可主动还款。'
    ]
]

function gotoHandler(link, need_login, next_title, special_webview) {
    if (link.indexOf('://') < 0) link = location.protocol + '//' + location.hostname + link;
    if (Browser.inFXHApp) {
        NativeBridge.goto(link, need_login, next_title, special_webview);
    } else {
        location.href = link;
    }
}

@observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class BorrowMoneyDatailList extends React.Component {
    render() {
        let item = (data, index) => {
            return <div styleName="datail-list" key={index}>
                <div styleName="title">
                    <div styleName="icon"><img src={require(`../images/loan-fq-index/icon-${index}.png`)} /></div>
                    <div styleName="text">{data}</div>
                </div>
                <div styleName="info-block">{INFO[index]} </div>
            </div>
        }
        return <div styleName=""> {TITLE.map(item)} </div>
    }
}

@inject('fq') @observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class FqIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ableEnter: '',
            detailPopShow: false,
            dumiaoEnterPopShow: false,
            tryOtherLoanPopShow: false,
            canMessageShow: false,
            tryOtherLoanMsg: '',
            loanShow:false,
            title:'',
            failMsg:this.props.fq.product_data.failMsg
        }
    }
    componentDidMount = () => {
       document.title = '分期'
       this.props.fq.get_base_info();
    }

    callbackHandler = () => {
        this.setState({loanShow:false})
    }

    clickHandler = () => {
        let { fq } = this.props;
        // 初始化数据没有完成, 稍后再试
        if (fq.product_data.canStatus === null && fq.product_data.errCode != 20013 && fq.product_data.errCode !=1001003 && fq.product_data.errCode !=10001) return;
        if (fq.product_data.borrowStatus == 1 || fq.product_data.borrowStatus == 101) {
            gotoHandler('/static/loan/user-card-set/index.html');
        } else if (fq.product_data.canStatus == 2) {
            let link = `/static/loan/products/index.html#/loan-fq-form`;
            gotoHandler(link);
        } else if (fq.product_data.canStatus == 0) {
            this.setState({ dumiaoEnterPopShow: true });
        } else if (fq.product_data.canStatus == 1) {
            this.setState({loanShow:true, failMsg:"您无法申请分期借款", title:"提示"});
        } else if(fq.product_data.errCode == 20013 || fq.product_data.errCode == 1001003){
            this.setState({loanShow:true});
        } else if(fq.product_data.errCode == 10001){
            Component.showToast(this.state.failMsg)
        }else {
            this.setState({ tryOtherLoanPopShow: true });
        }
    }
    imgClickHandler = () => {
        this.setState({ detailPopShow: true });
    }
    detailClickHandler = () => {
        this.setState({ detailPopShow: false })
    }
    dumiaoCloseHandler = () => {
        this.setState({ dumiaoEnterPopShow: false })
    }
    tryOtherLoanCloseHandler = () => {
        this.setState({ tryOtherLoanPopShow: false })
    }
    canMessageCloseHandler = () => {
        this.setState({ canMessageShow: false })
    }
    render() {
        let { fq } = this.props;
        let ua = window.navigator.userAgent;
        let inWX = ua.indexOf('MicroMessenger') > -1;
        let inApp = ua.indexOf('FinancialWorkshop') > -1;
        let SOURCE_TYPE = inApp ? 3 : inWX ? 4 : 3;
        let user = Storage.getUserDict();
        let labelList = fq.product_data.productLabelList;
        let link = `/api/order/v1/jump.shtml?sourceType=${SOURCE_TYPE}&token=${user.token}&uid=${user.uid}&loanUuid=${fq.product_data.loanUuid == null ? '' : fq.product_data.loanUuid}`;
        let app_link = `https://m.easyloan888.com/api/order/v1/jump.shtml?token=${user.token}&uid=${user.uid}&loanUuid=${fq.product_data.loanUuid == null ? '' : fq.product_data.loanUuid}`;
        let goDumiao = () => {
            return <div styleName="mask" style={{ zIndex: 100 }}>
                <div styleName="detail-pop">
                    <div styleName="pop-close" onClick={this.dumiaoCloseHandler}></div>
                    <div styleName="pop-tip">{fq.product_data.canMessage}</div>
                    <div styleName="know-btn" onClick={() => { Browser.inApp ? NativeBridge.goto(app_link, false, "分期") : gotoHandler(link) }}>
                        点击查看详情</div>
                </div>
            </div>
        }

        let goBack = () => {
            Browser.inFXHApp ? NativeBridge.close() : location.href = '/static/loan/products/index.html#/'
        }

        return <div>
            <Header title="分期" goBack={goBack} />
            {this.state.loanShow && <ProductDisplay callbackHandler={this.callbackHandler} errorMessage={this.state.failMsg} popTitle={this.state.title}/>}
            <div styleName="">
                <div styleName="borrow-money-list">
                    <div styleName="icon-block">
                        <img src={fq.product_data.productLogo} /> </div>
                    <div styleName="info">
                        <div styleName="t">
                            <span styleName="title-text">{fq.product_data.productName}</span>
                            <div styleName="text"> 借款范围（{fq.product_data.amountStr}） </div>
                        </div>
                        <div styleName="b">
                            <div styleName="tag" >
                                {labelList && labelList.map((data, index) => {
                                    return <img src={require("../images/loan-fq-index/tag-" + data.labelType + ".png")} key={index} />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div styleName="borrow-money-detail-data">
                    <div styleName="list">
                        <div styleName="name-text">{fq.product_data.monthRateStr}</div>
                        <div styleName="data-text">
                            每月费用
                            <img src={require("../images/loan-fq-index/icon-6.png")} onClick={this.imgClickHandler} />
                        </div>
                    </div>
                    <div styleName="list">
                        <div styleName="name-text">{fq.product_data.termRangeStr}个月</div>
                        <div styleName="data-text">
                            期限范围
                        </div>
                    </div>
                    <div styleName="list">
                        <div styleName="name-text">{fq.product_data.fastLoanValue}</div>
                        <div styleName="data-text">
                            最快放款
                        </div>
                    </div>
                </div>
            </div>
            <BorrowMoneyDatailList product={this.props.product} />
            <div styleName="footer">
                <div styleName="btn" onClick={this.clickHandler}>马上拿钱</div>
            </div>
            {this.state.detailPopShow && <div styleName="mask" style={{ zIndex: 100 }}>
                <div styleName="detail-pop">
                    <div styleName="pop-title">费用说明</div>
                    <div styleName="pop-close" onClick={this.detailClickHandler}></div>
                    <div styleName="pop-item">
                        <div styleName="pop-item-wrap"><span styleName="pop-item-name">月利率</span><span styleName="pop-item-num">{fq.product_data.loanRateStr}</span></div>
                        <div styleName="pop-item-desc">贷款机构收取的贷款利率,按月收取</div>
                    </div>
                    <div styleName="pop-item">
                        <div styleName="pop-item-wrap"><span styleName="pop-item-name">月服务利率</span><span styleName="pop-item-num">{fq.product_data.serviceRateStr}</span></div>
                        <div styleName="pop-item-desc">贷款机构收取的贷款服务费,按月收取</div>
                    </div>
                    <div styleName="pop-item">
                        <div styleName="pop-item-wrap"><span styleName="pop-item-name">一次性手续费</span><span styleName="pop-item-num">{fq.product_data.commRateStr}</span></div>
                        <div styleName="pop-item-desc">贷款机构收取的一次性费用</div>
                    </div>
                    <a styleName="know-btn" onClick={this.detailClickHandler}>知道了</a>
                </div>
            </div>}
            {this.state.dumiaoEnterPopShow && goDumiao()}
            {this.state.canMessageShow && <div styleName="mask" style={{ zIndex: 100 }}>
                <div styleName="detail-pop">
                    <div styleName="pop-close" onClick={this.canMessageCloseHandler}></div>
                    <div styleName="pop-tip">{this.state.canMessage}</div>
                    <a styleName="know-btn" onClick={
                        () => Browser.inApp ?
                            NativeBridge.close() :
                            gotoHandler("/static/loan/products/index.html#/")}>
                        尝试其他借款</a>
                </div>
            </div>}
            {this.state.tryOtherLoanPopShow && <div styleName="mask" style={{ zIndex: 100 }}>
                <div styleName="detail-pop">
                    <div styleName="pop-close" onClick={this.tryOtherLoanCloseHandler}></div>
                    <div styleName="pop-tip">{this.state.tryOtherLoanMsg}</div>
                    <a styleName="know-btn" onClick={
                        () => Browser.inApp ?
                            NativeBridge.close() :
                            gotoHandler("/static/loan/products/index.html#/")}>
                        尝试其他借款</a>
                </div>
            </div>}
        </div>
    }
}
