const GameCenter_NewGame = React.createClass({
    render:function(){

        let newList=(list,index)=>{
            let link=(list.game_url.indexOf('#')<0) ?
                <a href={list.game_url} className="new-game-a"><img src={list.icon}/></a> :
                <a className="new-game-a"><img src={list.icon}/></a>;
            return(
                <div className="new-game-li" key={index}>
                    {link}
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
