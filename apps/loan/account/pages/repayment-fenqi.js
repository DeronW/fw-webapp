import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../lib/components'

// import styles from '../css/repayment-fenqi.css'


// @CSSModules(styles)
class RepaymentFenqi extends React.Component {

    state = {
        amount: '',
        duration: '',
        dueDate: ''
    }

    componentDidMount() {
        document.title = '还款明细';

    }

    fetchLoanInfo = () => {

    }

    render() {
        return <div styleName="cnt-container">
            <Header title="还款明细" />
        </div>
    }
}

export default RepaymentFenqi
