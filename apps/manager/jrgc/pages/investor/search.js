import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header,BottomNavBar} from '../../components'
import styles from '../../css/investor/search.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Search extends React.Component{
    render(){
        let {history} = this.props
        return <div styleName="bg">
            <Header title="搜索客户" history={history}/>
        </div>
    }
}
export default Search