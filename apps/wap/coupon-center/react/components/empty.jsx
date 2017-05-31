class EmptyShow extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let showstyle = this.props.isShow ? "block" : "none";
        return <div className="empty-box" style={{ display: { showstyle } }}>
            <img src="images/icon-empty.png" />
            <div className="empty_text">一大波“优惠券”即将来袭</div>
        </div>
    }
}
