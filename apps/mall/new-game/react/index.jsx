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
        return(
            <div className="game-center">
                <div className="game-head-login">
                   <div className="avatar"><img src="" /></div>
                    <div className="name-box">
                        <div className="nickname-title">游戏昵称</div>
                        <div className="nickname">未登录</div>
                    </div>
                    <div className="login-btn">设置昵称</div>
                </div>
                <div className="game-head-unlogin">
                    <div className="avatar"><img src="" /></div>
                    <div className="name-box">
                        <div className="nickname-title">游戏昵称</div>
                        <div className="nickname">未登录</div>
                    </div>
                    <div className="unlogin-btn">登录设置昵称</div>
                </div>
                {banner}
                <div className="new-game">
                    <div className="new-game-li">
                        <a href="#" className="new-game-a"><img src=""/> </a>
                        <div className="new-game-text">我们爱战斗</div>
                    </div>
                    <div className="new-game-li">
                        <a href="#" className="new-game-a"><img src=""/> </a>
                        <div className="new-game-text">我们爱战斗</div>
                    </div>
                    <div className="new-game-li">
                        <a href="#" className="new-game-a"><img src=""/> </a>
                        <div className="new-game-text">我们爱战斗</div>
                    </div>
                    <div className="new-game-li">
                        <a href="#" className="new-game-a"><img src=""/> </a>
                        <div className="new-game-text">我们爱战斗</div>
                    </div>
                </div>
                <div className="all-game">
                    <div className="all-game-li">
                        <div className="game-img"><img src=""/></div>
                        <div className="game-up-img"></div>
                        <div className="game-name">我们爱战斗</div>
                        <div className="game-desc">飞行 | 射击</div>
                    </div>
                    <div className="all-game-li">
                        <div className="game-img"><img src=""/></div>
                        <div className="game-up-img"></div>
                        <div className="game-name">我们爱战斗</div>
                        <div className="game-desc">飞行 | 射击</div>
                    </div>
                    <div className="all-game-li">
                        <div className="game-img"><img src=""/></div>
                        <div className="game-up-img"></div>
                        <div className="game-name">我们爱战斗</div>
                        <div className="game-desc">飞行 | 射击</div>
                    </div>
                    <div className="all-game-li">
                        <div className="game-img"><img src=""/></div>
                        <div className="game-up-img"></div>
                        <div className="game-name">我们爱战斗</div>
                        <div className="game-desc">飞行 | 射击</div>
                    </div>
                </div>
                <div className="pop-error-box">
                    <div className="pop-error">
                        <div className="pop-error-text">昵称被占啦，再开脑洞起一个吧！</div>
                        <div className="pop-error-btn">确定</div>
                    </div>
                </div>
                <div className="pop-nickname-box">
                    <div className="pop-nickname">
                        <div className="pop-nickname-title"><img src=""/></div>
                        <div className="nickname-input"><input placeholder="请输入昵称" value='' /></div>
                        <div className="nickname-tip">不超过12字符，支持中英文、数字</div>
                        <div className="nickname-btn">
                            <div className="nickname-cancel">取消</div>
                            <div className="nickname-confirm">确定</div>
                        </div>
                    </div>
                </div>
                <div className="pop-avatar-box">
                    <div className="pop-avatar">
                        <div className="pop-avatar-title"><img src=""/></div>
                        <div className="pop-avatar-ul">
                            <div className="pop-avatar">
                                <img src=""/>
                                <div className="avatar-selected"></div>
                            </div>
                            <div className="pop-avatar">
                                <img src=""/>
                                <div className="avatar-unselected"></div>
                            </div>
                            <div className="pop-avatar">
                                <img src=""/>
                                <div className="avatar-unselected"></div>
                            </div>
                            <div className="pop-avatar">
                                <img src=""/>
                                <div className="avatar-unselected"></div>
                            </div>
                            <div className="pop-avatar">
                                <img src=""/>
                                <div className="avatar-unselected"></div>
                            </div>
                            <div className="pop-avatar">
                                <img src=""/>
                                <div className="avatar-unselected"></div>
                            </div>
                            <div className="pop-avatar">
                                <img src=""/>
                                <div className="avatar-unselected"></div>
                            </div>
                            <div className="pop-avatar">
                                <img src=""/>
                                <div className="avatar-unselected"></div>
                            </div>
                            <div className="pop-avatar">
                                <img src=""/>
                                <div className="avatar-unselected"></div>
                            </div>
                            <div className="pop-avatar">
                                <img src=""/>
                                <div className="avatar-unselected"></div>
                            </div>
                        </div>
                        <div className="pop-error-btn">确定</div>
                    </div>
                </div>
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
    // $FW.Ajax({
    //     url: `${location.protocol}//game.9888.cn/index.php?r=polymerization/gamebanner&fr=shop&tag=tag1`,//banner
    //     withCredentials: true,
    //     success: (data) => {
            ReactDOM.render(<GameCenter bannerList={[]}/>, document.getElementById('cnt'));
    //     }
    // });
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/static/mall/new-home/index.html'
}


