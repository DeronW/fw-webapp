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
                console.log(newbagList);
                this.setState({
                    bagList:newbagList
                });
                appendNewLi();
            },100)
        };
        appendNewLi();
    },
    clickRedBag:function(index){
        let newli;
        newli=this.state.bagList;
        newli[index].checked=true;
        this.setState({
            bagList:newli
        });
    },
    render: function () {
        let li=(value,index)=>{
            return(
                <div className={value.checked?"clicked red-bag-li red-bag-li"+index%2:"red-bag-li red-bag-li"+index%2} key={index}  onClick={()=>{this.clickRedBag(index)}}>
                    <div className="red-bag-text" >+1</div>
                    <div className="red-bag-img"><img src="images/list-img1.png" /></div>
                </div>
                )
        }
        return (
            <div className="red-cnt">
                {<RemainTime/>}
                <div className="red-bag-ul">
                    {this.state.bagList.map(li)}
                </div>
            </div>
        );
    }
});




