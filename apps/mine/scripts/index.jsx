'use strict';

const HomePage = React.createClass({
	render: function() {
		return (
			<div>
				<UserInfo/>
			</div>
		);
	}
});

const UserInfo = React.createClass({
	render: function() {
		return (
			<div>
				<div className="user-area">
					<div className="user-info">
						<div className="user-portrait">
							<img src="../images/pro-img3.jpg"/>
						</div>

						<div className="usr-info-block">
							<div className="user-name">
								<span className="user-name-text">张克中</span>
							</div>

							<div className="usr-info-vip">
								<span className="text">会员等级<em className="vip-text">VIP2</em></span>
							</div>
						</div>
					</div>

					<div className="user-info-r">
						<div className="user-get-adders">
							<i className="adders-icon">
								<img src="../images/address-icon.png"/>
							</i>
							<span className="text">收货地址</span>
						</div>	
					</div>	
				</div>
			</div>
		);
	}	
});


ReactDOM.render(
	<HomePage/>,
	document.getElementById("cont")
);
