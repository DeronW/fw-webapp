import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components'
import styles from '../../css/investor/remark.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Remark extends React.Component {
    state = {}

    componentDidMount() {

    }

    keepHandler = () => {

    }

    render() {
        let {history} = this.props
        return <div>
            <Header title="客户备注" history={history}/>
            <textarea name="" id="" cols="30" rows="10" placeholder="还可以输入1000字" styleName="area">
            </textarea>
            <div styleName="btnKeep" onClick={this.keepHandler}>保存</div>
        </div>
    }
}

export default Remark