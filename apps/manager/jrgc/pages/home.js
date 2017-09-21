import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import { Header,BottomNavBar } from '../components';
import styles from '../css/home.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Home extends React.Component {

    render() {
        let history = this.props
        return <div>
            <Header title="我的" history={history} />
            <div>Home</div>
            <BottomNavBar history={history}/>
        </div>
    }
}
export default Home