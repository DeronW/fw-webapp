import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import ReactEcharts from 'echarts-for-react'
import { Utils } from 'fw-javascripts'

import { Header } from '../../components'
import styles from '../../css/investor/info.css'

@inject('investor')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Info extends React.Component {
    state = {
        hidden: false,
        custId:Utils.hashQuery.custId
    }

    componentDidMount() {

        //id为从客户页面跳转时url中的cust_id
        // this.props.investor.fetchInfo(Utils.hashQuery.id)
    }

    showMore = () => {
        this.setState({ hidden: !this.state.hidden })
    }
    gotoHandler = (link) => {
        let { history } = this.props
        history.push(`${link}?custId=${this.state.custId}`)
    }
    jumpToRemark = () => {
        let { history } = this.props
        history.push('/investor-remark')
    }
    getOption = (three,four,seven,ten,twelve) => ({
        title: {
            text: '客户整体投资期限分析',
            textStyle: {
                color: '#555',
                fontSize: '24',
                fontWeight: 'normal'
            },
            padding: [0, 0, 10, 0],
            left: '400',
            top: '60'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            left: '400',
            top: '100',
            data: [
                { name: '≤3个月', icon: 'circle' },
                { name: '＞3个月,≤6个月', icon: 'circle' },
                { name: '＞6个月,≤9个月', icon: 'circle' },
                { name: '＞9个月,≤12个月', icon: 'circle' },
                { name: '＞12个月', icon: 'circle' },
            ],
            textStyle: {
                color: '#999',
                fontSize: '22'
            },
        },
        series: [
            {
                name: '',
                type: 'pie',
                center: ['30%', '50%'],
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '16',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    { value: three, name: '≤3个月' },
                    { value: four, name: '＞3个月,≤6个月' },
                    { value: seven, name: '＞6个月,≤9个月' },
                    { value: ten, name: '＞9个月,≤12个月' },
                    { value: twelve, name: '＞12个月' }
                ]
            }
        ],
        color: ['#ed9782', '#b9593f', '#ef7855', '#fdd693', '#b93f54']
    })

    render() {
        let { history } = this.props
        let { hidden,id } = this.state;

        let desStyle = {
            height: hidden ? '100%' : '100px',
            overflow: hidden ? 'visible' : 'hidden'
        }

        let { info } = this.props.investor.data
        let { detail,analysis } = info

        let {within3MonthRate,four2SixMonthRate,seven2NineMonthRate,ten2TwelveMonthRate,moreThanOneYearRate}=analysis
        return <div styleName="bg">
            <Header title="客户详情" history={history} />
            <div styleName="bar">
                <div styleName="leftBar">
                    <img src={require('../../images/investor/info/man.png')} />
                    <div styleName="level">{detail.userLevel}</div>
                </div>
                <div styleName="rightBar">
                    <div styleName="name">{detail.realName}<span>({detail.birthday})</span></div>
                    <div styleName="amount">差<span>{detail.mumValue}元</span>年化投资额升级VIP2</div>
                    <div styleName="time">注册时间 {detail.createTime}</div>
                </div>
                <div styleName="bottomBar">
                    <div styleName="itemBar" onClick={() => this.gotoHandler('/investor-bean')}>
                        <div styleName="itemBarNum">{detail.availableBalance}</div>
                        <div styleName="itemBarText">工豆(元)</div>
                    </div>
                    <div styleName="itemBar" onClick={() => this.gotoHandler('/investor-coupon')}>
                        <div styleName="itemBarNum">{detail.quanCount}</div>
                        <div styleName="itemBarText">优惠券(张)</div>
                    </div>
                    <div styleName="itemBar" onClick={() => this.gotoHandler('/investor-score')}>
                        <div styleName="itemBarNum">{detail.reditCount}万</div>
                        <div styleName="itemBarText">工分</div>
                    </div>
                </div>
            </div>
            <div styleName="infoBox">
                <div styleName="infoItem">
                    <div styleName="infoText">投资平均收益率</div>
                    <div styleName="infoValue">{analysis.investMeanProfit}</div>
                </div>
                <div styleName="infoItem">
                    <div styleName="infoText">投资平均周期</div>
                    <div styleName="infoValue">{analysis.investMeanPhase}</div>
                </div>
            </div>
            <div styleName="pie">
                <ReactEcharts option={this.getOption(1,2,3,4,5)}
                    style={{ height: '100%', width: '100%' }} />
            </div>
            <div styleName="total">
                <div styleName="totalTitle">客户投资总额</div>
                <div styleName="totalAmount"><span>¥{detail.totalInvestAmt}</span>万</div>
            </div>
            <div styleName="investBox">
                <div styleName="invest">
                    <div styleName="investItem">
                        <div styleName="investTitle">年化投资总额</div>
                        <div styleName="investAmount">¥{detail.totalYearAmt}</div>
                    </div>
                    <div styleName="investItem">
                        <div styleName="investTitle">在投总金额</div>
                        <div styleName="investAmount">¥{detail.currInvestAmt}</div>
                    </div>
                </div>
                <div styleName="invest">
                    <div styleName="investItem">
                        <div styleName="investTitle">可用余额(不含工豆)</div>
                        <div styleName="investAmount">¥{detail.availableBalance}</div>
                    </div>
                    <div styleName="investItem">
                        <div styleName="investTitle">累计总收益</div>
                        <div styleName="investAmount red">¥{detail.accAmt}</div>
                    </div>
                </div>
            </div>
            <div styleName="remark" onClick="">
                <div styleName="remarkTitle">备注</div>
                <img src={require('../../images/investor/info/arrow.png')} />
                <div styleName="remarkAmend" onClick={this.jumpToRemark}>修改</div>
            </div>
            <div styleName="remarkText">
                <div styleName="remarkDes" style={desStyle}>
                    {detail.remark}
                    {/*客户喜欢短期，回款会及时投资，<br/>很少提现 家为湖北 <br/>比较喜欢奖励和优惠<br/>*/}
                    {/*客户喜欢短期，回款会及时投资，<br/>很少提现 家为湖北 <br/>比较喜欢奖励和优惠*/}
                </div>
                <div styleName="more" onClick={this.showMore}>
                    <span>{hidden ? '收起' : '更多'}</span>
                    <img style={{ transform: hidden ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        src={require('../../images/investor/info/down.png')} />
                </div>
            </div>
            <div styleName="account">
                <div styleName="accountItem" onClick={() => this.gotoHandler('/investor-account-zx')}>
                    <div styleName="accountName">TA的尊享账户</div>
                    <div styleName="accountText">
                        可用余额
                        <span>{detail.zxBalance}元</span>
                        <img src={require('../../images/investor/info/arrow.png')} />
                    </div>
                </div>
                <div styleName="accountItem" onClick={() => this.gotoHandler('/investor-account-p2p')}>
                    <div styleName="accountName">TA的微金账户</div>
                    <div styleName="accountText">
                        可用余额
                        <span>{detail.wjBalance}元</span>
                        <img src={require('../../images/investor/info/arrow.png')} />
                    </div>
                </div>
                <div styleName="accountItem" onClick={() => this.gotoHandler('/investor-account-hj')}>
                    <div styleName="accountName">TA的黄金账户</div>
                    <div styleName="accountText">
                        持有黄金
                        <span>{detail.goldAmount}克</span>
                        <img src={require('../../images/investor/info/arrow.png')} />
                    </div>
                </div>
            </div>
            <div styleName="tabBar">
                <div styleName="tabBarItem" onClick={() => this.gotoHandler('/user-transfer-coupon')}>
                    <img src={require('../../images/investor/info/coupon.png')} />
                    <div>送优惠券</div>
                </div>
                <a styleName="tabBarItem" href={`tel:${detail.mobile}`}>
                    <img src={require('../../images/investor/info/contact.png')} />
                    <div>联系客户</div>
                </a>
            </div>
        </div>
    }
}

export default Info