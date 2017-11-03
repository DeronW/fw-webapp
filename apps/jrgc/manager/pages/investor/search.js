import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Utils, Event, Components } from 'fw-javascripts'
import { Header, BottomNavBar } from '../../components'
import styles from '../../css/investor/search.css'

@inject('investor')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Search extends React.Component {
    state = {
        isSearch: false,
        pending:false
    }
    componentDidMount() {
        let { resetSearchPageNo, fetchSearch,setKeyword } = this.props.investor
        let { records } = this.props.investor.data.search
        records.splice(0, records.length)
        resetSearchPageNo()
        Event.touchBottom(fetchSearch)
    }
    componentWillUnmount() {
        Event.cancelTouchBottom()
    }
    changeValue = e => {
        let { setKeyword } = this.props.investor
        setKeyword(e.target.value)
    }
    clearhandler = () => {
        let { setKeyword } = this.props.investor
        setKeyword('')
    }
    searchHandler = () => {
        let { fetchSearch, resetSearchPageNo } = this.props.investor
        this.setState({ isSearch: true })
        resetSearchPageNo()
        if(this.state.pending) return
        this.setState({pending:true})
        fetchSearch().then(()=>{
            this.setState({pending:false})
        },()=>{
            this.setState({pending:false})
        })
    }
    gotoInfo = (id) => {
        let { history } = this.props
        history.push(`/investor-info?custId=${id}`)
    }

    render() {
        let { history } = this.props
        let { isSearch } = this.state
        let { search } = this.props.investor.data
        let { keyword } = search

        let mobileFormat = (mobile) => {
            if(!mobile) return
            return mobile.toString().substr(0,3)+"****"+mobile.toString().substr(-4)
        }
        let recordFn = (item, index) => {
            return <div styleName="listItem" key={index} onClick={() => this.gotoInfo(item.custId)}>
                <div styleName="name">{item.realName || item.custRealName || mobileFormat(item.mobile)}</div>
                <div styleName="time">注册时间：{item.createTime || item.regTime}</div>
                <div styleName="mobile">
                    <span>{item.mobile}</span>
                    <img src={require("../../images/investor/search/arrow.png")} />
                </div>
            </div>
        }
        let empty = <div styleName="emptyWrapper">
            <div>该用户不存在</div>
            <div styleName="emptyLine">请检查筛选条件，只可通过汉字与数字筛选</div>
        </div>
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
                {isSearch ? (search.records && search.records.length > 0 ? search.records.map(recordFn) : empty) : ''}
            </div>
            {search.records.length > 0 && <div styleName="load">已经全部加载完毕</div>}
        </div>
    }
}
export default Search