const RedBag = React.createClass({
    getInitialState: function () {
        return {
            num: 0,
            liclass:
        }
    },
    componentDidMount: function () {
        let step = 1;
        let nowId;
        let initAnimation = ()=> {
            setTimeout(()=> {
                if (this.state.num >= 10) {
                    step = -step;
                } else if (this.state.num <= 0) {
                    step = 1;
                }
                this.setState({num: (this.state.num + step) > 10 ? 10 : (this.state.num + step)});
                nowId = requestAnimationFrame(initAnimation);
            }, 150)

        };
        nowId = requestAnimationFrame(initAnimation);
    },
    clickRedBag: function (e) {
        console.log(this.className);
    },
    initialBag: function () {

    },
    render: function () {
        return (
            <div className={} onClick={this.clickRedBag} style={{
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




