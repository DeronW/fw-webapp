const Content = React.createClass({
    getInitialState: function () {
        return {topic: 'index'}
    },
    componentDidMount: function () {
        window.addEventListener('popstate', () => this.setState({topic: 'index'}))
    },
    topicClickHandler: function (group_title) {
        history.pushState(null, {}, `/static/wap/faq/index.html?${group_title}`);
        this.setState({topic: group_title})
    },
    getCurrentTopic: function () {
        let topic, cnt = this.props.content;

        out:
            for (var i = 0; i < cnt.length; i++) {
                for (var j = 0; j < cnt[i].group_items.length; j++) {
                    if (cnt[i].group_items[j].topic_title == this.state.topic) {
                        topic = cnt[i].group_items[j];
                        break out;
                    }
                }
            }

        return topic;
    },
    render: function () {

        let topic = (data, index) => {
            return (
                <div className="topic" key={index} onClick={
                    ()=>this.topicClickHandler(data.topic_title)}>
                    <div className={`icon icon-${data.icon}`}></div>
                    <div className="arrow icon-right-arrow"></div>
                    {data.topic_title}
                </div>
            )
        };

        let group = (data, index) => {
            return (
                <div className="group" key={index}>
                    <div className="group-title">{data.group_title}</div>
                    <div className="topics">
                        {data.group_items.map(topic)}
                    </div>
                </div>
            )
        };

        let page;
        if (this.state.topic == 'index') {
            page = this.props.content.map(group);
        } else {
            page = <Content.Page topic={this.getCurrentTopic()}/>
        }

        return <div className=""> {page} </div>
    }
});

Content.Page = React.createClass({
    getInitialState: function () {
        return {items: []}
    },
    componentDidMount: function () {
    },
    toggleHandler: function (index) {
        var items = this.state.items.slice();
        items[index] = items[index] == 'show' ? 'hide' : 'show';
        this.setState({items: items});
    },
    render: function () {
        let qa = (data, index) => {
            var cn = this.state.items[index] == 'show' ? 'qa show' : 'qa';

            return (
                <div className={cn} key={index}>
                    <div className="q" onClick={()=>this.toggleHandler(index)}>
                        <div className="icon-down-arrow clearfix"></div>
                        {data.q}
                    </div>
                    <div className="a" dangerouslySetInnerHTML={{__html: data.a}}></div>
                </div>
            )
        };

        let topic = this.props.topic;
        return (
            <div className="topic">
                <div className="topic-title"> {topic.topic_title}</div>
                <div className="topic-content">
                    {topic.topic_items.map(qa)}
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    if (!$FW.Browser.inApp()) {
        ReactDOM.render(<Header title={'帮助中心'}/>, HEADER_NODE);
    }
    ReactDOM.render(<Content content={TEXT}/>, CONTENT_NODE);
});
