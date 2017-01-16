/*
	内容区域的loading
*/

const Mumm = React.createClass({
	getInitialState: function() {
		return {
			counter: 0
		};
	},
	startCounter: function(){
		this.setState({counter: this.state.counter + 1})
	},
	componentDidMount: function() {
		this._timer = setInterval(this.startCounter, 150);
	},
	componentWillUnmount: function() {
		clearInterval(this._timer);
	},
	render: function() {
		let _this = this;

		let shapeNumber = [0, 1, 2, 3, 4, 5, 6, 7];

		var leader = this.state.counter % 8;

		let shapeRadius = {
			width: "100px",
			height: "100px",
			margin: "100px",
			backgroundColor: "rgba(0, 0, 0, 0.7)",
			position: "relative"
		};

		let shapeStyle = function (x, y, index) {
			var dis;

			if(leader >= index){
				dis = leader - index
			} else {
				dis = leader + 8 - index;
			}

			//if(leader < index) leader += 8;
			//var dis = leader - index;

			var opacity = (dis+2) / 8;

			return {
				position: "absolute",
				width: "4px",
				height: "30px",
				top: "50%",
				left: "50%",
				margin: "-15px 0 0 -2px",
				transform: "translate3d(" + y + "px," + -x + "px, 0px) rotate(" + (index * 45) +"deg)",
				backgroundColor: "#fff",
				opacity: opacity
			};
		};

		//console.log(leader);


		let e = (index) => (
			<div className="shape" style={shapeStyle}></div>
		);

		return (
			<div className="mumm" style={shapeRadius}>
				{
					shapeNumber.map(function(index) {
						var radian = ((index * 45) * Math.PI) / 180;

						var x = Math.cos(radian) * 50;
						var y = Math.sin(radian) * 50;

						return <div className="shape" style={shapeStyle(x, y, index)}></div>

					})
				}
			</div>
		);
	}
});

