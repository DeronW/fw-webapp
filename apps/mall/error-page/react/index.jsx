'use strict';

const API_PATH = document.getElementById('api-path').value;

const Waiting = React.createClass({
    getInitialState: function () {
        return {}
    },
    render: function () {
        let style_a = {
            display: "block",
            margin: "180px auto 30px",
            maxWidth: "70%"
        };

        let style_b = {
            textAlign: "center",
            marginTop: "10px",
            fontSize: "40px",
            color: "#8591b3"
        };

        return (
            <div>
                <Header title={'页面异常'}/>
                <img style={style_a} src="images/404.png"/>
                <br />
                <div style={style_b}>豆哥生病了</div>
                <div style={style_b}>页面加载不出来啦!</div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('页面异常');
    ReactDOM.render(<Waiting />, document.getElementById('cnt'));
});