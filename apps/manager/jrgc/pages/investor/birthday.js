import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components'
import styles from '../../css/investor/birthday.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Birthday extends React.Component {

    gotoHandler = (params) => {
        let {history} = this.props
        history.push('/investor-info')
    }
    render(){
        let {history} = this.props
        return <div styleName="bg">
            <Header title="近期过生日的客户" history={history}/>
            <div styleName="birthdayList">
                <div styleName="person" onClick={()=>this.gotoHandler()}>
                    <img src={require('../../images/investor/birthday/clock.png')} />
                    <div styleName="name">大熊</div>
                    <div styleName="date">(9月20日)</div>
                    <img styleName="arrow" src={require('../../images/investor/birthday/arrow.png')} />
                    <div styleName="des">今日生日</div>
                </div>
                <div styleName="person" onClick={()=>this.gotoHandler()}>
                    <img src={require('../../images/investor/birthday/greyClock.png')} />
                    <div styleName="name">大熊</div>
                    <div styleName="date">(9月20日)</div>
                    <img styleName="arrow" src={require('../../images/investor/birthday/arrow.png')} />
                    <div styleName="des">还有11天</div>
                </div>
            </div>
            <div styleName="load">已经全部加载完毕</div>
        </div>
    }
}
export default Birthday