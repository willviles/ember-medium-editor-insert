Ember Medium Editor Insert ![Download count all time](https://img.shields.io/npm/dt/ember-medium-editor-insert.svg) [![npm](https://img.shields.io/npm/v/ember-medium-editor-insert.svg)](https://www.npmjs.com/package/ember-medium-editor-insert)
======

This Ember Addon extends the functionality of [ember-cli-medium-editor](https://github.com/lukebrenton/ember-cli-medium-editor) to include [medium-editor-insert-plugin](https://github.com/orthes/medium-editor-insert-plugin). Medium Editor Insert Plugin is a jQuery insert plugin for [Medium Editor](https://github.com/yabwe/medium-editor), enabling:
- **images**
- **embeds** (either through oEmbed proxy, such as [Iframely](https://iframely.com/), or pre-defined parsers such as - Youtube, Vimeo, Twitter, Facebook, Instagram)

## Demo
http://orthes.github.io/medium-editor-insert-plugin

## Installation

To install, make sure you've installed [ember-cli-medium-editor](https://github.com/lukebrenton/ember-cli-medium-editor).

`ember install ember-cli-medium-editor`

Then simply run:

`ember install ember-medium-editor-insert`

## Usage

Follow the usage instructions in the [ember-cli-medium-editor](https://github.com/lukebrenton/ember-cli-medium-editor#usage) plugin.

This addon simply includes medium-editor-insert-plugin, initializes it once the `mediumEditor` instance is created and extends the `medium-content-editable` component to include a `insertOptions` object.

```
{{ medium-content-editable value=body options=mediumEditorOptions insertOptions=mediumEditorInsertOptions}}
```

Any valid medium-editor insert options can be passed to the `insertOptions` POJO. For a full list of options, [click here](https://github.com/orthes/medium-editor-insert-plugin/wiki/v2.x-Configuration).

## Example

The following example object be added to an Ember controller and passed via the template to your `medium-content-editable` component. Or it may be added directly to a component which extends `medium-content-editable`.

``` javascript
{
  options: {
    // ... ember-cli-medium-editor options
  },
  insertOptions: {
    enabled: true,
    addons: {
      images: {
        label: '<i class="icon-image"></i>',
        fileUploadOptions: {
          url: `images/upload`,
          acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
          paramName: 'file'
        },
        deleteScript: `images/delete`,
      },
      embeds: {
        label: '<i class="icon-embed"></i>',
        placeholder: 'Paste a YouTube, Vimeo, Facebook, Twitter or Instagram link and press Enter',
        actions: insertActions,
        styles: insertStyles
      }
    }
  }
}
```
