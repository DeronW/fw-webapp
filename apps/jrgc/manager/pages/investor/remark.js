import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components'
import styles from '../../css/investor/remark.css'

@inject('investor')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Remark extends React.Component {
    state = {
        value:''
    }
    changeHandler = (e) => {
        this.setState({value:e.target.value})
    }
    keepHandler = () => {
        this.props.investor.editRemark(this.state.value)
    }

    render() {
        let {history} = this.props
        let { value } =this.state
        return <div>
            <Header title="客户备注" history={history}/>
            <textarea name="" id="" cols="30" rows="10"  placeholder="还可以输入1000字"
                styleName="area"
                value={value}
                onChange={this.changeHandler}>
            </textarea>
            <div styleName="btnKeep" onClick={this.keepHandler}>保存</div>
        </div>
    }
}

export default Remark