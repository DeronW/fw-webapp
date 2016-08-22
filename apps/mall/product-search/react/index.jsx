'use strict';

const API_PATH = document.getElementById('api-path').value;

const SearchPage = React.createClass({
    render: function(){
            return (
            <div>
                <div className="search-page-box">
                    <a className="back-arrow"></a>
                    <input type="text" value="" placeholder="请输入想找的商品"/>
                    <span className="search-page-icon"></span>
                    <span className="search-cancel">取消</span>
                </div>
                <div className="search-history">
                    <input className="search-history-input" type="text" value="" placeholder="历史搜索"/>
                    <div className="history-item">甜甜圈饼干</div>
                    <div className="history-item">甜甜圈饼干</div>
                    <div className="history-item">甜甜圈饼干</div>
                    <div className="history-item">甜甜圈饼干</div>
                    <div className="history-item">甜甜圈饼干</div>
                    <div className="clear-history">清空历史搜索</div>
                </div>
            </div>
      )
    }
});

$FW.DOMReady(function(){
    ReactDOM.render(<SearchPage/>, document.getElementById('cnt'));
});

