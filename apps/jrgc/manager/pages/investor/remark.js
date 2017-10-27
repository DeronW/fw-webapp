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
        maxLength:1000,
        value:this.props.investor.data.info.detail.remark || ''
    }
    componentDidMount(){
        this.getLength()
    }
    changeHandler = (e) => {
        this.setState({value:e.target.value},this.getLength())
    }
    getLength = () => {
        let {value} = this.state
        let len = 1000-(value.length)
        this.setState({maxLength:len})
    }
    keepHandler = () => {
        this.props.investor.editRemark(this.state.value)
    }

    render() {
        let {history} = this.props
        let { value,maxLength } =this.state
        return <div>
            <Header title="客户备注" history={history}/>
            <textarea name="" id="" maxlength="1000" cols="30" rows="10"
                styleName="area"
                value={value}
                onChange={this.changeHandler}>
            </textarea>
            <div styleName="maxLength">还可输入{maxLength}字</div>
            <div styleName="btnKeep" onClick={this.keepHandler}>保存</div>
        </div>
    }
}

export default Remark