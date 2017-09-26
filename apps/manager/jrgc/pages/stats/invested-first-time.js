import React from 'react'
import CSSModules from 'react-css-modules'
import { inject, observer } from 'mobx-react'

import { Header } from '../../components'

import styles from '../../css/stats/invested-first-time.css'


const TABS = { '1': '当天', '2': '7 天', '3': '30 天', '4': '半年' };


@inject('stats_investor')
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class InvestedFirstTime extends React.Component {

    render() {
        const { history } = this.props;

        return <div>
            <Header title={`首投客户`} history={history} />
        </div>
    }

}

export default InvestedFirstTime