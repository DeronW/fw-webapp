const Play = React.createClass({
    getInitialState: function () {
        return {
            bagList: [0,0,1],
        }
    },
    componentDidMount: function () {
    },
    render: function () {

        return (
            <div className="red-cnt">
                {<RemainTime/>}
                <div className="red-bag-ul">
                    {<RedBag />}
                </div>
            </div>
        );
    }
});




