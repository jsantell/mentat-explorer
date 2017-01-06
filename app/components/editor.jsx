import React from 'react';
import { connect } from 'react-redux';
import Style from '../lib/style';
import CodeMirror from 'react-code-mirror';
// Be sure to import the correct mode, otherwise it won't get compiled
// and `CodeMirror.modes` will not contain any potential modes.
import registerClojureMode from 'codemirror/mode/clojure/clojure';

const EDITOR_STYLE = Style.registerStyle({
  flex: 2,
});

const EditorView = function (props) {
  return <CodeMirror
    className={`${EDITOR_STYLE}`}
    style={{border: '1px solid black'}}
    textAreaClassName={['form-control']}
    textAreaStyle={{ minHeight: '10em' }}
    value={'[:find ?e :where [?e :db/doc "hello world"]]'}
    mode='clojure'
    theme='solarized dark'
    onChange={e => console.log('change!', e)}
  />;
};

EditorView.displayName = 'EditorView';
export default connect()(EditorView);
