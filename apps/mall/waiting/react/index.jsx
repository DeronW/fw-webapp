const Waiting = React.createClass({
    getInitialState: function () {
        return {}
    },
    render: function () {
        let style_a = {
            display: "block",
            margin: "0 auto",
            paddingTop: "180px",
            paddingBottom: "30px",
            maxWidth: "70%"
        };

        let style_b = {
            textAlign: "center",
            PaddingTop: "40px",
            fontSize: "36px",
            color: "#8591b3"
        };

        return (
            <div className="waiting-wrap">
                <img style={style_a} src="images/working.png"/>
                <div style={style_b}>正在建设中<br/>敬请期待</div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={'敬请期待'} background={'transparent'}/>, HEADER_NODE);
    ReactDOM.render(<Waiting />, CONTENT_NODE);
});
