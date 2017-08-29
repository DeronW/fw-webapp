import React from 'react'
import CSSModules from 'react-css-modules'
import {Header} from '../../components'
import styles from '../../css/features/topic-huang-jin.css'

@CSSModules(styles, {allowMultiple: true, errorWhenNotFound: false})
class TopicGold extends React.Component{
    render(){
        return <div styleName="gold-box">
            <img src={require('../../images/features/topic-huang-jin/goldbanner.jpg')}/>
        </div>
    }
}

export default TopicGold
