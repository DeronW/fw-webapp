import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header } from '../../components'
import styles from '../../css/investor/birthday.css'

@inject('investor')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Birthday extends React.Component {
    componentDidMount() {
        let { fetchBirthday } = this.props.investor
        fetchBirthday()
    }
    gotoHandler = (id) => {
        let { history } = this.props
        history.push(`/investor-info?id=${id}`)
    }

    render() {
        let { history } = this.props
        let { birthday } = this.props.investor.data

        let birFn = (item, index) => {
            let src = item.countDown == 0 ? require('../../images/investor/birthday/clock.png') : require('../../images/investor/birthday/greyClock.png')
            let count = item.countDown == 0 ? '今日生日' : `还有${item.countDown}天`

            return <div styleName="person" onClick={() => this.gotoHandler(item.custId)}>
                <img src={src} />
                <div styleName="name">{item.realName}</div>
                <div styleName="date">({item.birthday})</div>
                <img styleName="arrow" src={require('../../images/investor/birthday/arrow.png')} />
                <div styleName="des">count</div>
            </div>
        }
        let empty = <div styleName="empty">
            <img src={require('../../images/investor/empty.png')} />
        </div>
        return <div styleName="bg">
            <Header title="近期过生日的客户" history={history} />
            {birthday.list && birthday.list.length > 0 ? <div styleName="birthdayList">
                {birthday.list.map(birFn)}
                {birthday.list.length > 0 && <div styleName="load">已经全部加载完毕</div>}
            </div> : empty}

        </div>
    }
}
export default Birthday