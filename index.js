/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const map = require('broccoli-stew').map;
const path = require('path');

const { join } = path;

module.exports = {
  name: 'ember-medium-editor-insert',

  included(app) {
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }
    this.app = app;

    // Setup paths
    let vendorPath = this.treePaths.vendor;

    this.includeDependencies(vendorPath);
    this.includePlugin(vendorPath);

    return this._super.included.apply(this, arguments);

  },

  includeDependencies(vendorPath) {
    // Import handlebars
    this.import({
      development: join(vendorPath, 'handlebars', 'handlebars.runtime.js'),
      production: join(vendorPath, 'handlebars', 'handlebars.runtime.min.js')
    });

    // Import jquery-sortable
    this.import({
      development: join(vendorPath, 'jquery-sortable', 'jquery-sortable.js'),
      production: join(vendorPath, 'jquery-sortable', 'jquery-sortable-min.js')
    });

    // Import blueimp-file-upload
    this.import(join(vendorPath, 'blueimp-file-upload', 'vendor', 'jquery.ui.widget.js'));
    this.import(join(vendorPath, 'blueimp-file-upload', 'jquery.iframe-transport.js'));
    this.import(join(vendorPath, 'blueimp-file-upload', 'jquery.fileupload.js'));
  },

  includePlugin(vendorPath) {
    let jsPath = join(vendorPath, 'medium-editor-insert-plugin', 'js');
    let stylesPath = join(vendorPath, 'medium-editor-insert-plugin', 'css');

    // Import css
    this.import({
      development: join(stylesPath, 'medium-editor-insert-plugin.css'),
      production: join(stylesPath, 'medium-editor-insert-plugin.min.css')
    });

    // Import js
    this.import({
      development: join(jsPath, 'medium-editor-insert-plugin.js'),
      production: join(jsPath, 'medium-editor-insert-plugin.min.js')
    });
  },

  treeForVendor(vendorTree) {
    let trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    this.dependencyTrees(trees);
    this.pluginTrees(trees);

    return mergeTrees(trees);
  },

  dependencyTrees(trees) {
    // handlebars
    trees.push(
      moduleToFunnel({
        moduleName: 'handlebars',
        funnelOpts: {
          srcDir: 'dist',
          include: [
            'handlebars.runtime.js',
            'handlebars.runtime.min.js'
          ],
          destDir: 'handlebars'
        },
        pathModifier: ['..', '..'],
        excludeFastboot: true
      })
    );
    // jquery-sortable
    trees.push(
      moduleToFunnel({
        moduleName: 'jquery-sortable',
        funnelOpts: {
          include: [
            'jquery-sortable.js',
            'jquery-sortable-min.js'
          ],
          destDir: 'jquery-sortable'
        },
        pathModifier: ['..'],
        excludeFastboot: true
      })
    );
    // blueimp-file-upload
    trees.push(
      moduleToFunnel({
        moduleName: 'blueimp-file-upload',
        funnelOpts: {
          include: [
            'vendor/jquery.ui.widget.js',
            'jquery.iframe-transport.js',
            'jquery.fileupload.js'
          ],
          destDir: 'blueimp-file-upload'
        },
        pathModifier: ['..'],
        excludeFastboot: true
      })
    );
  },

  pluginTrees(trees) {
    trees.push(
      moduleToFunnel({
        moduleName: 'medium-editor-insert-plugin',
        funnelOpts: {
          include: ['js/**/*'],
          destDir: 'medium-editor-insert-plugin'
        },
        pathModifier: ['..', '..'],
        excludeFastboot: true
      }),
      moduleToFunnel({
        moduleName: 'medium-editor-insert-plugin',
        funnelOpts: {
          include: ['css/**/*'],
          destDir: 'medium-editor-insert-plugin'
        },
        pathModifier: ['..', '..']
      })
    );
  }

};

function moduleToFunnel(opts = {}) {
  let tree = new Funnel(resolveModulePath(opts), opts.funnelOpts);
  return opts.excludeFastboot ?
    map(tree, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`) :
    tree;
}

function resolveModulePath(opts) {
  opts.pathModifier = opts.pathModifier ? opts.pathModifier : [];
  return join(require.resolve(opts.moduleName), ...opts.pathModifier);
}
