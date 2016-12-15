const GameCenter_AllGame=React.createClass({
    render:function(){
        let allList=(list,index)=>{
            return(
                <div className="all-game-li" key={index}>
                    <div className="game-img"><img src={list.logo}/></div>
                    <div className="game-up-img"></div>
                    <div className="game-name">{list.game_name}</div>
                    <div className="game-desc">{list.tag}</div>
                </div>
            )
        }
        return(
            <div className="all-game">
                {this.props.data.map(allList)}
            </div>
        )
    }
    })
