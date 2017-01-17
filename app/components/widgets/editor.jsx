import React, { Component, PropTypes } from 'react';
import Style from '../../lib/style';
import CodeMirror from 'react-code-mirror';
// Be sure to import the correct mode, otherwise it won't get compiled
// and `CodeMirror.modes` will not contain any potential modes.
import registerClojureMode from 'codemirror/mode/clojure/clojure';

const EDITOR_STYLE = Style.registerStyle({
  flex: 2,
});

class EditorView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '[:find ?e ?i :where [?e :db/ident ?i]]',
    };
  }

  getQuery() {
    return this.editor.editor.getValue();
  }

  componentWillReceiveProps(props) {
    if (props.value !== this.props.value) {
      this.setState({ value: props.value });
    }
  }

  render() {
    let {
      value,
      className,
      style,
      ...otherProps,
    } = this.props;

    // Use value from state, not props, let componentWillReceiveProps
    // handle that
    value = this.state.value;

    return <CodeMirror
      ref={e => this.editor = e}
      className={`${EDITOR_STYLE} ${className || ''}`}
      style={{
        border: '1px solid black',
        ...style,
      }}
      textAreaClassName={['form-control']}
      textAreaStyle={{ minHeight: '10em' }}
      value={value}
      mode='clojure'
      theme='solarized dark'
      onChange={e => this.setState({ value: e.target.value })}
      {...otherProps}
    />;
  }
};

EditorView.displayName = 'EditorView';
EditorView.propTypes = {
  value: PropTypes.string,
};

export default EditorView;
