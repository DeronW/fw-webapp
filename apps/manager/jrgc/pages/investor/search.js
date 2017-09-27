import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header, BottomNavBar } from '../../components'
import styles from '../../css/investor/search.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Search extends React.Component {
    state = {
        keyword: ''
    }
    changeValue = e => {
        this.setState({ keyword: e.target.value })
    }
    clearhandler = () => {
        this.setState({ keyword: '' })
    }
    searchHandler = () => {
        console.log("搜索")
    }
    gotoInfo = () => {
        let { history } = this.props
        history.push('/investor-info')
    }
    render() {
        let { history } = this.props
        let { keyword } = this.state

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