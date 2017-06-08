import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const options = this.get('options');
    return {
      text: null,
      options
    };
  },

  options: {
    plugins: {
      insert: {
        enabled: true,
        addons: {
          images: {
            fileUploadOptions: {
              url: `images/upload`,
              acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
              paramName: 'file'
            },
            deleteScript: `images/delete`,
          }
        }
      }
    }
  }

});
