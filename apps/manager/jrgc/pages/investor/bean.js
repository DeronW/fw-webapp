import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header, BottomNavBar} from '../../components'
import styles from '../../css/investor/bean.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Bean extends React.Component {
    render() {
        let {history} = this.props
        return <div>
            <Header title="他的工豆" history={history}/>
        </div>
    }
}

export default Bean