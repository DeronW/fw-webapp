import React from 'react'

let isActiveTab = (tab) => {
    let pt = location.pathname,hash = location.hash,cnd = false;

    if(tab == 'user' && hash == '#/')
        cnd = true;

    if(tab == 'investor' && hash == '#/investor')
        cnd = true;

    if(tab == 'stats' && hash == '#/stats')
        cnd = true;

    return cnd
}
let tabColor = (keyword) => {
    let cnd = isActiveTab(keyword);
    return {
        color: cnd ? "#9b5b54" : "#999"
    }
}
function getStyle(tab){
    let style = {}

    const STYLE_TAB_BASE = {
        width: "33.33%",
        display: "block",
        float: "left",
        textAlign: "center",
        fontSize: "22px"
    }
    const STYLE_ICON_BASE = {
        height: "50px",
        display: "block",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        margin: "14px 0 2px"
    }

    if (tab == 'fixed_panel'){
        style = {
            width: "720px",
            height: "94px",
            position: "fixed",
            left: "0",
            right: "0",
            bottom: "-1px",
            background: "#fff",
            zIndex: "100",
            paddingBottom: "6px",
            boxShadow: "0 0 25px 5px rgba(0, 0, 0, 0.06)"
        }
    }
    if (tab == 'tab_user')
    style = Object.assign({}, STYLE_TAB_BASE, tabColor('user'))

    if (tab == 'tab_investor')
        style = Object.assign({}, STYLE_TAB_BASE, tabColor('investor'))

    if (tab == 'tab_stats')
        style = Object.assign({}, STYLE_TAB_BASE, tabColor('stats'))


    // if(tab == 'icon_user'){
    //     style = Object.assign({},STYLE_ICON_BASE,{
    //         backgroundImage:isActiveTab("user")?
    //         "url('')":
    //         "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZlLhKZbAAAAIXRSTlMA5vlKnyQUC+2tMxgQ8mbc2cp6bWFc09C2pjzAtYF0T4jK/nEQAAAB0klEQVRIx9yUy47DIAxFCUkJpHmTJmJVnf//yVmNkDK16ajtpneFbB1hXS4236JLTIcHf6R4+Rd4WyBruT0N1jMnzfVTYNsA2BA7Z4zrYrAATVsmrwfgV5crbvXAcS2RbgaSOxUTMLvCtAfY8W99tLDrMzdg748adwuN6i0wPm6NgObzBEnqJZiUJIB3ooEe5GwssBpRKyxibsH2MtpbkPIcIfz6VVX1+WQCRAEN2d4KqnzKJgcB3aHT0A52AR3AaQM7GAQUMKqA96MD9BrZw6DZJEm3KUjZLz9OFFs5Ei8E8f3xNxv4XrzUw6Z+9UbZPVNhwWziRNSfWWum/WmvDHYYBIEgurEaG1ChSWkIKHH+/ydruCwhutJ75/6ycQxvPgf7Prl5L1PSBkBfK7wHYHTjcExFtTwcjXO1qOnA1CLPVd2zQRXzoNbscwnOezM4rKjihzbS5ZMxBU2kQ4r5sGsht9xKcWbIvW1tpFWVHmwL6wD4sfbo6AG4m4bmTBb2ZnaWu1oBO7I7WZ6jBbxEBqBTdIaS6oAgH+2pRvk9rtekZnExWkpPS26KVKGcKLmpB9I1miRPvLgJ/jncoSTTJ5C/phxZjgael2gHyBvZ0T+/5gvb6jge5j8a2gAAAABJRU5ErkJggg==')"

    //     })
    // }
    // if(tab == 'icon_investor'){
    //     style = Object.assign({},STYLE_ICON_BASE,{
    //         backgroundImage:isActiveTab("investor")?
    //         "url('')":
    //         "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAe1BMVEUAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZlOY8pPAAAAKHRSTlMA+vHjKOgaE97ErYVqI/QsCeyypo5eVkcGuNW+oXxxTD05M8lDMPeZp4NjXgAAAcdJREFUSMft1cly2zAQRdEGZ4qzqIGaR9v3/78wkGwFoiMlzWQTV/ksWNWLJlEPDVC+tChNX+SpanUq5JktmKyWh+rMQPb8vR7gb+sHjbkPeAd5qkixmslReo6TBist5HemPhdhu50HcdfFwXzbhlx4ufxBlyc84E1iUdiP6DOrPBadz61jUfNg79YApagB/ep/bw3h4OYBQlFrYS03b65Q2IOp5F1g3BI0FrBwe7ySASrDnbk4A+dpJkNk3MlkiMXPb80gkSEaKOSqAEa1qBV3Y/AKnGLRmrrNkTFWEojS5C6bDRfNWXRS2MmHHSw9MFPR6EqIbkUMZZVo9ygA31W2rYpOQNupUhr1JmsqtX2yVqW0cdXmvadV3VFpb+TnwFtXNaqb0aYUuyrGOoXgR8qUHJ+rMFClNP50Ag14LzIgJZdTu1pqOmV1myWXU6r/b/QCiaDsRCNwJ87lpDs5s182cKG92rYwkZ416M5NDu2Dm0qjgtd+TB4UopJAUriysPVSdM4GwuOtOoZg9qK0K8E7f7zHg3InaocGzDWZmYHmIAMEPpDbtG2nH8gg0RLIMmAZyUBxylUay2D1GGtcy9/I/SSXb//oByOMQbFP50T2AAAAAElFTkSuQmCC')"
    //     })
    // }
    // if(tab == 'icon_stats'){
    //     style = Object.assign({},STYLE_ICON_BASE,{
    //         backgroundImage:isActiveTab("stats")?
    //         "url('')":
    //         "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAclBMVEUAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkjQ/XgAAAAJXRSTlMA8w2YBfka7+gTvqbhaicJ2sR1nYyCcEwiRjUuy7hkznlYUTzQ2ef+sgAAAitJREFUSMftlVl24yAQRQGB5nmKBs/22/8WO2VOB0sW2P3Xycn9MRK6FJRKZfbLt+Ej5tiGxx9Os4OLzhUTbhxxY2DvW+b8PRDbVQ6QaXEBblcBMOfsf6QWpxJ4pRLlqVjeFjvgSa3T01oldmKhenhWBwWVb6jwFkEVkEQ0uVquWZ81SgD1GPaqrxeqrwCoYZ2mCMDVruat53kViOpz1M4PqlCrutkBB6PeoGmhKR/UA7Bjj/TA0ah7bSQs0YPYqBSkX6gRB8Yv1S8pj/SdjJSr1DfqCPCIrd/OTX6laQiBkASfBoNJk7yt3g09w4HeZHgOAKqHGghmZtQe4P5KpYe4UVkLdNHkdxTEqDMHarZGHkEIGutMVRy8Mt+3oFQDR8meyDmpOdOEpp/9nddX+WZnUgDOejyA+PTNamcaK0t7ykzRTrS7M7uUAEZ9qyE1c/TSoNAnT46ZpN/DMdGHKwJQxVkJaV37li52k+bDaHMmCt0tnBUpVe4WCZDSWdz9/7Rxv3Zu1+Sx3jQ99gIZ495rDLqpIJbsFYLcoC7M+euATMFeIz2Q3JxzwUR+bkiEJ9lbXFIsSS/sXYqshKHMCvYvTN0+pXj7bmIu3P9PP1yVU99UlCaeVk09irfFaxNggYqzd2x5KLEBb6NX5iEFESb9mEdSRvnYJyGIIHOKQ3V/qJ1W9dHeT1ANdnMOKGAvtkqTQvOrVe0B1VoSIlrl6k5+Vc2OPcW7gX1n/gAI217R1FMDOQAAAABJRU5ErkJggg==')"
    //     })
    // }

    return style
}

