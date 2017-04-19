const Form = React.createClass({
    render: function () {
        let query = $FW.Format.urlQuery();
        return (
            <div>{query.form}</div>
        )
    }
});


$FW.DOMReady(function () {
            ReactDOM.render(<Form />, CONTENT_NODE);
});

