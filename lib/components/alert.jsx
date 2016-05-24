/*
 parameters
 <Alert title={'这个是标题'} confirm_text={'CONFIRM'} show_callback={} hide_callback={} />

 title 显示标题
 header Show big header text
 confirm_text 是否显示确认按钮, 及其提示文字
 show_callback 显示之后的回调
 hide_callback 隐藏之后的回调
 */

const GlobalAlert = React.createClass({
    getInitialState: function () {
        return {show: true}
    },
    hideHandler: function () {
        ReactDOM.unmountComponentAtNode(document.getElementById(this.props.id));
    },

    componentWillUnmount: function () {
        this.props.unMountHandler && this.props.unMountHandler();
    },

    render: function () {
        let fontSize = '40px';

        let style_pop = {
            position: "fixed",
            top: "0px",
            bottom: "0px",
            width: "100%",
            zIndex: '99',
            fontSize: fontSize
        };
        let style_bg = {
            position: "absolute",
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            background: "black",
            opacity: "0.3"
        };
        let _alert_style_panel = {
            display: "table",
            margin: "50% auto 0",
            position: "relative",
            width: window.innerWidth * 0.8 + "px",
            borderRadius: "8px",
            background: "white"
        };
        let style_close = {
            display: "none",
            position: "absolute",
            top: "-20px",
            right: "-20px",
            width: "40px",
            height: "40px",
            fontSize: "35px",
            background: 'white',
            borderRadius: '50%',
            textAlign: 'center',
            lineHeight: '40px',
            border: '5px solid #aaa',
            fontWeight: 'bold'
        };
        let style_text = {
            textAlign: "left",
            margin: "20px auto",
            fontSize:"24px",
            lineHeight:"40px",
            color:"#555555",
            padding: "0 36px"
        };
        let style_confirm = {
            display: "block",
            float: "left",
            width: window.innerWidth * 0.3 + "px",
            textAlign: "center"
        };
        let style_cancel = {
            display: "block",
            float: "right",
            width: window.innerWidth * 0.3 + "px",
            textAlign: "center"
        };
        let style_one_big = {
            display: "block",
            width: "92%",
            height: "80px",
            lineHeight: "80px",
            textAlign: "center",
            color: "white",
            background: "#f9655a",
            borderRadius: '8px',
            margin: '10px auto 20px'
        };
        let style_header = {
            width:"610px",
            height:"100px",
            fontSize:"32px",
            color:"#333333",
            lineHeight:"100px",
            borderBottom:"1px solid #d8d8d8",
            backgroundColor:"#eee",
            paddingLeft:"38px"
        };
        let title_index = {
            width:"36px",
            display:"inline-block",
            float:"left"
        };
        let title_content = {
            width:"540px",
            display:"inline-block",
            float:"left"
        };
        let title_wrap = {
            clear:"both",
            overflow:"hidden"
        };

        if (!this.state.show) return null;

        let title = null;
        if(this.props.title instanceof Array){
            title = <div> {this.props.title.map((i, index)=><div key={index} style={title_wrap}><span style={title_index}>{index}、</span><span style={title_content}>{i}</span></div>)} </div> ;
        } else {
            title = this.props.title || 'YO'
        }

        let header = null;
        if(this.props.header) {
            header =  <div style={style_header}>{this.props.header}</div>
        }

        return (
            <div style={style_pop}>
                <div style={style_bg} onClick={this.hideHandler}></div>
                <div className="_alert_style_panel" style={_alert_style_panel}>
                    <div style={style_close} onClick={this.hideHandler}>&times;</div>
                    {header}
                    <div style={style_text}>{title}</div>
                    {this.props.confirm_text && !this.props.cancel_btn ?
                        <a style={style_one_big} onClick={this.hideHandler}>{this.props.confirm_text}</a> : null}
                    {this.props.confirm_btn ? <a style={style_confirm} onClick={this.hideHandler}>CONFIRM</a> : null}
                    {this.props.cancel_btn ? <a style={style_cancel} onClick={this.hideHandler}>CANCEL</a> : null}
                </div>
            </div>
        )
    }
});
