import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header } from '../../components'

import styles from '../../css/investor/calendar.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Calendar extends React.Component {
    render(){
        let { history } = this.props
        return <div styleName="bg">
            <Header title="回款日历" history={history}/>

        </div>
    }
}
export default Calendar