const Questions = React.createClass({
    getInitialState: function () {
        return { score: 0, selected: [] }
    },
    clickHandler: function (seq, option) {
        let s = this.state.selected;
        s[seq] = option;
        this.setState({ selected: s }, this.fnSum);
    },
    fnSum: function () {
        let s = 0, {selected} = this.state;
        for (let i = 0; i < QUESTIONS.length; i++) {
            let q = selected[i];
            if (!isNaN(q)) s += QUESTIONS[i].options[q].score
        }
        this.setState({ score: s });
    },
    render: function () {

        let question = (i, index) => {

            let option = (o, oIndex) => {
                return (
                    <label key={oIndex}>
                        <input type="radio" name={`question-${index}`}
                            onClick={() => this.clickHandler(index, oIndex)} />
                        {o.a}
                    </label>
                )
            }

            return (
                <div key={index} className="question-cnt">
                    <div className="question">{i.q}</div>
                    <div className="answer">
                        {i.options.map(option, i.seq, 'x')}
                    </div>
                </div>
            )
        }

        let {score} = this.state;

        return (
            <div className="question-box">
                {QUESTIONS.map(question)}
                score: {score}
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
})

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={'风险承受能力评估'} />, HEADER_NODE);

    ReactDOM.render(<Questions />, CONTENT_NODE)
    // React.render(<Result />, CONTENT_NODE)
})
