module.exports = {
  normalizeEntityName: function() {
  },

  afterInstall: function() {
    return this.addBowerPackageToProject("medium-editor-insert-plugin", "~2.4.0");
  }
};
