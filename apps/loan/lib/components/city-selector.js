import React from 'react'
import CSSModules from 'react-css-modules'

import styles from '../css/city-selector.css'


/* props:
    selected        |!string
    changeHandler   |!function
    closeHandler    |!function
*/
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class CitySelector extends React.Component {

    sortedCapitalLetter = Object.keys(CITY_LIST).sort();

    handleLetterNav = letter => () => {
        const cityGrpLabelHeight = 80,
            cityItemHeight = 88,
            hotCityGrpHeight = 220 + 80,
            cityGrpCnt = this.sortedCapitalLetter.indexOf(letter);
        let scrollHeight = hotCityGrpHeight;
        for (let i = 0; i < cityGrpCnt; i++) {
            const letter = this.sortedCapitalLetter[i];
            scrollHeight += cityGrpLabelHeight;
            scrollHeight += cityItemHeight * CITY_LIST[letter].length;
        }
        window.scrollTo(0, scrollHeight);
    }

    handleSelect = city => e => {
        const { changeHandler, closeHandler } = this.props;
        if (e.clientX / e.target.clientWidth > 0.9) return
        changeHandler(city);
        closeHandler();
    }

    _genCityGrp = () => {
        const { selected } = this.props;
        return <div>
            { this.sortedCapitalLetter.map(letter => <div key={letter}>
                <div styleName="city-grp-letter">{ letter.toUpperCase() }</div>
                <div styleName="city-grp">
                    { CITY_LIST[letter].map(city => <div key={city}
                        styleName={ selected == city ? "city-item-selected" : "city-item"}
                        onClick={this.handleSelect(city)}>
                        { city }
                    </div>) }
                </div>
            </div>) }
        </div>
    }

    render() {

        const { selected, changeHandler, closeHandler } = this.props;

        return <div styleName="selector">

            <div styleName="header-placeholder">
                <div styleName="header">选择城市</div>
                <div styleName="close-btn" onClick={closeHandler}></div>
            </div>

            <div styleName="capital-letter-nav">
                { this.sortedCapitalLetter.map(letter => <span key={letter} onClick={this.handleLetterNav(letter)}>
                    { letter.toUpperCase() }
                </span>) }
            </div>

            <div styleName="hot-city-label">热门城市</div>
            <div styleName="hot-city-grp">
                { HOT_CITY_LIST.map(city => {
                    return <div key={city}
                        styleName={ selected == city ? "hot-city-item-selected" : "hot-city-item"}
                        onClick={() => { changeHandler(city); closeHandler() }}>
                        {city}
                    </div>
                }) }
            </div>

            <div>
                { this._genCityGrp() }
            </div>

        </div>
    }
}

