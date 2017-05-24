class EmptyShow extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        let showstyle = this.props.isShow?"block":"none";
        return <div className="empty-box" style={{display:{showstyle}}}>
            活动即将来袭！
        </div>
    }
}
