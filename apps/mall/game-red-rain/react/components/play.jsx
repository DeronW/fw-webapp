const Play = React.createClass({
    getInitialState: function () {
        return {
            bagList: [
                    { type:0,checked:false},
                    { type:0,checked:false},
                    { type:0,checked:false},
                    { type:0,checked:false},
                    { type:0,checked:false}
                ]
        }
    },
    componentDidMount: function () {
        let appendNewLi=()=>{
            setTimeout(()=>{
                let newbagList=this.state.bagList.concat([{type:0,checked:false}]);
                this.setState({
                    bagList:newbagList
                });
                if(this.state.bagList.length<90){
                    appendNewLi();
                }
            },100)
        };
        appendNewLi();
    },
    clickRedBag:function(index){
        let newli;
        newli=this.state.bagList;
        console.log("click"+this.props.finished);
        if(!newli[index].checked&&!this.props.finished){getRedNUM++}
        console.log(getRedNUM);
        newli[index].checked=true;
        this.setState({
            bagList:newli
        });
    },
    render: function () {
        let li=(value,index)=>{
            return(
                <A/>
            )
        }
        return (
            <div className="red-cnt">
                {<RemainTime setFinished={this.props.setFinished}/>}
                <div className="red-bag-ul">
                    {this.state.bagList.map(li)}

                </div>
            </div>
        );
    }
});




