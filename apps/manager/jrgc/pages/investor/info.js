import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import ReactEcharts from 'echarts-for-react'

import {Header} from '../../components'
import styles from '../../css/investor/info.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Info extends React.Component {
    getOption = () => ({
        title:{
            text:'客户整体投资期限分析',
            textStyle:{
                color:'#555',
                fontSize:'24',
                fontWeight:'normal'
            },
            padding:[0,0,10,0],
            left:'400',
            top:'60'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            left:'400',
            top:'100',
            data:[
                {name:'≤3个月',icon:'circle'},
                {name:'＞3个月,≤6个月',icon:'circle'},
                {name:'＞6个月,≤9个月',icon:'circle'},
                {name:'＞9个月,≤12个月',icon:'circle'},
                {name:'＞12个月',icon:'circle'},
            ],
            textStyle:{
                color:'#999',
                fontSize:'22'
            },
        },
        series: [
            {
                name:'客户整体投资期限分析',
                type:'pie',
                center:['30%','50%'],
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
                data:[
                    {value:335, name:'≤3个月'},
                    {value:310, name:'＞3个月,≤6个月'},
                    {value:234, name:'＞6个月,≤9个月'},
                    {value:135, name:'＞9个月,≤12个月'},
                    {value:1548, name:'＞12个月'}
                ]
            }
        ],
        color:['#ed9782','#b9593f', '#ef7855', '#fdd693', '#b93f54']
    })
    render() {
        let {history} = this.props
        return <div styleName="bg">
            <Header title="客户详情" history={history}/>
            <div styleName="bar">
                <div styleName="leftBar">
                    <img src={require('../../images/investor/info/man.png')}/>
                    <div styleName="level">VIP1</div>
                </div>
                <div styleName="rightBar">
                    <div styleName="name">张三<span>(1982.10.5)</span></div>
                    <div styleName="amount">差<span>789元</span>年化投资额升级VIP2</div>
                    <div styleName="time">注册时间  2014.01.21 16:56:35</div>
                </div>
                <div styleName="bottomBar">
                    <div styleName="itemBar">
                        <div styleName="itemBarNum">450.00</div>
                        <div styleName="itemBarText">工豆(元)</div>
                    </div>
                    <div styleName="itemBar">
                        <div styleName="itemBarNum">5</div>
                        <div styleName="itemBarText">优惠券(张)</div>
                    </div>
                    <div styleName="itemBar">
                        <div styleName="itemBarNum">0.5万</div>
                        <div styleName="itemBarText">工分</div>
                    </div>
                </div>
            </div>
            <div styleName="info">
                <div styleName="infoBox">
                    <div styleName="infoItem">
                        <div styleName="infoText">投资平均收益率</div>
                        <div styleName="infoValue">11.41%</div>
                    </div>
                    <div styleName="infoItem">
                        <div styleName="infoText">投资平均周期</div>
                        <div styleName="infoValue">63.9天</div>
                    </div>
                </div>
                <div styleName="pie">
                    <ReactEcharts option={this.getOption()}
                                  style={{height: '100%', width: '100%'}}/>
                </div>
            </div>
        </div>
    }
}

export default Info