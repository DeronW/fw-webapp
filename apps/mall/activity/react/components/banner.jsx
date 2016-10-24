let Banner = ({image, show, desc, onClick}) => {

    let img = (
        <a className="act-img-detail">
            <img src={image || 'images/default-banner.jpg'}/>
        </a>
    );

    let detail = null;

    if (show && desc) {
        detail = (
            <div className="act-explain-cont show">
                {desc.split(/[;|；]/).map((i, index) => <div key={index}>{trim(i)}</div>)}
            </div>
        )
    }

    return (
        <div>
            {image ? img : null}
            <div className="act-explain-box">
                <div className="act-explain-head" onClick={onClick}>
                    <div className="act-explain-h">活动说明</div>
                    <div className={show ? "act-explain-btn on" : "act-explain-btn"}
                         style={{background: "url(images/ico-grap-down.png) no-repeat center"}}></div>
                </div>
                {detail}
            </div>
        </div>
    )
};

Banner.propTypes = {
    show: React.PropTypes.bool.isRequired,
    image: React.PropTypes.string.isRequired,
    desc: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
};
