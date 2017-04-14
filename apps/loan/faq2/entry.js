import React from 'react';
import ReactDOM from 'react-dom';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// import RaisedButton from 'material-ui/RaisedButton';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { QUESTIONS } from './components/questions'

const STYLE = {
    question: {
        // fontSize: 28,
        // lineHeight: 1.6
    },
    answer: {
        // fontSize: 22,
        // lineHeight: 1.6
    },
    arrow: {
        // transform: 'scale(2)'
    }
}

class FAQ extends React.Component {

    render() {

        let list_item = (item, index) => {
            return <ListItem style={STYLE.question} key={index} primaryText={item.q}
                primaryTogglesNestedList={true}
                nestedItems={[
                    <ListItem key={1} style={STYLE.answer} primaryText={item.a} />
                ]} />
        }

        return (
            <MuiThemeProvider>
                <List>
                    <Subheader style={{ fontSize: 32 }}>FAQ</Subheader>
                    {QUESTIONS.map(list_item)}
                </List>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<FAQ />, document.getElementById('app'));
