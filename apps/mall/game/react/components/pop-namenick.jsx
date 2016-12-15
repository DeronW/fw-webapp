const GameCenter_popNickname = React.createClass({
    getInitialState: function () {
        return {
            value:'',
        }
    },
    popNickConfirm:function(){
        $FW.Ajax({
            url: `${location.protocol}//game.9888.cn/index.php?r=polymerization/setnick`,//设置昵称
            withCredentials: true,
            method:'post',
            data:{nick:this.state.value},
            complete: (data) => {
                console.log(data);
                if(data.code==10000){
                    this.props.popNickName(false);
                    this.props.setNameNick(this.state.value)
                }else{
                    this.props.popNickName(false);
                    this.props.popError(true);
                    this.props.popErrorMessage(data.message);
                }

            }
        });
    },
    popNickCancel:function(){
        this.props.popNickName(false);
    },
    changeHandler: function (e) {
        this.setState({value: e.target.value})
    },
    render :function(){
        return (
            <div className="pop-nickname-box">
                <div className="pop-nickname">
                    <div className="pop-nickname-title"><img src="images/title-img-edit.png"/></div>
                    <div className="nickname-input"><input placeholder="请输入昵称" value={this.state.value} maxLength="12" onChange={this.changeHandler} /></div>
                    <div className="nickname-tip">不超过12字符，支持中英文、数字</div>
                    <div className="nickname-btn">
                        <div className="nickname-cancel" onClick={this.popNickCancel}>取消</div>
                        <div className="nickname-confirm" onClick={this.popNickConfirm}>确定</div>
                    </div>
                </div>
            </div>
        )
    }})
