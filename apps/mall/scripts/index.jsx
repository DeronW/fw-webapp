var Carousel = React.createClass({
    render: function () {
        return (
            <ReactSwipe>
                <div>'PANE 1'</div>
                <div>'PANE 2'</div>
                <div>'PANE 3'</div>
                <div>'PANE 3'</div>
            </ReactSwipe>
        );
    }
});

ReactDOM.render(<Carousel />, document.getElementById('cnt'));