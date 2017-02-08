function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) === 'micromessenger'
}

const UserAboutus = React.createClass({
    getInitialState() {
        return {

        }
    },
    render() {
        let list = () => {
            return <div className="about-us-list">
                <div className="li">
                    <div className="l">
                        <span className="icon"></span>
                        <span className="text">asfd</span>
                    </div>
                    <div className="r">
                        <span className="icon"></span>
                        <span className="text">124124</span>
                    </div>
                </div>
            </div>
        }

        return (
            <div className="user-about-us-cnt">
                <div className="top-cnt"> </div>
                {isWeiXin() ? list() : null}
            </div>
        )
    }
});

$FW.DOMReady(() => {
    ReactDOM.render(<UserAboutus />, CONTENT_NODE);
})
