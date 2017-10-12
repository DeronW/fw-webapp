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
        Event.touchBottom(this.props.investor.fetchSearch)
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
        let {fetchSearch,resetPageNo} = this.props.investor
        resetSearchPageNo()
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
                {/*只是简单实现，等有真正数据需要传递客户的ID到客户详情页，并且采用数组map形式显示数据*/}
                <div styleName="listItem" onClick={() => this.gotoInfo()}>
                    <div styleName="name">钱程</div>
                    <div styleName="time">注册时间：2017-08-13 00:00:00</div>
                    <div styleName="mobile">
                        <span>18911392598</span>
                        <img src={require("../../images/investor/search/arrow.png")} />
                    </div>
                </div>
                <div styleName="listItem">
                    <div styleName="name">钱程</div>
                    <div styleName="time">注册时间：2017-08-13 00:00:00</div>
                    <div styleName="mobile">
                        <span>18911392598</span>
                        <img src={require("../../images/investor/search/arrow.png")} />
                    </div>
                </div>
            </div>
            <div styleName="load">已经全部加载完毕</div>
        </div>
    }
}
export default Search