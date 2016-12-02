import Ember from 'ember';
import mediumEditor from 'ember-cli-medium-editor/components/medium-content-editable';

const { get, observer, merge } = Ember;

export function initialize() {

  mediumEditor.reopen({

    editorInitialized: observer('mediumEditor', function() {

      this._super(...arguments);

      const opts = merge(
        { editor: get(this, 'mediumEditor')},
        get(this, 'insertOptions')
      );

      this.$().mediumInsert(opts);

    })

  });
}

export default {
  name: 'medium-editor-insert',
  initialize: initialize
};
