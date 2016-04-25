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
                {$FW.Browser.inApp() ? null : <Header title={'敬请期待'} background={'transparent'}/>}
                <img style={style_a} src={STATIC_PATH + "images/working.png"}/>
                <div style={style_b}>
                    敬请期待
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
