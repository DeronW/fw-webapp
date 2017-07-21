import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import styles from '../css/my-reserve.css'
import Header from '../components/header'

@inject('myreserve')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class MyReserve extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <Header title="我的预约" history={history}/>
        </div>
    }
}

export default MyReserve