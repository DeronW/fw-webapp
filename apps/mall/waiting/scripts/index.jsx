'use strict';

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
            paddingBottom: "450px",
            fontSize: "36px",
            color: "#8591b3"
        };

        return (
            <div>
                {$FW.Browser.inApp() ? null : <Header title={'敬请期待'} background={'transparent'}/>}
                <BannerGroup className="xxx" autoPlay={3000} loop={true} images={[
                    'http://placehold.it/350x150',
                    'http://placehold.it/350x150',
                    'http://placehold.it/350x150',
                    'http://placehold.it/350x150'
                ]} />
                <div className="waiting-wrap">
                    <img style={style_a} src="images/working.png"/>
                    <div style={style_b}>正在建设中<br/>敬请期待</div>
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
