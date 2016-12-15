const GameCenter_NewGame = React.createClass({
    render:function(){
        let newList=(list,index)=>{
            return(
                <div className="new-game-li" key={index}>
                    <a href={list.game_url} className="new-game-a"><img src={list.icon}/></a>
                    <div className="new-game-text">{list.game_name}</div>
                </div>
            )
        }
        return(
            <div className="new-game">
                {this.props.data.map(newList)}
            </div>
        )
    }
})
