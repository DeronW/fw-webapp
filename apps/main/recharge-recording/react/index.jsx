const API_PATH = document.getElementById("api-path").value;

const Recording = React.createClass({
    getInitialState: function () {
        return {
            list: []
        }
    },
    componentDidMount: function () {
        this.loadHandler();
    },
    loadHandler: function () {
        $FW.Ajax({
            url: API_PATH + "",
            success: function (data) {
                var list = this.state.list;
                list = list.concat(data);
                this.setState({list: list})
            }.bind(this)
        })
    },
    render: function () {

        let record = (i, index) => {
            return (
                <div key={index}>
                    {i.toString()}
                </div>
            )
        };
        return (
            <div>
                {this.state.list.map(record)}
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"充值记录"}/>, document.getElementById('header'));
    ReactDOM.render(<Recording data={data}/>, document.getElementById("cnt"));
});