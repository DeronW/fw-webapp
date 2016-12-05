const GameCenter = React.createClass({
    getInitialState: function () {
        return {
            list: [1,2],
            bannerList: [{
                img:"http://game.9888.cn/upload/banner/2016/12/02/584116d0ad9ff.jpg",
                link:"http://mmall.9888.cn/static/mall/zhuanpan20161024/index.html"
            }]
        }
    },
    onImageClickHandler: function (index) {
        var link = null;
        var bs = this.state.bannerList;
        for (var i = 0; i < bs.length; i++) {
            if (i == index) link = bs[i].link;
        }
        link ?location.href =link: console.log('no link set');
    },
    getHeadImages: function () {
        var images = [];
        var bs = this.state.bannerList;
        for (var i = 0; i < bs.length; i++) {
            images.push(bs[i].img)
        }
        return images;
    },
    render: function(){
        let banner;
        if (this.state.bannerList.length) {
            banner = <BannerGroup className="game-banner"
                                  images={this.getHeadImages()}
                                  onImageClick={this.onImageClickHandler}/>
        } else {
            banner = <div className="no-banner"></div>
        }
        let listdiv= (list, index)=> {
            return (
                <div className="removeBox" key={index}>
                    <a href="http://game.9888.cn/index.php?r=games/game-notice&gameNo=0pn5m" className="removeMain">
                        <div className="removeTitle">
                            <div className="removeTitleL">我们爱消除</div>
                            <div className="removeTitleR">消除|休闲</div>
                        </div>
                        <div className="removeImg"><img src="http://game.9888.cn/upload/game_logo/2016/12/02/58410d99442af.jpg" /></div>
                        <div className="removeDes">
                            <div className="removeDesL">介绍：</div>
                            <div className="removeDesR">高清游戏画面和全新的游戏体验带来无限欢乐，操作方法简单上手，让你沉浸在消除的世界里停不下来！</div>
                        </div>
                    </a>
                </div>
            )};
        return(
            <div className="game-center">
                {banner}
                {this.state.list.map(listdiv)}

            </div>
        );
    }
});

$FW.DOMReady(function(){
    NativeBridge.setTitle('游戏中心');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"游戏中心"} back_handler={backward}/>, document.getElementById('header'));
    ReactDOM.render(<GameCenter/>, document.getElementById('cnt'));
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}


