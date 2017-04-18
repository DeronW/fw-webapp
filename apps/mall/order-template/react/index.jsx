const Form = React.createClass({
    render: function () {
        let hash = location.hash.splice(6)
        return (
            <div>
                {document.write(hash)}
            </div>
        )
    }
});


$FW.DOMReady(function () {
            ReactDOM.render(<Form />, CONTENT_NODE);
});

