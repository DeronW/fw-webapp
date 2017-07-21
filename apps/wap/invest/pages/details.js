import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import Header from '../components/header'
import styles from '../css/details.css'

@inject('details')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Details extends React.Component {
    render() {
        let {details} = this.props
        return <div>
            <Header title="详情" history={history}/>
            <div styleName="top-info">
                {details.invest_term}
            </div>
        </div>
    }
}
export default Details
