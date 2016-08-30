const NineDraw = React.createClass({
    getInitialState: function () {
        this._usable = true;
        this._timer = null;

        return {
            masker: null,
            showPopPrize: false,

            remainTimes: null,
            infinitely: null,
            costScore: null,
            usableScore: null
        }
    },
    componentDidMount: function () {

        $FW.Ajax({
            url: `${API_PATH}mall/api/magic/v1/cost.json?activityId=${ACTIVITY_ID}`, //活动消耗工分
            success: (data) => {
                this.setState({
                    infinitely: data.infinitely,
                    costScore: data.costScore,
                    usableScore: data.usableScore,
                    remainTimes: data.remainTimes
                });

                this.props.setUsableScore(data.usableScore);
            }
        })
    },
    startRoll: function () {
        this._timer = setInterval(()=> {
            this.setState({masker: (this.state.masker + 1) % 8})
        }, 800 / 8);
    },
    stopRoll: function (n, prizeName) {
        clearInterval(this._timer);

        var remain = (7 - this.state.masker) + 8 * 2 + parseFloat(n) - 1;
        var orig_remain = remain;
console.log(remain);
console.log(this.state.masker);
        var run = () => {
            setTimeout(()=> {
                if (remain-- >= 0) {
                    this.setState({masker: (this.state.masker + 1) % 8});
                    run()
                }
                if (remain == -1) {
                    this.setState({showPopPrize: true});
                    this.props.addPriceList(prizeName);

                    this._usable = true;
                }
            }, 1000 / 8 + (orig_remain - remain) * 10);
        };
        run();
    },
    hideRoll: function () {
        clearInterval(this._timer);
        this.setState({masker: null});
    },
    hidePopPrize: function () {
        this.setState({showPopPrize: false})
    },
    clickHandler: function () {
        if (!this._usable) return;
        if (this.state.remainTimes < 1) return;
        this._usable = false;

        $FW.Ajax({
            url: API_PATH + 'mall/api/magic/v1/draw.json',
            method: 'post',
            data: {activityId: '1ead8644a476448e8f71a72da29139ff', source: getBrowserType()},
            success: (data) => {
                this.setState({
                    remainTimes: data.remainTimes
                });
                this.stopRoll(data.prizeMark, data.prizeName);
                this.props.setUsableScore(data.usableScore);
            },
            fail: () => {
                this._usable = true;
                this.hideRoll();
            }
        });
    },
    render: function () {
        let cell = function (n, index) {
            let active = this.state.masker !== null && n == this.state.masker + 1;
            return (
                <div key={index} className={"prize-li prize-li" + n}>
                    <div className={"prize prize" + n}></div>
                    <div className={active ? "prize-masker on" : "prize-masker"}></div>
                </div>
            )
        }.bind(this);

        let score = () => {
            if (this.props.infinitely) {
                return <div className="tip-score">不限次抽奖</div>
            } else {
                return <div className="tip-score">
                    今日剩<span>{this.state.remainTimes}</span>次
                </div>
            }
        };

        return (
            <div className="Nine-draw">
                <div className="tip">
                    <div className="tip-score">单次消耗<span>
                        {this.state.costScore}</span>工分</div>
                    <div className="tip-line"></div>
                    {score()}
                </div>
                <div className="prize-box">
                    { [1, 2, 3, 4, 5, 6, 7, 8].map(cell) }
                </div>
                <div className={this.state.remainTimes > 0 ? "prize-btn" : "prize-btn off"}
                     onClick={this.clickHandler}><img src="images/gray-start.png"/></div>

                {this.state.showPopPrize ?
                    <PopPrize infinitely={this.props.infinitely}
                              hidePopPrize={this.hidePopPrize}
                              masker={this.state.masker}
                              remainTimes={this.state.remainTimes}/> : null}

            </div>
        )
    }
});
