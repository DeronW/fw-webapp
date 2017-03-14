function gotoHandler(link, need_login) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
    if ($FW.Browser.inApp()) {
        NativeBridge.goto(link, need_login)
    } else {
        location.href = encodeURI(link);
    }
}

const InvestSchool = React.createClass({
    getInitialState(){
        return {
            tab: '投资百科',
            banner: '',
            listData: []
        }
    },
    componentDidMount(){
        this.getBannerFun();
        this.getListHandler(38);
    },
    getBannerFun(){
        $FW.Ajax({
            url: 'https://fore.9888.cn/cms/api/appbanner.php',
            type: 'get',
            data:{
                key:'0ca175b9c0f726a831d895e',
                id:41
            },
            dataType: 'json',
            fail: ()=>true,
            complete: data => {
                this.setState({banner: data[0].thumb})
            }
        });
    },
    toggleTabHandler(t){
        this.setState({tab: t});
        if (t == "投资百科") {
            this.getListHandler(38)
        } else if (t == "投资者技巧") {
            this.getListHandler(39)
        } else {
            this.getListHandler(40)
        }
    },
    getListHandler(id){
        $FW.Ajax({
            url: 'https://fore.9888.cn/cms/api/appbanner.php',
            type: 'get',
            data: {
                key:'0ca175b9c0f726a831d895e',
                id: id
            },
            fail: ()=>true,
            complete: (data)=>this.setState({listData: data})
        })
    },
    render(){
        let tab = (t, i)=> {
            return <div className="tabBlock" key={i} onClick={()=>this.toggleTabHandler(t)}>
                <em className={this.state.tab==t?"tab selected":'tab'}>{t}</em>
            </div>
        };
        return <div className="investSchool">
            <img className="banner" src={this.state.banner} alt=""/>

            <div className="tabGroup">
                {
                    ["投资百科", "投资者技巧", "投资讲堂"].map(tab)
                }
                <i className="dashed1"></i>
                <i className="dashed2"></i>
            </div>
            <div className="space"></div>
            {
                <InvestSchool.List listData={this.state.listData}/>
            }
        </div>
    }
});
InvestSchool.List = React.createClass({
    render(){
        let cell = (item, index)=> {
            return <div className="cell" key={index} onClick={()=>gotoHandler(item.url)}>
                <div className="cellText">{item.desc}</div>
                <img className="iconArrow" src="images/arrow.png"/>
            </div>
        };
        return <div className="list">
            {
                this.props.listData.map(cell)
            }
        </div>
    }
});
$FW.DOMReady(function () {
    if (!$FW.Browser.inApp()) {
        ReactDOM.render(<Header title={'投资学堂'}/>, HEADER_NODE);
    }
    ReactDOM.render(<InvestSchool />, CONTENT_NODE)
});