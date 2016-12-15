const GameCenter_popNickNameError= React.createClass({
    popErrorBtn:function(){
        this.props.popNickName(true);
        this.props.popError(false);
    },
    render:function(){
        return(
            <div className="pop-error-box">
                <div className="pop-error">
                    <div className="pop-error-title"><img src="images/title-img-edit.png"/></div>
                    <div className="pop-error-text">{this.props.data}</div>
                    <div className="pop-error-btn" onClick={this.popErrorBtn}>确定</div>
                </div>
            </div>
            )
    }
})
