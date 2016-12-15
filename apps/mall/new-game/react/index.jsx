const GameCenter = React.createClass({
    getInitialState: function () {
        return {
            allList: [],
            newList:[],
            bannerList:[],
            avatarList:[],
            isLogin:this.props.data.login_status==1?true:false,
            popNameNick:false,
            nameValue:'',
            popAvatar:false,
            popError:false,
            avatar:this.props.data.login_status==1?this.props.data.list.user_icon:'',
            nameNick:this.props.data.login_status==1?this.props.data.list.nickname:'',
            errorMessage:''
        }
    },
    componentDidMount: function () {
        $FW.Ajax({
            url: `${location.protocol}//game.9888.cn/index.php?r=polymerization/gamelist&fr=shop`,//游戏中心所有列表
            withCredentials: true,
            success: (data) => {
                this.setState({allList:data.list});
            }
        });
        $FW.Ajax({
            url: `${location.protocol}//game.9888.cn/index.php?r=polymerization/newst`,//游戏中心最新游戏
            withCredentials: true,
            success: (data) => {
                this.setState({newList:data.list});
            }
        });
        $FW.Ajax({
            url: `${location.protocol}//game.9888.cn/index.php?r=polymerization/gamebanner&fr=shop&tag=tag1`,//banner
            withCredentials: true,
            success: (data) => {
                this.setState({bannerList:data.list});
            }
        });
    },
    clickAvatarHandler:function(){
        $FW.Ajax({
            url: `${location.protocol}//game.9888.cn/index.php?r=polymerization/uicons`,//获取头像列表
            withCredentials: true,
            success: (data) => {
                this.setState({
                    popAvatar:true,
                    avatarList:data
                });
            }
        });
    },
    popNickName:function(a){
        this.setState({
            popNameNick:a
        });
    },

    setAvatar:function(state){
        this.setState({
            avatar:state
        });
    },
    setPopAvatar:function(state){
        this.setState({
            popAvatar:state
        });
    },
    onImageClickHandler: function (index) {
        var link = null;
        var bs = this.state.bannerList;
        for (var i = 0; i < bs.length; i++) {
            if (i == index) link = bs[i].link;
        }
        link ?location.href =link: console.log('no link set');
    },
    popError:function(a){
        this.setState({
            popError:a
        });
    },
    setNameNick:function(a){
    this.setState({
        nameNick:a
    });
},
    setErrorMessage:function(msg){
        this.setState({
            errorMessage:msg
        });
    },
    getHeadImages: function () {
        var images = [];
        var bs = this.state.bannerList;
        for (var i = 0; i < bs.length; i++) {
            images.push(bs[i].pic)
        }
        return images;
    },
    render: function(){
        let head=this.state.isLogin?<div className="game-head-login">
            <div className="avatar"><img src={this.state.avatar} onClick={()=>{this.clickAvatarHandler}}/></div>
            <div className="name-box">
                <div className="nickname-title">游戏昵称</div>
                <div className="nickname">{this.state.nameNick}</div>
            </div>
            <div className="login-btn" onClick={()=>{this.popNickName(true)}}>设置昵称</div>
        </div>:
            <div className="game-head-unlogin">
                <div className="avatar"><img src="images/头像00.png" /></div>
                <div className="name-box">
                    <div className="nickname-title">游戏昵称</div>
                    <div className="nickname">未登录</div>
                </div>
                <div className="unlogin-btn" onClick={$FW.Utils.loginMall}>登录设置昵称</div>
            </div>
        return(
            <div className="game-center">
                {head}
                {this.state.bannerList.length>0?<BannerGroup className="game-banner"
                                                       images={this.getHeadImages()}
                                                       onImageClick={this.onImageClickHandler}/>:null}
                {this.state.newList.length>0?<GameCenter_NewGame data={this.state.newList}/>:null}
                {this.state.allList.length>0?<GameCenter_AllGame data={this.state.allList}/>:null}
                {this.state.popError?<GameCenter_popNickNameError data={this.state.errorMessage} popNickName={this.popNickName}/>:null}
                {this.state.popNameNick?<GameCenter_popNickname setNameNick={this.setNameNick} popNickName={this.popNickName} popError={this.popError} popErrorMessage={this.setErrorMessage} />:null}
                {this.state.popAvatar?<GameCenter_popAvatar setAvatar={this.setAvatar} setPopAvatar={this.setPopAvatar} data={this.state.avatarList}/>:null}
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
        url: `${location.protocol}//game.9888.cn/index.php?r=polymerization/getuinfo`,//判断登录状态
        withCredentials: true,
        success: (data) => {
            ReactDOM.render(<GameCenter data={data} />, document.getElementById('cnt'));
        }
    });
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/static/mall/new-home/index.html'
}

