'use strict';

const API_PATH = document.getElementById('api-path').value;

const SearchPage = React.createClass({
    render: function(){
        let category = ['食品','酒水','虚拟类','运动户外','品质生活','箱包','豆哥周边','家用电器','电脑办公','家具','手机数码','汽车用品','家居','玩具','厨具','母婴'];
        let category_item = category.map((name,index) => <a key={index}><img className="category-img" src={"images/icon-" + (index+1) + ".png"}/><span className="category-name">{name}</span></a>);
            return (
                <div className="category-items">
                    {category_item}
                </div>
      )
    }
});

$FW.DOMReady(function(){
    NativeBridge.setTitle('商城品类');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"商城品类"} back_handler={backward}/>, document.getElementById('header'));
    ReactDOM.render(<SearchPage/>, document.getElementById('cnt'));
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}


