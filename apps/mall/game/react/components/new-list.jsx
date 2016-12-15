const GameCenter_NewGame = React.createClass({
    render:function(){

        let newList=(list,index)=>{
            let link=(list.game_url==''||list.game_url=='#')?null:href=list.game_url
            return(
                <div className="new-game-li" key={index}>
                    <a {link} className="new-game-a"><img src={list.icon}/></a>
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
