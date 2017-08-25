import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components, Utils } from 'fw-javascripts'

import { Header } from '../../components'
import { NativeBridge, Browser, Get } from '../../helpers'
import styles from '../../css/user/evaluate.css'

const QUESTIONS = [{
    q: 'Q1：您的年龄是？',
    seq: 0,
    name: "age",
    options: [{
        a: 'A.18-30岁',
        score: 2
    }, {
        a: 'B.31-50岁',
        score: 8
    }, {
        a: 'C.51-64岁',
        score: 6
    }, {
        a: 'D.高于64岁',
        score: 1
    }, {
        a: 'E.18岁以下',
        score: 0
    }]
}, {
    q: 'Q2：您的家庭年收入为（折合人民币）？',
    seq: 1,
    name: "income",
    options: [{
        a: 'A.5万元以下',
        score: 0
    }, {
        a: 'B.5-20万元',
        score: 2
    }, {
        a: 'C.20-50万元',
        score: 6
    }, {
        a: 'D.50-100万元',
        score: 8
    }, {
        a: 'E.100万元以上',
        score: 10
    }]
}, {
    q: 'Q3：一般情况下，在您每年的家庭收入中，可用于金融投资（储蓄存款的比例为）？',
    seq: 2,
    name: "can",
    options: [{
        a: 'A.小于10%',
        score: 2
    }, {
        a: 'B.10%至25% ',
        score: 4
    }, {
        a: 'C.25%至50%',
        score: 8
    }, {
        a: 'D.大于50%',
        score: 10
    }]
}, {
    q: 'Q4：以下哪项最能说明您的投资经验？',
    seq: 3,
    name: "experience",
    options: [{
        a: 'A.除存款、国债外，我几乎不投资其他金融产品',
        score: 0
    }, {
        a: 'B.大部分投资于存款、国债等，较少投资于股票、基金等风险产品',
        score: 2
    }, {
        a: 'C.资产均衡地分布于存款、国债、银行理财产品、信托产品、股票、基金等',
        score: 6
    }, {
        a: 'D.大部分投资于股票、基金、外汇等高风险产品，较少投资于存款、国债',
        score: 10
    }]
}, {
    q: 'Q5：您有多少年投资股票、基金、外汇、金融衍生产品等风险投资品的经验？',
    seq: 4,
    name: "experiencePeriod",
    options: [{
        a: 'A.没有经验',
        score: 0
    }, {
        a: 'B.少于两年',
        score: 2
    }, {
        a: 'C.2-5年',
        score: 6
    }, {
        a: 'D.5-8年',
        score: 8
    }, {
        a: 'E.8年以上',
        score: 10
    }]
}, {
    q: 'Q6：以下哪项描述最符合您的投资态度？',
    seq: 5,
    name: "attitude",
    options: [{
        a: 'A.厌恶风险，不希望本金损失，希望获得稳定回报',
        score: 0
    }, {
        a: 'B.保守投资，不希望本金损失，愿意承担一定幅度的收益波动',
        score: 4
    }, {
        a: 'C.寻求资金的较高收益和成长性，愿意为此承担有限本金损失',
        score: 8
    }, {
        a: 'D.希望赚取高回报，能接受为期较长期间的负面波动，包括本金损失',
        score: 10
    }]
}, {
    q: 'Q7：您计划的投资期限是多久？',
    seq: 6,
    name: "investPeriod",
    options: [{
        a: 'A.1年以下，我可能会随时动用投资基金，对其流动性要求比较高',
        score: 4
    }, {
        a: 'B.1-3年，为获得满意的收益，我短期内不会动用投资资金',
        score: 6
    }, {
        a: 'C.3-5年，我会在相对较长的一段时间内进行投资，对流动性要求较低',
        score: 8
    }, {
        a: 'D.5年以上，为达到理财目标，我会持续的进行投资',
        score: 10
    }]
}, {
    q: 'Q8：您的投资目的与期望值是？',
    seq: 7,
    name: "hope",
    options: [{
        a: 'A.资产保值，与银行同期存款利率大体相同',
        score: 2
    }, {
        a: 'B.资产稳健增长，略高于银行定期存款利率',
        score: 6
    }, {
        a: 'C.资产迅速增长，远超银行定期存款利率',
        score: 10
    }]
}, {
    q: 'Q9：您对期限为半年的产品，投资风险适应度是？',
    seq: 8,
    name: "riskAjust",
    options: [{
        a: 'A.本金无损失，收益达到定期存款收益',
        score: 0
    }, {
        a: 'B.在本金安全或者有较大保障的情况下，可以承受收益适当的波动，以便有可能获得大于同期存款收益',
        score: 4
    }, {
        a: 'C.在本金损失可能性极低的情况下，愿意接受投资收益，以便获得大于同期存款收益',
        score: 6
    }, {
        a: 'D.愿意承担一定风险，以寻求一定的资金收益和成长性',
        score: 10
    }, {
        a: 'E.为获得一定投资回报，愿意承担投资产品市值较大波动，甚至本金损失',
        score: 15
    }]
}, {
    q: 'Q10：您投资产品的期限超过一年后，出现何种程度的波动，您会呈现明显的焦虑？',
    seq: 9,
    name: "anxious",
    options: [{
        a: 'A.本金无损失，但收益未达预期',
        score: 0
    }, {
        a: 'B.出现轻微本金损失',
        score: 4
    }, {
        a: 'C.本金10%以内的损失',
        score: 6
    }, {
        a: 'D.本金20%-50%的损失',
        score: 10
    }, {
        a: 'E.本金50%以上的损失',
        score: 15
    }]
}]


