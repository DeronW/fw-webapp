const GameCenter_popAvatar= React.createClass({
    getInitialState: function () {
        return {
            index:0
        }
    },
    selectedHandler:function(index){
        this.setState({index:index});
    },
    confirmAvatar:function(url){
        $FW.Ajax({
            url: `${location.protocol}//game.9888.cn/index.php?r=polymerization/seticon`,//确认头像
            method:'post',
            data:{
                icon:url,
                token:gameToken
            },
            withCredentials: true,
            success: (data) => {
                this.props.setAvatar(url);
                this.props.setPopAvatar(false);
            }
        });
    },
    render:function(){
        let list=(list,index)=>{
            return (
                <div className="pop-avatar-li" onClick={()=>{this.selectedHandler(index)}}>
                    <img src={list}/>
                    <div className={index==this.state.index?"avatar-selected":""}></div>
                </div>
            )
            }
        return(
            <div className="pop-avatar-box">
                <div className="pop-avatar">
                    <div className="pop-avatar-title"><img src="images/title-img-avatar.png"/></div>
                    <div className="pop-avatar-ul">
                        {this.props.data.list.map(list)}
                    </div>
                    <div className="pop-avatar-btn" onClick={()=>{this.confirmAvatar(this.props.data.list[this.state.index])}}>确定</div>
                </div>
            </div>
        )
    }

})
