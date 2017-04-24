const BannerDetail = React.createClass({
    render: function () {
    	let iOSApp = $FW.Browser.inApp() && $FW.Browser.inIOS();
    	return <div>
			<div className={iOSApp ? "head-images head-images-ios" : "head-images"}>
        		<img src="images/education-theme-img.png"/>
        	</div>
        <p>vheivhidvhdhvid</p>
    	</div>
        
    }
});


$FW.DOMReady(function () {
			ReactDOM.render(<Header title={"公告"}/>, HEADER_NODE);
            ReactDOM.render(<BannerDetail />, CONTENT_NODE);
});

