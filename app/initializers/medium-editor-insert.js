import Ember from 'ember';
import MediumEditor from 'ember-medium-editor/components/medium-editor';

const { get, merge, typeOf } = Ember;

export function initialize() {

  MediumEditor.reopen({

    _initEditor() {
      this._super(...arguments);

      let options = get(this, 'options.plugins.insert');

      if (typeOf(options) !== 'object') { return; }

      options = merge({
        editor: get(this, '_editor')
      }, options);

      this.$().mediumInsert(options);

    }

  });
}

export default {
  name: 'medium-editor-insert',
  initialize: initialize
};
