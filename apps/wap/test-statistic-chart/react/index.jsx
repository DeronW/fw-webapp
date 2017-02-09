const Chart = React.createClass({
    render:function(){
        return (
            <div>
                <PieChart percent={50} percent2={50} radius={150}/>
            </div>
        )
    }
});
$FW.DOMReady(function () {
    ReactDOM.render(<Chart/>, CONTENT_NODE);
});
