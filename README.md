<span style="font-size:20px"><b>trselect.js</b> -- multi-select box with search functionality!</span>

Table of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Usage](#usage)
  - [initiation](#initiation)
  - [Methods](#methods)
- [Implementation Details](#implementation-details)
  - [jQuery Objects](#jquery-objects)
  - [Handler Events](#handler-events)
- [References](#references)


# Features

* Clear All
* Select All
* Search bar (case insensitive)
* Auto update the input if `<select>` is updated using Javascript


# Requirements

* jQuery (>=1.11.1)
* (Optional but recommended) Boostrap (>=3.3.5)


# Usage

## initiation

```JS
$('???').trselect(Object settings);
```

**Parameters:**

* Object settings for trselect with key:value [default]
  * search: boolean [true] -- include search bar?
  * buttons: boolean [true] -- include Clear All and Select All buttons
  * btn_clear_class: string ['trselect-button btn btn-sm btn-danger'] -- class for 'clear all' button
  * btn_all_class: string ['trselect-button btn btn-sm btn-success'] -- class for 'select all' button
  * search_input_class: string ['form-control input-sm'] -- class for search bar
  * itemTitle: string ['Selected'] -- text to let user know how many items have been selected
  * showEachItem: boolean [false] -- list all items separated by comma instead of using itemTitle
  * dropdownMaxHeight: string ['auto'] -- string of CSS parameter for maximum height of the dropdown menu (e.g. 100px)

**Other settings:**

Classes and styles are copied from the original `<select>` tag to the `<input display>`  upon initialization

## Methods

* To update the display to match modification to selection of `<select>` using JS (e.g. setting .val() ), run `.change()` on the object.
* To update select input options, run `.trigger("load")` on the `<select>` object after its modification with Javascript. This will also run .change().

# Implementation Details

<b style="color:red;">For developers who intend to modify this script.</b>

## jQuery Objects

* $select = main `<select>`
* $displaybox = `<input>` for displaying the list of selected items
* *$list = `<ul>` the displayed list for user to select
  * $li = `<li>` selectable list items
  * $checkbox = `<input type='checkbox'>` a checkbox for selecting item
* $searchInput = `<input>` for searching select items

## Handler Events

* $displaybox.on("set_text")
  * set the display text of $displaybox
* $select.change()
  * update $list checked status
  * $displaybox.trigger("set_text")
* $select.trigger("load")
  * redraw the $list
  * run $select.change()
* $checkbox.change()
  * check/uncheck $select options
  * $displaybox.trigger("set_text")
*  $li.click()
   * $checkbox.change()
* $selectall.click()
  * check all $checkbox
  * select all $select.options
  * $displaybox.trigger("set_text")
* $clearall.click()
  * uncheck all $checkbox
  * unselect all $select.options
  * $displaybox.trigger("set_text")
* $seachInput.click()
  * prevent defocus
* $searchInput.on("keyup")
  * perform search

# References

* jQuery plugin https://learn.jquery.com/plugins/
* jQuery plugin creation with Widget Factory https://learn.jquery.com/jquery-ui/widget-factory/https://learn.jquery.com/plugins/basic-plugin-creation/
* easySelect https://github.com/Vs-tev/easySelect
