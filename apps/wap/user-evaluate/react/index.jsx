
const Questions = React.createClass({
    getInitialState: function () {
        return {selected: startArr}
    },
    componentDidMount: function () {
    },
    clickHandler: function (value, index, num) {
        let {selected} = this.state;
        selected[index][value] = num;
        this.setState({selected: selected});
    },
    fnSumHandler: function () {
        let newJson = {};
        let ajaxcan = true;
        this.state.selected.map((value, index) => {
            if (ajaxcan) {
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
                    }
                    newJson[x]=value[x];
                }
            }

        });
        if (ajaxcan) {
            $FW.Ajax({
                url: API_PATH + 'mpwap/orderuser/riskGradeInto.shtml', //传参数
                data: newJson,
                success: (data) => {
                    this.props.setResult(true,data.score,data.gradeLevel);
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
                <div className="question-img"><img src="images/question-top.png"/></div>
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
            answer:false,
            score:0,
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
                {this.state.answer ? <Result investType={this.state.investType} score={this.state.score}/> :
                    <Questions setResult={this.setResult}/>}
            </div>
        )
    }
});

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={'风险承受能力评估'}/>, HEADER_NODE);
    ReactDOM.render(<Answer/>, CONTENT_NODE);
    // React.render(<Result />, CONTENT_NODE)
})
function back_handler(){
    $FW.Browser.inApp?NativeBridge.close():window.history.back();
}
