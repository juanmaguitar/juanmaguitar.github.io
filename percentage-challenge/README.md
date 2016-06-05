# 15 Ways of doing the same: Percentage Calculator

This folder contains a set of 15 solutions for the same project. 

![percentage view](img/percentage-view.png)

## 01- jQuery 

[run it](http://juanmaguitar.github.io/percentage-challenge/01-jquery) | [see the code](https://github.com/juanmaguitar/juanmaguitar.github.io/tree/master/percentage-challenge/01-jquery)

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

[run it](http://juanmaguitar.github.io/percentage-challenge/02-jquery-v2) | [see the code](https://github.com/juanmaguitar/juanmaguitar.github.io/tree/master/percentage-challenge/02-jquery-v2)


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

[run it](http://juanmaguitar.github.io/percentage-challenge/03-jquery-v3) | [see the code](https://github.com/juanmaguitar/juanmaguitar.github.io/tree/master/percentage-challenge/03-jquery-v3)

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

[run it](http://juanmaguitar.github.io/percentage-challenge/04-jquery-v4) | [see the code](https://github.com/juanmaguitar/juanmaguitar.github.io/tree/master/percentage-challenge/04-jquery-v4)

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

[run it](http://juanmaguitar.github.io/percentage-challenge/05-jquery-v5) | [see the code](https://github.com/juanmaguitar/juanmaguitar.github.io/tree/master/percentage-challenge/05-jquery-v5)

This solution capture the `submit` event of every form (triggered when a button inside of the form is clicked or the enter key is pressed)

In this way we access the elements we need in each case in a more elegant way

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

[run it](http://juanmaguitar.github.io/percentage-challenge/06-jquery-v6) | [see the code](https://github.com/juanmaguitar/juanmaguitar.github.io/tree/master/percentage-challenge/06-jquery-v6)

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

[run it](http://juanmaguitar.github.io/percentage-challenge/07-jquery-v7) | [see the code](https://github.com/juanmaguitar/juanmaguitar.github.io/tree/master/percentage-challenge/07-jquery-v7)

In this solution we wrap our javascript code with...

```javascript
$(document).ready(function($) { 
    // our javascript code
});
```

This allow us to load the javascript file at the top of the page because our code will only be executed when the `document` (html elements) is fully loaded

## 08- jQuery

[run it](http://juanmaguitar.github.io/percentage-challenge/08-jquery-v8) | [see the code](https://github.com/juanmaguitar/juanmaguitar.github.io/tree/master/percentage-challenge/08-jquery-v8)

In this solution we separate the function getResult into an external file. When loaded this file, the function `getResult` will be loaded in the _global scope_ so the functions used as _event handlers_ of events will be able to access it and use it

```html
<script src="get-result.js"></script>
<script src="main.js"></script>
```

## 09- jQuery

[run it](http://juanmaguitar.github.io/percentage-challenge/09-jquery-tdd-v9) | [see the code](https://github.com/juanmaguitar/juanmaguitar.github.io/tree/master/percentage-challenge/09-jquery-tdd-v9)

Now that we have the computation logic separated in a file we can use TDD an create the tests for that specific function. These tests will also serve as documentation of the function 

[execute the tests](http://juanmaguitar.github.io/percentage-challenge/09-jquery-tdd-v9/tests/SpecRunner.html) | [see the tests code](https://github.com/juanmaguitar/juanmaguitar.github.io/blob/master/percentage-challenge/09-jquery-tdd-v9/tests/spec/getResultSpec.js)

## 10- Angular

[run it](http://juanmaguitar.github.io/percentage-challenge/10-angular) | [see the code](https://github.com/juanmaguitar/juanmaguitar.github.io/tree/master/percentage-challenge/10-angular)

This solution uses angular to perform the operations. 

```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular.min.js"></script>
```

Notice how there's no javascript code and how just by using angular attributes ([`ng-app`](https://docs.angularjs.org/api/ng/directive/ngApp), [`ng-model`](https://docs.angularjs.org/api/ng/directive/ngModel) & [`ng-click`](https://docs.angularjs.org/api/ng/directive/ngClick)) we can add the desired behaviour

```html
<html lang="en" ng-app>
```

```html
<form id="f1" action="#" class="form-group">
    <fieldset class="row">
            <div class="col-md-6 ">
                <p>What is <input type="number" id="f1-a" ng-model="f1a" size="3">% of <input type="number" ng-model="f1b" id="f1-b" size="7">?</p>
            </div>
            <!-- (parseInt(f1a)/100)*parseInt(f1b) -->
            <div class="col-md-6">
      <button type='button' id="f1-calculate" ng-click="f1result=(f1a/100)*f1b" class="btn btn-primary">Calculate</button>
                <!-- result = a / 100 * b; -->
      <input id="f1-result" type="number" ng-model="f1result" size="7" readonly="readonly">
      <span class="remove">%</span>
            </div>
    </fieldset>
</form>
```

## 11- Angular

[run it](http://juanmaguitar.github.io/percentage-challenge/11-angular-v2) | [see the code](https://github.com/juanmaguitar/juanmaguitar.github.io/tree/master/percentage-challenge/11-angular-v2)

This solution uses angular to perform the operations but in this case we add 
functions to the scope through **controllers** to be executed in the `ng-click`

To do that we specify the module that will handle the app

```html
<html lang="en" ng-app="myApp">
```

And we add to that module the `controller that will add the functions to the `$scope`

```javascript
angular.module('myApp', [])
    .controller('generalController', function( $scope ){

        $scope.getResultF1 = function(){
            $scope.f1result = ($scope.f1a/100)*$scope.f1b;
        }

        $scope.getResultF2 = function(){
            $scope.f2result=($scope.f1a/$scope.f1b)*100;
        }

        $scope.getResultF3 = function(){
            $scope.f3result=($scope.f3b-$scope.f3a)/$scope.f3a*100
        }

    })
```

## 12- Angular

[run it](http://juanmaguitar.github.io/percentage-challenge/12-angular-v3) | [see the code](https://github.com/juanmaguitar/juanmaguitar.github.io/tree/master/percentage-challenge/12-angular-v3)

In this angular solution we create 3 different controllers to use the same name variables. As each controller create its own `$scope` these variables won't collide with each other

```javascript
angular.module('myApp', [])
    .controller('F1Controller', function( $scope ){
        $scope.getResult = function(){
            $scope.result = ($scope.a/100)*$scope.b;
        }
    })
    .controller('F2Controller', function( $scope ){
        $scope.getResult = function(){
            $scope.result=($scope.a/$scope.b)*100;
        }
    })
    .controller('F3Controller', function( $scope ){
        $scope.getResult = function(){
            $scope.result=($scope.b-$scope.a)/$scope.a*100
        }
    })
```

These controller will be assigned to specific parts of the HTML

```html
<form id="f1" action="#" class="form-group" ng-controller="F1Controller">
    <!-- form f1 content -->
</form>
<form id="f2" action="#" class="form-group" ng-controller="F2Controller">
    <!-- form f2 content -->
</form>
<form id="f3" action="#" class="form-group" ng-controller="F3Controller">
    <!-- form f2 content -->
</form>
```

## 13- Angular

[run it](http://juanmaguitar.github.io/percentage-challenge/13-angular-v4) | [see the code](https://github.com/juanmaguitar/juanmaguitar.github.io/tree/master/percentage-challenge/13-angular-v4)

In this angular solution we split the javascript code in files. To do it we create a file to define the main module **myApp** that will handle the angular app with its dependencies (another module **myControllers** containing the controllers)

```javascript
angular.module('myApp', ['myControllers'])
```

In the other file we create the module _myControllers_ that will contain several controllers and that will assigned as a dependency of the main module

```javascript
angular.module('myControllers', [])
    .controller('F1Controller', function( $scope ){
        $scope.getResult = function(){
            $scope.result = ($scope.a/100)*$scope.b;
        }
    })
    .controller('F2Controller', function( $scope ){
        $scope.getResult = function(){
            $scope.result=($scope.a/$scope.b)*100;
        }
    })
    .controller('F3Controller', function( $scope ){
        $scope.getResult = function(){
            $scope.result=($scope.b-$scope.a)/$scope.a*100
        }
    })
```

## 14- Angular

[run it](http://juanmaguitar.github.io/percentage-challenge/14-angular-v5) | [see the code](https://github.com/juanmaguitar/juanmaguitar.github.io/tree/master/percentage-challenge/14-angular-v5)

In this angular solution we split the javascript code even more and we create an angular `service` to encapsulate the logic of the formulas

```javascript
angular.module('myServices', [])
    .service('serviceFormulas', function( ){
        return {
            formula1 : function(a,b){
                return (a/100)*b;
            },
            formula2 : function(a,b){
                return (a/b)*100;
            },
            formula3 : function(a,b){
                return (b-a)/a*100;
            }

        }
    })
```

The service's module _myServices_ is injected as a dependency of the controller's module _myControllers_. With this the service _serviceFormulas_ can be passed as a parameter of the controllers an can be used inside of them

```javascript
angular.module('myControllers', ['myServices'])
    .controller('F1Controller', function( $scope, serviceFormulas ){
        $scope.getResult = function(){
            $scope.result = serviceFormulas.formula1($scope.a, $scope.b);
        }
    })
    .controller('F2Controller', function( $scope, serviceFormulas  ){
        $scope.getResult = function(){
            $scope.result = serviceFormulas.formula2($scope.a, $scope.b);
        }
    })
    .controller('F3Controller', function( $scope, serviceFormulas  ){
        $scope.getResult = function(){
            $scope.result = serviceFormulas.formula3($scope.a, $scope.b);
        }
    })
```

## 15- Angular

[run it](http://juanmaguitar.github.io/percentage-challenge/15-angular-v6) | [see the code](https://github.com/juanmaguitar/juanmaguitar.github.io/tree/master/percentage-challenge/15-angular-v6)

In this angular solution we create 3 components to be able to express or HTML code like this

```html
<section id="my-forms">

    <block-formula-one></block-formula-one>
    <block-formula-two></block-formula-two>
    <block-formula-three></block-formula-three>

    <p id="tips"><strong>Tips:</strong> Use tab to move to the next field. Use shift-tab to move to the previous field. Press enter to calculate.</p>

</section>
```

The tags `block-formula-one`, `block-formula-two` and `block-formula-three` encapsulate the html code and the javascript behaviour of every part.

To do this we create different modules and create different components under them. We also maintain the service's module _myServices_ (servide _serviceFormulas_) because it will be used in all the components

```html
    <script src="formula1/formula1.module.js"></script>
    <script src="formula1/formula1.component.js"></script>

    <script src="formula2/formula2.module.js"></script>
    <script src="formula2/formula2.component.js"></script>

    <script src="formula3/formula3.module.js"></script>
    <script src="formula3/formula3.component.js"></script>

    <script src="common/services.js"></script>
```

We create three different folders (one for each block) and inside of them we create:

- The definition of the _module_

```javascript
angular.module('formulaOne', ['myServices']);
```

- The definition of the _component_ (_controller_ + _template_)

```javascript
angular
  .module('formulaOne')
  .component('blockFormulaOne', {
    templateUrl: 'formula1/formula1.template.html',
    controller: function( $scope, serviceFormulas ){
      $scope.getResult = function(){
        $scope.result = serviceFormulas.formula1($scope.a, $scope.b);
      }
    }
  });
```

- The template used in each component

```html
<form id="f1" action="#" class="form-group">
  <fieldset class="row">
        <div class="col-md-6 ">
            <p>What is <input type="number" id="f1-a" ng-model="a" size="3">% of <input type="number" ng-model="b" id="f1-b" size="7">?</p>
        </div>
        <!-- (parseInt(f1a)/100)*parseInt(f1b) -->
        <div class="col-md-6">
      <button type='button' id="f1-calculate" ng-click="getResult()" class="btn btn-primary">Calculate</button>
            <!-- result = a / 100 * b; -->
      <input id="f1-result" type="number" ng-model="result" size="7" readonly="readonly">
      <span class="remove">%</span>
        </div>
  </fieldset>
</form>
```