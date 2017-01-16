
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
                    <div className="foot-btn" onClick={() => { back_handler() } }>退出</div>
                </div>
            </div>
        )
    }
});

