'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const Waiting = React.createClass({
    render: function () {
        let style_a = {
            display: "block",
            margin: "180px auto 30px",
            maxWidth: "70%"
        };

        let style_b = {
            textAlign: "center",
            marginTop: "40px",
            fontSize: "40px",
            color: "#8591b3"
        };

        return (
            <div>
                {$FW.Browser.inApp() ? null : <Header title={'敬请期待'}/>}
                <img style={style_a} src={STATIC_PATH + "images/working.png"}/>
                <div style={style_b}>
                    敬请期待
                </div>
            </div>
        )
    }
});

const Header = React.createClass({
    backClickHandler: function () {
        this.props.back_handler ? this.props.back_handler() : history.back();
    },
    render: function () {
        let style_a = {
            height: "100px"
        };

        let style_b = {
            position: "fixed",
            zIndex: "99",
            top: "0",
            width: "100%",
            height: "100px",
            textAlign: "center",
            lineHeight: "100px",
            fontSize: "40px"
        };

        let style_c = {
            fontFamily: "serif",
            display: "block",
            position: "absolute",
            width: "100px",
            height: "100px",
            lineHeight: "100px",
            fontSize: "40px",
            left: "0",
            top: "0"
        };

        return (
            <div style={style_a}>
                <div style={style_b}>
                    <b style={style_c} onClick={this.backClickHandler}>&lt;</b>
                    {this.props.title}
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('敬请期待');
    ReactDOM.render(<Waiting />, document.getElementById('cnt'));
});

window.onNativeMessageReceive = function (msg) {
    if (msg == 'history:back') location.href = '/';
};