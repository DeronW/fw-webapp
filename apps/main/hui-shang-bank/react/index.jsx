var Body = React.createClass({
    render: function() {
        return (
            <HeadNav />
        );
    }
});

var HeadNav = React.createClass({
    render: function() {
        return (
            <div className="head-nav">

            </div>
        );
    }
});


ReactDOM.render(
    <Body />,

    document.getElementById("cnt")
);

