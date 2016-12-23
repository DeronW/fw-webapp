const GameCenter_AllGame=React.createClass({
    render:function(){
        let allList=(list,index)=>{
            let link=(list.game_url.indexOf('#')<0)?
                <a className="game-up-img" href={list.game_url}></a>:
                <a className="game-up-img"></a>
            return(
                <div className="all-game-li" key={index}>
                    <div className="game-img"><img src={list.logo}/></div>
                    {link}
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