const CITY_LIST = {
  "A": [
    "安康市", "安庆市", "安顺市", "鞍山市", "安阳市"
  ],
  "B": [
    "白城市",
    "保定市",
    "北海市",
    "北京市",
    "宝鸡市",
    "保山市",
    "白山市",
    "百色市",
    "本溪市",
    "白银市",
    "巴中市",
    "滨州市",
    "郴州市"
  ],
  "C": [
    "长春市",
    "常德市",
    "成都市",
    "承德市",
    "巢湖市",
    "重庆市",
    "长沙市",
    "朝阳市",
    "崇左市",
    "常州市",
    "池州市",
    "沧州市",
    "滁州市",
    "潮州市",
    "长治市"
  ],
  "D": [
    "丹东市",
    "大理市",
    "大连市",
    "大庆市",
    "大同市",
    "东莞市",
    "定西市",
    "东营市",
    "德阳市",
    "德州市",
    "达州市"
  ],
  "E": ["鄂州市"],
  "F": [
    "防城港市",
    "佛山市",
    "抚顺市",
    "阜新市",
    "阜阳市",
    "抚州市",
    "福州市"
  ],
  "G": [
    "广安市",
    "蚌埠市",
    "贵港市",
    "桂林市",
    "肇庆市",
    "广元市",
    "贵阳市",
    "广州市",
    "赣州市"
  ],
  "H": [
    "淮安市",
    "淮北市",
    "鹤壁市",
    "河池市",
    "邯郸市",
    "哈尔滨市",
    "合肥市",
    "鹤岗市",
    "黄冈市",
    "怀化市",
    "黑河市",
    "海口市",
    "葫芦岛市",
    "淮南市",
    "衡水市",
    "黄山市",
    "黄石市",
    "河源市",
    "衡阳市",
    "亳州市",
    "惠州市",
    "杭州市",
    "汉中市",
    "湖州市",
    "菏泽市",
    "贺州市"
  ],
  "J": [
    "吉安市",
    "晋城市",
    "金昌市",
    "景德镇市",
    "金华市",
    "九江市",
    "吉林市",
    "佳木斯市",
    "江门市",
    "荆门市",
    "济南市",
    "济宁市",
    "酒泉市",
    "嘉兴市",
    "鸡西市",
    "嘉峪关市",
    "揭阳市",
    "晋中市",
    "焦作市",
    "荆州市",
    "锦州市"
  ],
  "K": [
    "开封市", "昆明市"
  ],
  "L": [
    "六安市",
    "来宾市",
    "临沧市",
    "聊城市",
    "娄底市",
    "临汾市",
    "廊坊市",
    "莱芜市",
    "漯河市",
    "丽江市",
    "吕梁市",
    "陇南市",
    "六盘水市",
    "丽水市",
    "乐山市",
    "临沂市",
    "连云港市",
    "洛阳市",
    "辽源市",
    "辽阳市",
    "龙岩市",
    "兰州市",
    "柳州市",
    "泸州市"
  ],
  "M": [
    "马鞍山市",
    "牡丹江市",
    "茂名市",
    "眉山市",
    "绵阳市",
    "梅州市"
  ],
  "N": [
    "宁波市",
    "南充市",
    "南昌市",
    "宁德市",
    "内江市",
    "南京市",
    "南宁市",
    "南平市",
    "南通市",
    "南阳市"
  ],
  "P": [
    "平顶山市",
    "普洱市",
    "盘锦市",
    "平凉市",
    "莆田市",
    "萍乡市",
    "濮阳市",
    "攀枝花市"
  ],
  "Q": [
    "青岛市",
    "秦皇岛市",
    "曲靖市",
    "齐齐哈尔市",
    "七台河市",
    "庆阳市",
    "清远市",
    "泉州市",
    "衢州市",
    "钦州市"
  ],
  "R": ["日照市"],
  "S": [
    "韶关市",
    "上海市",
    "绥化市",
    "石家庄市",
    "商洛市",
    "三门峡市",
    "三明市",
    "遂宁市",
    "四平市",
    "商丘市",
    "宿迁市",
    "上饶市",
    "汕头市",
    "汕尾市",
    "绍兴市",
    "双鸭山市",
    "十堰市",
    "松原市",
    "沈阳市",
    "邵阳市",
    "宿州市",
    "朔州市",
    "深圳市",
    "苏州市",
    "随州市"
  ],
  "T": [
    "泰安市",
    "铜川市",
    "通化市",
    "天津市",
    "铁岭市",
    "铜陵市",
    "唐山市",
    "天水市",
    "太原市",
    "台州市",
    "泰州市"
  ],
  "W": [
    "潍坊市",
    "威海市",
    "武汉市",
    "芜湖市",
    "渭南市",
    "武威市",
    "无锡市",
    "梧州市",
    "温州市"
  ],
  "X": [
    "西安市",
    "宣城市",
    "许昌市",
    "襄樊市",
    "孝感市",
    "厦门市",
    "咸宁市",
    "湘潭市",
    "邢台市",
    "新乡市",
    "信阳市",
    "咸阳市",
    "新余市",
    "徐州市",
    "忻州市"
  ],
  "Y": [
    "延安市",
    "雅安市",
    "宜宾市",
    "伊春市",
    "宜昌市",
    "宜春市",
    "盐城市",
    "运城市",
    "云浮市",
    "阳江市",
    "营口市",
    "榆林市",
    "玉林市",
    "阳泉市",
    "烟台市",
    "鹰潭市",
    "玉溪市",
    "岳阳市",
    "益阳市",
    "扬州市",
    "永州市"
  ],
  "Z": [
    "淄博市",
    "自贡市",
    "珠海市",
    "张家界市",
    "张家口市",
    "湛江市",
    "镇江市",
    "周口市",
    "驻马店市",
    "舟山市",
    "昭通市",
    "张掖市",
    "资阳市",
    "遵义市",
    "中山市",
    "枣庄市",
    "株洲市",
    "漳州市",
    "郑州市"
  ]
};

const HOT_CITY_LIST = ["北京市", "上海市", "广州市", "深圳市", "杭州市"];

export default CitySelector