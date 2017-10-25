import React from 'react'
import CSSModules from 'react-css-modules'
import {Header} from '../components'

class Home extends React.Component {
    render() {
        let {history} = this.props
        return <div>
            <Header title="现金大师" history={history}/>
            this is Cash Monster page.
        </div>
    }
}

export default Home