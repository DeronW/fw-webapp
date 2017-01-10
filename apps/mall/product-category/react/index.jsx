function gotoHandler(link, need_login) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
    if ($FW.Browser.inApp()) {
        NativeBridge.goto(link, need_login)
    } else {
        location.href = encodeURI(link);
    }
}

const SearchPage = React.createClass({
    render: function(){
        let category = ['工场券','豆哥周边','虚拟类','饮食','家居生活','汽车用品','户外用品','手机数码','母婴教育','品质生活','全部商品'];
        let category_link_name = ['workshop','fantasy','virtualCard','diet','living','automobile','outdoor','mobileDigital','maternalInfantEducation','qualityLife',''];

        let category_item = category.map((name,index) =>{
        	let category_link='http://mmall.9888.cn/static/mall/product-list/index.html?searchSourceType=0&category='+category_link_name[index]+'&title='+category[index];
        	console.log(category_link);
        	return (
        		<a href={category_link} key={index}><img className="category-img" src={"images/icon-" + (index+1) + ".png"}/><span className="category-name">{name}</span></a>
        	)

        });
            return (
                <div>
                    <div className="category-items">
                        {category_item}
                    </div>
                    <div className="fixed-nav">
                        <a className="fixed-nav-link fixed-nav-link1"
                           onClick={ () => gotoHandler("/static/mall/new-home/index.html") }></a>
                        <a className="fixed-nav-link fixed-nav-link2 active"
                           onClick={ () => gotoHandler("/static/mall/product-category/index.html") }></a>
                        <a className="backToIndex" onClick={ () => $FW.Browser.inApp() ? NativeBridge.close() : location.href = location.protocol + '//m.9888.cn'}></a>
                        <a className="fixed-nav-link fixed-nav-link3"
                           onClick={ () => gotoHandler("/static/mall/shopping-cart/index.html", true) }></a>
                        <a className="fixed-nav-link fixed-nav-link4"
                           onClick={ () => gotoHandler("/static/mall/new-user/index.html", true) }></a>
                    </div>
                </div>
      )
    }
});

$FW.DOMReady(function(){
    NativeBridge.setTitle('品类中心');
    ReactDOM.render(<BottomNavBar index={2}/>, document.getElementById('bottom-nav-bar'));
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"品类中心"} back_handler={backward}/>, document.getElementById('header'));
    ReactDOM.render(<SearchPage/>, document.getElementById('cnt'));
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = 'http://mmall.9888.cn/static/mall/home/index.html'
}


