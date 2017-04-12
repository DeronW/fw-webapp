class UserInfoItemDisplay extends React.Component {
    render() {
        let height = '100px';
        let border = this.props.disableBorder ? "none" : "1px solid #ebeaea";
        let wrapStyle = {
            display: "inline-flex",
            position: "relative",
            marginLeft: "35px",
            width: "calc(100% - 18px)",
            height: "100px",
            backgroundColor: "#fff",
            borderBottom: border,
            color: "#515151",
            verticalAlign: "middle"
        };
        let textStyle = {
            display: "inline-block",
            height: "100%",
            lineHeight: height
        }
        let infoIconStyle = {
            display: "inline-block",
            position: "relative",
            width: "40px",
            height: "100%",
            marginRight: "18px"
        }
        let rightAlignContainerStyle = {
            display: "inline-flex",
            position: "absolute",
            right: "0",
            top: "0",
            height: "100%",
            lineHeight: height
        };
        let centerElementStyle = {
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            margin: "auto"
        };
        let rightArrowContainerStyle = {
            display: "inline-block",
            position: "relative",
            width: "96px",
            height: "100%"
        };
        let fakeArrowStyle = {
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "10px",
            width: "25px",
            height: "25px",
            margin: "auto",
            borderTop: "3px solid #ccc",
            borderLeft: "3px solid #ccc",
            WebkitTransform: "rotate(135deg)"
        };
        return (
            <div className="user-info-display-wrap" id={this.props.infoID} style={wrapStyle}>
                { this.props.iconSrc !== null &&
                  <div style={infoIconStyle}>
                      <img src={this.props.iconSrc} style={centerElementStyle}></img>
                  </div>
                }
                <span style={textStyle}>{this.props.infoNameCN}</span>
                <div style={rightAlignContainerStyle}>
                    { this.props.infoContent || this.props.infoDefaultContent !== undefined &&
                      <span style={textStyle}>{this.props.infoContent || this.props.infoDefaultContent}</span>
                    }
                    <div style={rightArrowContainerStyle}>
                        <div style={fakeArrowStyle}></div>
                    </div>
                </div>
            </div>
        )
    }
}
