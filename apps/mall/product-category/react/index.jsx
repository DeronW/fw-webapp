'use strict';

const API_PATH = document.getElementById('api-path').value;

const SearchPage = React.createClass({
    render: function(){
        let category = ['虚拟类','饮食','家居生活','汽车用品','户外用品','手机数码','豆哥周边','品质生活','全部商品'];
        let category_link_name = ['virtualCard','diet','living','automobile','outdoor','mobileDigital','fantasy','qualityLife',''];
        
        let category_item = category.map((name,index) =>{
        	let category_link='http://10.105.6.51:8080/mallmain/build/mall/product-list/index.html?searchSourceType=0&category='+category_link_name[index]+'&title='+category[index];
        	console.log(category_link);
        	return (
        		<a href={category_link} key={index}><img className="category-img" src={"images/icon-" + (index+1) + ".png"}/><span className="category-name">{name}</span></a>
        	)
        	
        });
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