class BottomNavBar extends React.Component{
    render(){
        // let { history } = this.props
        let link_handler = tab => {
            if (isActiveTab(tab)) return;

            if(tab == 'user'){
                location.href = '/static/manager/jrgc/index.html#/'
            }
            if(tab == 'investor'){
                location.href = '/static/manager/jrgc/index.html#/investor'
            }
            if(tab == 'stats'){
                location.href = '/static/manager/jrgc/index.html#/stats'
            }
        }
        const STYLE_ICON_BASE = {
            marginTop: '4px'
        }
        let icon_user = isActiveTab("user")?require("../images/components/bottom-nav-bar/user.gif"):require("../images/components/bottom-nav-bar/user.png")
        let icon_investor = isActiveTab("investor")?require("../images/components/bottom-nav-bar/investor.gif"):require("../images/components/bottom-nav-bar/investor.png")
        let icon_stats = isActiveTab("stats")?require("../images/components/bottom-nav-bar/stats.gif"):require("../images/components/bottom-nav-bar/stats.png")

        return <div style={{ height: "100px" }}>
            <div style={getStyle('fixed_panel')}>
                <a style={getStyle('tab_user')} onClick={() => link_handler('user')}>
                    <img src={icon_user} style={STYLE_ICON_BASE} /><div>我的</div>
                </a>
                <a style={getStyle('tab_investor')} onClick={() => link_handler('investor')}>
                    <img src={icon_investor} style={STYLE_ICON_BASE} /><div>客户</div>
                </a>
                <a style={getStyle('tab_stats')} onClick={() => link_handler('stats')}>
                    <img src={icon_stats} style={STYLE_ICON_BASE} /><div>业绩</div>
                </a>
            </div>
        </div>
    }
}

export default BottomNavBar