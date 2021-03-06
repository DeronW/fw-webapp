const SearchPage = React.createClass({
    render: function () {
        let category = ['工场券', '豆哥周边', '虚拟类', '饮食', '家居生活', '汽车用品', '户外用品', '手机数码', '母婴教育', '品质生活', '全部商品'];
        let category_link_name = ['workshop', 'fantasy', 'virtualCard', 'diet', 'living', 'automobile', 'outdoor', 'mobileDigital', 'maternalInfantEducation', 'qualityLife', ''];

        let category_item = category.map((name, index) => {
            let category_link = '/static/mall/product-list/index.html?searchSourceType=0&category=' + category_link_name[index] + '&title=' + category[index];
            return (
                <a href={category_link} key={index}><img className="category-img"
                                                         src={"images/icon-" + (index + 1) + ".png"}/><span
                    className="category-name">{name}</span></a>
            )

        });
        return (
            <div className="category-items">
                {category_item}
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<BottomNavBar />, BOTTOM_NAV_NODE);
    ReactDOM.render(<Header title={"品类中心"}/>, HEADER_NODE);
    ReactDOM.render(<SearchPage />, CONTENT_NODE);
});
