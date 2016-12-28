const RedBag = React.createClass({
    getInitialState: function () {
        return {
            num: 0
        }
    },
    componentDidMount: function () {
        let step = 1;
        let nowId;
        let initAnimation = ()=> {
            setTimeout(()=>{
                console.log(this.state.num);
                if (this.state.num >= 10) {
                    step = -step;
                } else if (this.state.num <= 0) {
                    step = 1;
                }
                this.setState({num: (this.state.num + step) > 10 ? 10 : (this.state.num + step)});
                nowId = requestAnimationFrame(initAnimation);
            },100)

        };
        nowId = requestAnimationFrame(initAnimation);
    },
    clickRedBag: function () {

    },
    initialBag: function () {

    },
    render: function () {
        return (
            <div className="red-bag-li" onClick={this.clickRedBag}>
                <div className="red-bag-text">+1</div>
                <div className="red-bag-img"><img src="images/list-img1.png" style={{
                    height: 40 * 10 + 'px',
                    width: 40 * 10 + 'px',
                    opacity: this.state.num/10
                }}/></div>
            </div>
        );
    }
});