@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Evaluate extends React.Component {
    state = {
        finished: false,
        score: 0,
        evaluateType: "风险类型",
        selected: []
    }

    componentDidMount() {
        NativeBridge.trigger('hide_header')
    }

    back_handler = () => {
        if (Utils.hashQuery.next_url) {
            // 针对批量预约功能, 如果用户未评测, 先评测然后直接去预约, 而不是普通返回
            this.props.history.replace(Utils.hashQuery.next_url)
        } else {
            Browser.inApp ?
                NativeBridge.close() :
                this.props.history.goBack()
        }
    }

    selectHandler = (questionIndex, answerIndex) => {
        let { selected } = this.state
        selected[questionIndex] = answerIndex
        this.setState({ selected: selected });
    }

    submitHandler = () => {
        let form_data = {}, { selected } = this.state, err;
        for (let i = 0; i < QUESTIONS.length; i++) {
            let v = ['A', 'B', 'C', 'D', 'E'][selected[i]]
            if (!v) {
                err = true
                break
            }
            form_data[QUESTIONS[i].name] = v
        }
        err ?
            Components.showToast("您还有未填写试题") :
            Get('/orderuser/riskGradeInto.shtml', form_data)
                .then(data => this.setState({
                    finished: true,
                    score: data.score,
                    evaluateType: data.gradeLevel
                }))
    }

    render() {
        let { finished, score, evaluateType, selected } = this.state
        let { history } = this.props
        let result = () => {
            return <div>
                <div styleName="result-top">
                    <img styleName="result-img" src={require("../../images/user/evaluate/result.png")} />
                    <div styleName="result-score">{score}分</div>
                    <div styleName="result-text1">评估完成，您的风险承受能力为：</div>
                    <div styleName="result-text2">{evaluateType}</div>
                </div>
                <div styleName="result-cnt">
                    <div styleName="result-text-1">郑重提醒：</div>
                    <div styleName="result-text-2">
                        出借人需具备相应的风险承受能力，审慎参与市场出借，合理配置金融资产。本风险承受能力评估并不构成对出借人未来所承担出借风险程度的保证，仅作为本平台客户适当性服务的依据。实际出借时请慎重选择，本平台不对出借人据此出借资金所产生的风险承担责任。
                    </div>
                    <div styleName="result-text-1"> 本人声明：</div>
                    <div styleName="result-text-2">在出借人风险承受能力测试过程中，本人提供的全部信息、资料是真实、准确和完整的，测试结果真实、准确地反映了本人的出借风险承受程度。
                    </div>
                    <div styleName="result-text-2">本人保证上述所填信息为本人真实的意思表示，完全独立依据自身情况和判断做出上述答案，并接受评估意见。否则由此导致的一切后果由本人承担。
                    </div>
                    <div styleName="result-list-box">
                        <div styleName="li-head">
                            <div styleName="li-l">分数</div>
                            <div styleName="li-r">风险承受能力类型</div>
                        </div>
                        <div styleName="li">
                            <div styleName="li-l">61分或以上</div>
                            <div styleName="li-r">进取型</div>
                        </div>
                        <div styleName="li">
                            <div styleName="li-l">41-60分</div>
                            <div styleName="li-r">平衡型</div>
                        </div>
                        <div styleName="li">
                            <div styleName="li-l">21-40分</div>
                            <div styleName="li-r">稳健型</div>
                        </div>
                        <div styleName="li">
                            <div styleName="li-l">20分以下</div>
                            <div styleName="li-r">谨慎型</div>
                        </div>
                    </div>
                </div>
                <div styleName="submit-panel">
                    <a styleName="btn-submit" onClick={this.back_handler}>退出</a>
                </div>
            </div>
        }

        let questions = () => {
            let question = (q, index) => {
                let myName = q.name;
                let myNum = index;
                let option = (o, oIndex) => {
                    let cn = "select";
                    (selected && selected[myNum] == oIndex) ? cn = styles['checked'] : cn = styles['select']
                    return <div styleName="question-select" key={oIndex}
                        onClick={() => this.selectHandler(myNum, oIndex)}
                    >
                        <div className={cn}></div>{o.a}
                    </div>
                }

                return <div key={index} styleName="question-item">
                    <div styleName="question-title">{q.q}</div>
                    {q.options.map(option)}
                </div>
            }
            return <div>
                <div styleName="question-img">
                    <div styleName="question-tips">
                        重要提示：请先仔细阅读然后填写《个人出借风险能力评估表》
                    </div>
                    <div styleName="question-content">
                        <div styleName="qc-title">尊敬的客户：</div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        为了便于您了解自身的风险承受能力，选择合适的出借项目，请您填写以下评估问卷，工场微金承诺对您的所有个人资料保密。下列问题可协助评估您对金融工具及出借目标相关风险的态度。请您回答所有的问题，并在各题最合适的答案选项上打“√”。我们将根据您的加总分评估您的出借风险承受能力，建议您出借与自己的风险承受能力相匹配的出借项目。为了及时了解您的出借风险承受能力，我们建议您定期评估。

                    </div>
                    <div styleName="risk-tips">
                        风险提示：出借需承担各类风险，可能遭受资金损失。市场
                        有风险，出借需谨慎。
                    </div>
                </div>
                <div styleName="question-list">{QUESTIONS.map(question)}</div>
                <div styleName="submit-panel">
                    <div styleName="btn-submit" onClick={this.submitHandler}>提交</div>
                </div>
            </div>
        }

        return <div styleName="bg">
            <Header noClose title="风险承受能力评估" history={history} />
            {!finished && questions()}
            {finished && result()}
        </div>
    }
}

export default Evaluate