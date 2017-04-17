class Banner extends React.Component {
	render() {
		return (
			<div className="banner">
				<img src="images/banner.png" />
			</div>
		)
	}
}

class TopInfo extends React.Component {
	render() {
		return (
			<div className="top-info">
				<div className="logo">
					<img src="images/logo.png" />
				</div>

				<div className="title">
					放心花
				</div>

				<div className="tag">
					<img src="images/tag-1.png"/>
					<img src="images/tag-2.png"/>
					<img src="images/tag-3.png"/>
				</div>

				<div className="subtitle">
					借款范围（500 - 10万）
				</div>

				<div className="next">

				</div>
			</div>
		)
	}
}

class BorrowMoneyList extends React.Component {
	render () {
		return (
			<div className="">
				<div className="borrow-money-list">
					<div className="icon-block">
						<img src="images/icon.png" />
					</div>

					<div className="info">
						<div className="t">
							<span className="title-text">读秒</span>
							<div className="tag">
								<img src="images/tag-1a.png" />
								<img src="images/tag-2a.png" />
								<img src="images/tag-3a.png" />
							</div>
						</div>

						<div className="b">
							<div className="text">
								借款范围（500 - 10万）
							</div>
						</div>
					</div>

					<div className="next">

					</div>
				</div>
			</div>
		)
	}
}

class BorrowMoney extends React.Component {
	render() {
		return (
			<div className="">
				<Banner />
				<TopInfo />
				<BorrowMoneyList />
			</div>
		)
	}
}

$FW.DOMReady(()=>{
        ReactDOM.render(
        <BorrowMoney />,
        document.getElementById('cnt')
    )
})

window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
    alert("错误信息：", errorMessage);
    console.log("出错文件：", scriptURI);
    console.log("出错行号：", lineNumber);
    console.log("出错列号：", columnNumber);
    alert("错误详情：", errorObj);
}
