let head=this.state.isLogin?<div className="game-head-login">
    <div className="avatar"><img src={this.state.avatar} onClick={()=>{this.popNickName(true)}}/></div>
    <div className="name-box">
        <div className="nickname-title">游戏昵称</div>
        <div className="nickname">{this.state.nameNick}</div>
    </div>
    <div className="login-btn">设置昵称</div>
</div>:
<div className="game-head-unlogin">
    <div className="avatar"><img src="images/头像00.png" /></div>
    <div className="name-box">
        <div className="nickname-title">游戏昵称</div>
        <div className="nickname">未登录</div>
        </div>
    <div className="unlogin-btn">登录设置昵称</div>
</div>
