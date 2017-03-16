
let QUESTIONS = [{
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
}];

let startArr = [];

QUESTIONS.forEach(value => {
    let json = {};
    json[value.name] = -1;
    startArr.push(json);
});

const Result = React.createClass({
    render: function () {
        return (
            <div className="question-result">
                <div className="result-top">
                    <div className="result-img"><img src="images/result.png" /></div>
                    <div className="result-score">{this.props.score}分</div>
                    <div className="result-text1">评估完成，您的风险承受能力为：</div>
                    <div className="result-text2">{this.props.investType}</div>
                </div>
                <div className="result-cnt">
                    <div className="text1">郑重提醒：</div>
                    <div className="text2">投资人需具备相应的风险承受能力，审慎参与市场投资，合理配置金融资产。本风险承受能力评估并不构成对投资者未来所承担证券投资风险程度的保证，仅作为金融工场客户适当性服务的依据。实际投资时请慎重选择，金融工场不对投资者据此投资所产生的风险承担责任。
                    </div>
                    <div className="text3"> 本人声明：</div>
                    <div className="text4">在投资者风险承受能力测试过程中，本人提供的全部信息、资料是真实、准确和完整的，测试结果真实、准确地反映了本人的投资风险承受程度。
                    </div>
                    <div className="list-box">
                        <div className="li-head">
                            <div className="li-l">分数</div>
                            <div className="li-r">风险承受能力类型</div>
                        </div>
                        <div className="li">
                            <div className="li-l">81分或以上</div>
                            <div className="li-r">激进型</div>
                        </div>
                        <div className="li">
                            <div className="li-l">61-80分</div>
                            <div className="li-r">进取型</div>
                        </div>
                        <div className="li">
                            <div className="li-l">41-60分</div>
                            <div className="li-r">平衡型</div>
                        </div>
                        <div className="li">
                            <div className="li-l">21-40分</div>
                            <div className="li-r">稳健型</div>
                        </div>
                        <div className="li">
                            <div className="li-l">20分以下</div>
                            <div className="li-r">谨慎型</div>
                        </div>
                    </div>
                </div>
                <div className="foot-btn-box">
                    <div className="foot-btn" onClick={() => { back_handler() }}>退出</div>
                </div>
            </div>
        )
    }
});

const QuestionPanel = React.createClass({
    getInitialState: function () {
        return { selected: startArr }
    },
    componentDidMount: function () {
    },
    clickHandler: function (value, index, num) {
        let { selected } = this.state;
        selected[index][value] = num;
        this.setState({ selected: selected });
    },
    fnSumHandler: function () {
        let newJson = {};
        let ajaxcan = true;
        this.state.selected.map((value, index) => ({
            if(ajaxcan) {
                for (let x in value) {
                    switch (value[x]) {
                        case 0:
                            value[x] = 'A';
                            break;
                        case 1:
                            value[x] = 'B';
                            break;
                        case 2:
                            value[x] = 'C';
                            break;
                        case 3:
                            value[x] = 'D';
                            break;
                        case 4:
                            value[x] = 'E';
                            break;
                        case -1:
                            ajaxcan = false;
                            $FW.Component.Toast("您还有未填写试题");
                            break;
                        default:
                        // do nothing
                    }
                    newJson[x] = value[x];
                }
            }

        }));
        if (ajaxcan) {
            $FW.Ajax({
                url: API_PATH + 'mpwap/orderuser/riskGradeInto.shtml', //传参数
                data: newJson,
                success: (data) => {
                    this.props.setResult(true, data.score, data.gradeLevel);
                }
            })
        }
    },
    render: function () {
        let question = (i, num) => {
            let myName = i.name;
            let myNum = num;
            let option = (o, oIndex) => {
                return (
                    <div className="question-select" key={oIndex}>
                        <div className={this.state.selected[myNum][myName] == oIndex ? "select checked" : "select"}
                            onClick={() => this.clickHandler(myName, myNum, oIndex)}>
                        </div>
                        {o.a}
                    </div>
                )
            };

            return (
                <div key={num} className="question-li">
                    <div className="question">{i.q}</div>
                    <div className="answer">
                        {i.options.map(option)}
                    </div>
                </div>
            )
        }
        return (
            <div className="question-box">
                <div className="question-img"><img src="images/question-top.png" /></div>
                <div className="question-tip">风险提示：投资需承担各类风险，可能遭受资金损失。市场有风险，投资需谨慎。</div>
                <div className="question-ul">{QUESTIONS.map(question)}</div>
                <div className="foot-btn-box">
                    <div className="foot-btn" onClick={this.fnSumHandler}>提交</div>
                </div>
            </div>
        )
    }
});

const Answer = React.createClass({
    getInitialState: function () {
        return {
            answer: false,
            score: 0,
            investType: "稳健型",
        }
    },
    setResult: function (answer, score, investType) {
        this.setState({
            answer: answer,
            score: score,
            investType: investType,
        })
    },
    render: function () {
        return (
            <div>
                {this.state.answer ? <Result investType={this.state.investType} score={this.state.score} /> :
                    <QuestionPanel setResult={this.setResult} />}
            </div>
        )
    }
});

$FW.DOMReady(() => {
    if (!$FW.Browser.inApp())
        ReactDOM.render(<Header title={'风险承受能力评估'}
            back_handler={back_handler} />, HEADER_NODE);
    ReactDOM.render(<Answer />, CONTENT_NODE);
})
function back_handler() {
    $FW.Browser.inApp() ? NativeBridge.close() : window.history.back();
}
