class UserInfoTab extends React.Component {
    render() {
        let height = "72px";
        let path = window.location.pathname.toLowerCase();
        let tabSelect = path.split('/').find(p => p.indexOf('user') >= 0).split('-')[1];
        let userInfoCat = [
            {
                "infoCatID": "basic",
                "infoCatNameCN": "基本信息"
            }, {
                "infoCatID": "eci",
                "infoCatNameCN": "紧急联系人"
            }, {
                "infoCatID": "job",
                "infoCatNameCN": "工作信息"
            }
        ];
        let infoTabStyle = {
            "display": "inline-flex",
            "justifyContent": "space-around",
            "width": "100%",
            "height": height,
            "padding": '0',
            "margin": "0",
            "backgroundColor": "#fff",
            "color": "#999",
            "fontSize": "27px"
        };
        let infoTabItemGrp = userInfoCat.map((item, index) => {
            let infoItemBorderStyle = "3px solid " + (item.infoCatID === tabSelect? "#649cfe" : "transparent");
            let infoItemFontColor = item.infoCatID === tabSelect ? "#649cfe" : "inherit";
            let infoTabItemStyle = {
                "display": "inline-block",
                "height": "100%",
                "lineHeight": height,
                "borderBottom": infoItemBorderStyle,
                "borderTop": "3px solid transparent",
                "color": infoItemFontColor,
                "listStyle": "none"
            };
            return (
                <li
                  style={infoTabItemStyle}
                  key={item.infoCatID}
                  id={item.infoCatID}>{item.infoCatNameCN}</li>
            )
        });
        return (
            <ul style={infoTabStyle}>{infoTabItemGrp}</ul>
        )
    }
}
