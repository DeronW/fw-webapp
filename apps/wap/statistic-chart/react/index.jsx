const Chart = React.createClass({
    render:function(){
        return (
            <div>
                <PieChart percent={5} radius={150}/>
            </div>
        )
    }
});
$FW.DOMReady(function () {
    ReactDOM.render(<Chart/>, document.getElementById('cnt'));
});
