# 15 Ways of doing the same: Percentage Calculator

This folder contains a set of 15 solutions for the same project. 

![percentage view](img/percentage-view.png)

## 01- jQuery 

This solution uses the jQuery library to listen to the "click" event and access the different elements in the page to perform the operations.

The `input` fields have the attribute `type="text"` so we need to to transform the strings obtained when reading the values to numbers (with [`parseInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt))

```javascript
$('#f1-calculate').on('click', function(event) {
    event.preventDefault();
    var a = $("#f1-a").val();
    var b = $("#f1-b").val();
    var result = parseInt(a) / 100 * parseInt(b);
    $('#f1-result').val( result )
});
```

## 02- jQuery

This solution changes the type of the `input` to `type="text"` to read directly numbers from the inputs (and avoid the use of `parseInt`)

```javascript
$('#f1-calculate').on('click', function(event) {
    event.preventDefault();
    var a = $("#f1-a").val();
    var b = $("#f1-b").val();
    var result = a/100*b;
    $('#f1-result').val( result )
});
```

## 03- jQuery

This solution separates the logic of the calculation into a global function `getResult`

```javascript
function getResult( formula, a, b ) {
    var result = 0;
    switch (formula) {
        case "f1":
            result = a/100*b;
            break;
        case "f2":
            result = a/b*100;
            break;
        case "f3":
            result = (b-a)/a*100;
            break;
        default:
            result = -1;
    }
    return result;
}
```

And applies the event delegation to capture only one event in the page (the `click` on the container `<section id="my-forms">`). 

When this container is clicked we will _delegate_ the event and will only execute the _event handler_ when one of its buttons is clicked

Inside the _event handler_ we use the `event` object passed as a parameter on any _event handler_ to detect the specific button clicked and the proper elements that need to be selected

```javascript
$('#my-forms').on('click', 'button', function(event) {
    event.preventDefault();
    var $form = $(event.target).closest("form"); // closest "parent" form
    var idFormula = $form.attr("id"); // "f1", "f2" or "f3"
    // Operands & Formula
    var a = $("#" + idFormula + "-a").val();
    var b = $("#" + idFormula + "-b").val();
    var result = getResult(idFormula, a, b)
    // Write Result in proper input
    $("#" + idFormula + "-result").val( result )
});
```

## 04- jQuery

This solution has a shorter version of `getResult` taking into account that we can `return` a value (going out of the function) at any point of the function

```javascript
function getResult( formula, a, b ) {
    switch (formula) {
        case "f1":
            return a/100*b;
        case "f2":
            return a/b*100;
        case "f3":
            return (b-a)/a*100;
        default:
            return -1;
    }
}
```

## 05- jQuery

This solution capture the `submit` event of every form (triggered when a button inside of the form is clicked or the enter key is pressed)

In this way we access the elements we need en each case in a more elegant way

```javascript
$('form').on('submit', function(event) {
    event.preventDefault();
    var idFormula = $(this).attr("id"); // "f1", "f2" or "f3"
    var preId = "#" + idFormula;
    // Operands & Formula
    var a = $( preId + "-a").val();
    var b = $( preId + "-b").val();
    var result = getResult(idFormula, a, b)
    // Write Result in proper input
    $( preId + "-result").val( result )
});
```

## 06- jQuery

In this solution we just create separate files for the javascript and css content and load them with the proper tags

```html
    <link rel="stylesheet" href="styles.css">
```

```html
    <script src="https://code.jquery.com/jquery-2.0.3.min.js"></script>
    <script src="main.js"></script>
```

Note that the css is loaded in the `<head>` and the javascript is loaded just before closing the `<body>` tag

We need to load the javascript after the HTML because we are selecting elements of the page (elements of the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)) and doing things with them

If we try to select them before those elements are fully loaded we'll get errors

## 07- jQuery

In this solution we wrap our javascript code with...

```javascript
$(document).ready(function($) { 
    // our javascript code
});
```

This allow us to load the javascript file at the top of the page because our code will only be executed when the `document` (html elements) is fully loaded

