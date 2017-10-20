import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../../components'

import styles from '../../css/user/level.css'


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Level extends React.Component {

    componentDidMount() {
        document.title = '会员等级'
    }

    render() {
        return <div>
            <Header title="会员等级" history={this.props.history} />

        </div>
    }

}

export default Level