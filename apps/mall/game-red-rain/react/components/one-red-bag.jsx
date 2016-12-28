const RedBag = React.createClass({
    getInitialState: function () {
        return {
            num: 0,
            liclass:"red-bag-li"
        }
    },
    componentDidMount: function () {
        let step = 1;
        let initAnimation = ()=> {
            let mytimeout=setTimeout(()=> {
                if (this.state.num >= 10) {
                    step = -step;
                } else if (this.state.num <= 0) {
                    step = 1;
                }
                this.setState({num: (this.state.num + step) > 10 ? 10 : (this.state.num + step)});
                initAnimation();
            }, 150)

        };
        initAnimation();
    },
    clickRedBag: function (e) {
        this.setState({liclass:"red-bag-li clicked"});
        clearTimeout(mytimeout);
        this.setState({num: 10});
    },
    initialBag: function () {

    },
    render: function () {
        return (
            <div className={this.state.liclass} onClick={this.clickRedBag} style={{
                left: 200 - 20 * this.state.num/2 + 'px',
                top: 200 - 20 * this.state.num/2 + 'px',
            }}>
                <div className="red-bag-text" >+1</div>
                <div className="red-bag-img"><img src="images/list-img1.png" style={{
                    height: 20 * this.state.num + 'px',
                    width: 20 * this.state.num + 'px',
                    opacity: this.state.num / 10,
                }}/></div>
            </div>
        );
    }
});




