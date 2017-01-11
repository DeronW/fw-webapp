const Questions = React.createClass({
    getInitialState: function () {
        return {score: 0, selected: startArr}
    },
    componentDidMount: function () {
    },
    clickHandler: function (value, index, num) {
        let {selected} = this.state;
        selected[index][value] = num;
        this.setState({selected: selected});
    },
    fnSumHandler: function () {
        let newArr = [];
        let ajaxcan=true;
        this.state.selected.map((value, index) => {
            if(ajaxcan){
                for (let x in value) {
                    switch (value[x]) {
                        case 0:
                            value[x] = 'a';
                            break;
                        case 1:
                            value[x] = 'b';
                            break;
                        case 2:
                            value[x] = 'c';
                            break;
                        case 3:
                            value[x] = 'd';
                            break;
                        case 4:
                            value[x] = 'e';
                            break;
                        case -1:
                            ajaxcan=false;
                            alert("第"+(index+1)+"题没有选择");
                            break;
                    }
                }
            }
            newArr.push(value);
        });
        console.log(newArr);
        if(ajaxcan){
            $FW.Ajax({
                url: API_PATH + 'mall/api/magic/v1/user.json', //传参数
                data:newArr,
                method:"post",
                success: (data) => {
                    location.href=`../user-evaluate-result/index.html?score=${data.score}&text=${data.text}`;
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

const Result = React.createClass({
    render: function () {
        return (
            <div>
                aaa
            </div>
        )
    }
});

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={'风险承受能力评估'}/>, HEADER_NODE);

    ReactDOM.render(<Questions />, CONTENT_NODE)
    // React.render(<Result />, CONTENT_NODE)
})
