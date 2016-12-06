const GameCenter = React.createClass({
    getInitialState: function () {
        return {
            gameList: []
        }
    },
    componentDidMount: function () {
        $FW.Ajax({
            url: `${location.protocol}//game.9888.cn/index.php?r=polymerization/gamelist&fr=shop`,//游戏中心列表
            withCredentials: true,
            success: (data) => {
                this.setState({gameList:data.list});
            }
        });
    },
    onImageClickHandler: function (index) {
        var link = null;
        var bs = this.props.bannerList;
        for (var i = 0; i < bs.length; i++) {
            if (i == index) link = bs[i].link;
        }
        link ?location.href =link: console.log('no link set');
    },
    getHeadImages: function () {
        var images = [];
        var bs = this.props.bannerList;
        for (var i = 0; i < bs.length; i++) {
            images.push(bs[i].pic)
        }
        return images;
    },
    render: function(){
        let banner;
        if (this.props.bannerList.length) {
            banner = <BannerGroup className="game-banner"
                                  images={this.getHeadImages()}
                                  onImageClick={this.onImageClickHandler}/>
        } else {
            banner = <div className="no-banner"></div>
        }
        let listDiv = (list, index)=> {
            return (<div className="removeBox" key={index}>
                    <a href={list.game_url} className="removeMain">
                        <div className="removeTitle">
                            <div className="removeTitleL">{list.game_name}</div>
                            <div className="removeTitleR">{list.tag}</div>
                        </div>
                        <div className="removeImg"><img src={list.logo}/></div>
                        <div className="removeDes">
                            <div className="removeDesL">介绍：</div>
                            <div className="removeDesR">{list.desc}</div>
                        </div>
                    </a>
                </div>
            )};
        return(
            <div className="game-center">
                {banner}
                {this.state.gameList==0 ? null : this.state.gameList.map(listDiv)}
            </div>
        );
    }
});
$FW.DOMReady(function(){
    NativeBridge.setTitle('游戏中心');
    var ua = window.navigator.userAgent.toLowerCase();
    var wxBrower=ua.match(/MicroMessenger/i) == 'micromessenger'?true:false;
    if($FW.Format.urlQuery().mallHead=="true"&&!wxBrower){
        if ($FW.Utils.shouldShowHeader())
            ReactDOM.render(<Header title={"游戏中心"} back_handler={backward}/>, document.getElementById
            ('header'));
    }
    $FW.Ajax({
        url: `${location.protocol}//game.9888.cn/index.php?r=polymerization/gamebanner&fr=shop&tag=tag1`,//banner
        withCredentials: true,
        success: (data) => {
            ReactDOM.render(<GameCenter bannerList={data.list}/>, document.getElementById('cnt'));
        }
    });
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}


