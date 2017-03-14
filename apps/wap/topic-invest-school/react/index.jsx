const InvestSchool = React.createClass({
    getInitialState(){
        return {
            tab:'投资百科'
        }
    },
    componentDidMount(){

    },
    getBannerFun(){
        
    },
    render(){
        return <div className="investSchool">
            <img className="banner" src="" alt=""/>
        </div>
    }
});
$FW.DOMReady(function () {
    if (!$FW.Browser.inApp()) {
        ReactDOM.render(<Header title={'投资学堂'}/>, HEADER_NODE);
    }
    ReactDOM.render(<InvestSchool />,CONTENT_NODE)
});