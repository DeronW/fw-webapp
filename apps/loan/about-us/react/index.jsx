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
                <img className="bg" src="http://placehold.it/720x400" />
                {isWeiXin() && list()}
            </div>
        )
    }
});

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={"关于我们"} />, HEADER_NODE);
    ReactDOM.render(<UserAboutus />, CONTENT_NODE);
})
