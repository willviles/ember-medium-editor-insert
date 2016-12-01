/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-medium-editor-insert',

  included: function(app) {
    this._super.included(app);

    // CSS
    app.import(app.bowerDirectory + '/medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.min.css');

    if (!process.env.EMBER_CLI_FASTBOOT) {

      // JS
      app.import(app.bowerDirectory + '/handlebars/handlebars.runtime.min.js');
      app.import(app.bowerDirectory + '/jquery-sortable/source/js/jquery-sortable-min.js');
      app.import(app.bowerDirectory + '/blueimp-file-upload/js/vendor/jquery.ui.widget.js');
      app.import(app.bowerDirectory + '/blueimp-file-upload/js/jquery.iframe-transport.js');
      app.import(app.bowerDirectory + '/blueimp-file-upload/js/jquery.fileupload.js');
      app.import(app.bowerDirectory + '/medium-editor-insert-plugin/dist/js/medium-editor-insert-plugin.min.js');

    }

  },
};
