import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Event, Components } from 'fw-javascripts'
import { Header, BottomNavBar } from '../../components'
import styles from '../../css/investor/search.css'

@inject('investor')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Search extends React.Component {
    componentDidMount(){
        let {resetSearchPageNo,fetchSearch} = this.props.investor

        resetSearchPageNo()
        Event.touchBottom(fetchSearch)
    }
    componentWillUnmount(){
        Event.cancelTouchBottom()
    }
    changeValue = e => {
        let {setKeyword} = this.props.investor
        setKeyword( e.target.value)
    }
    clearhandler = () => {
        let {setKeyword} = this.props.investor
        setKeyword('')
    }
    searchHandler = () => {
        let {fetchSearch} = this.props.investor
        fetchSearch()
    }
    gotoInfo = (id) => {
        let { history } = this.props
        history.push(`/investor-info?id=${id}`)
    }
    render() {
        let { history } = this.props
        let { search } = this.props.investor.data
        let { keyword } = search

        let recordFn = (item,index) => {
            return <div styleName="listItem" key={index} onClick={() => this.gotoInfo(item.custId)}>
                <div styleName="name">{item.realName}</div>
                <div styleName="time">注册时间：{item.createTime}</div>
                <div styleName="mobile">
                    <span>{item.mobile}</span>
                    <img src={require("../../images/investor/search/arrow.png")} />
                </div>
            </div>
        }
        return <div styleName="bg">
            <Header title="搜索客户" history={history} />
            <div styleName="searchBar">
                <div styleName="search" onClick={this.searchHandler}></div>
                <input placeholder="请输入客户姓名或手机号"
                    value={keyword}
                    onChange={this.changeValue} />
                <div styleName="clear" onClick={this.clearhandler}></div>
                <div styleName="searchBtn" onClick={this.searchHandler}>搜索</div>
            </div>
            <div styleName="list">
                {records.records && records.records.length>0&&records.records.map(recordFn)}
            </div>
            <div styleName="load">已经全部加载完毕</div>
        </div>
    }
}
export default Search