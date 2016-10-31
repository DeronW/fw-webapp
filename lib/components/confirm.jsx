/*
 */

const GlobalConfirm = React.createClass({
    componentWillUnmount: function () {
        this.props.unMountConfirm && this.props.unMountConfirm();
    },
    confirmHandler: function () {
        this.props.confirmCallback && this.props.confirmCallback();
        ReactDOM.unmountComponentAtNode(document.getElementById(this.props.id));
    },
    clearHandler: function() {
        ReactDOM.unmountComponentAtNode(document.getElementById(this.props.id));
    },
    render: function () {
        let popStyle = {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "10000"
        };

        let popBack = {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        };

        let popCnt = {
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "536px",
            height: "260px",
            margin: "-100px 0 0 -300px",
            padding: "0 32px",
            backgroundColor: "#fff",
            borderRadius: "5px",
            textAlign: "center"
        };

        let popInfo = {
            display: "table",
            width: "100%",
            height: "100px",
            padding: "20px 0"
        };

        let popInfoP = {
            display: "table-cell",
            verticalAlign: "middle",
            margin: "0",
            lineHeight: "36px",
            fontSize: "28px"
        };

        let popBtnBtn = {
            width: "248px",
            height: "74px",
            fontSize: "30px",
            lineHeight: "74px",
            color: "#fff",
            borderRadius: "5px"
        };

        let popBtnCancelBtn = {
            backgroundColor: "#8296af",
            float: "left"
        };

        let popBtnConfirmBtn = {
            backgroundColor: "#fd4c4e",
            float: "right"
        };

        let _style_cancel = Object.assign({}, popBtnBtn, popBtnCancelBtn);
        let _style_confirm = Object.assign({}, popBtnBtn, popBtnConfirmBtn);

        return (
            <div style={popStyle}>
                <div style={popBack}></div>
                <div style={popCnt}>
                    <div style={popInfo}>
                        <p style={popInfoP}>{this.props.title}</p>
                    </div>
                    <div>
                        <div style={_style_cancel} onClick={this.clearHandler}> 取消</div>
                        <div style={_style_confirm} onClick={this.confirmHandler}> 确认</div>
                    </div>
                </div>
            </div>
        )
    }
});

GlobalConfirm.propTypes = {
    title: React.PropTypes.string.isRequired,
    confirmCallback: React.PropTypes.func
};