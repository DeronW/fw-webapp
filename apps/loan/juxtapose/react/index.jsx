class Juxtapose extends React.Component {
	constructor() {
		super()
		this.state = {
			listData: null
		}	
	}
	componentDidMount() {
		/*$FXH.Post(`${API_PATH}/api/product/v1/productDisplayList.json`, {
				pageIndex: 1,
				pageSize: 100,
				productDisplayType: 2	
			})
            .then(data => {
				console.log(data)
            })*/

	}
	render() {
		const TEST = [1, 2, 3, 4] 

		let list = (i) => {
			return <div className="li" key={ i }>
					<div className="logo">
						<img src="images/dumiao-logo.png" />
					</div>
				</div>
		}

		return (
			<div>
				<div className="list">
					{
						TEST.map((data, index) => {
							return list(index)
						})			
					}
				</div>	
			</div>	
		)
	}
} 

$FW.DOMReady(() => {
    ReactDOM.render(<Header title={'对比'} />, HEADER_NODE)
	ReactDOM.render(<Juxtapose />, CONTENT_NODE)
})
