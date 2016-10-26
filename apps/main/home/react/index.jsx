const API_PATH = document.getElementById('api-path').value;

const Content = React.createClass({
    render: function () {
        return (
            <div>
                <StatusBar />
                <Project />
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Content />, document.getElementById('cnt'));
});