import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import Header from '../components/header'
import styles from '../css/details.css'

@inject('reserve')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Details extends React.Component {

    componentDidMount(){
        this.props.reserve.reserveHandler()
    }
    render() {
        let {details} = this.props
        return <div>
            <Header title="详情" history={history}/>
            <div styleName="top-info">
                {/*reserve.invest_term*/}
            </div>
        </div>
    }
}
export default Details
