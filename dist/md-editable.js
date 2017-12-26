angular.module('md.editable', [
    'ngMaterial',
    'ngAnimate'
]);

angular.module('md.editable').run(['$templateCache', function($templateCache) {$templateCache.put('md-editable/md-editable.html','<div layout="row" layout-align="start center">\n\n    <label>{{ $ctrl.mdeLabel }}</label>\n\n    <div ng-hide="$ctrl.editing"\n        layout="row" layout-align="start center" flex>\n        <span flex>{{ $ctrl.mdeValue }}</span>\n        <md-button ng-if="$ctrl.editable"\n            class="md-icon-button mde-edit-button"\n            ng-click="$ctrl.edit()">\n            <md-icon md-svg-icon="pencil"></md-icon>\n        </md-button>\n    </div>\n\n    <div ng-if="$ctrl.editable" ng-show="$ctrl.editing"\n        layout="row" layout-align="start center" flex>\n        <md-button class="md-icon-button mde-cancel-button"\n            ng-click="$ctrl.cancel()">\n            <md-icon md-svg-icon="close"></md-icon>\n            <md-tooltip>cancel</md-tooltip>\n        </md-button>\n\n        <md-input-container ng-if="$ctrl.mdeType==\'text\'" flex>\n            <input type="text" flex\n                ng-model="$ctrl.newValue" />\n        </md-input-container>\n\n        <md-input-container ng-if="$ctrl.mdeType==\'number\'" flex>\n            <input type="number" flex\n                ng-model="$ctrl.newValue" />\n        </md-input-container>\n\n        <md-select ng-if="$ctrl.mdeType==\'select\'" flex\n            ng-model="$ctrl.newValue">\n            <md-option ng-repeat="option in $ctrl.mdeOptions" ng-value="option">\n                {{ option[$ctrl.mdeOptionDisplay] }}\n            </md-option>\n        </md-select>\n\n        <md-autocomplete ng-if="$ctrl.mdeType==\'autocomplete\'" flex\n            md-search-text="$ctrl.searchText"\n            md-search-text-change="$ctrl.onSearchTextChanged()"\n            md-selected-item="$ctrl.selectedItem"\n            md-selected-item-change="$ctrl.onSelectedItemChanged($ctrl.selectedItem)"\n            md-items="option in $ctrl.filteredOptions"\n            md-item-text="option[$ctrl.mdeOptionDisplay]"\n            md-min-length="0">\n            <md-item-template>\n                <span md-highlight-text="$ctrl.searchText" md-highlight-flags="^i">{{option[$ctrl.mdeOptionDisplay]}}</span>\n            </md-item-template>\n            <md-not-found>\n                No results matching "{{ctrl.searchText}}" were found.\n            </md-not-found>\n        </md-autocomplete>\n\n        <md-button class="md-icon-button mde-save-button"\n            ng-click="$ctrl.update($ctrl.mdeProperty, $ctrl.newValue)"\n            ng-disabled="!$ctrl.newValue">\n            <md-icon md-svg-icon="content-save"></md-icon>\n            <md-tooltip>save</md-tooltip>\n        </md-button>\n    </div>\n\n</div>\n');}]);
angular.module('md.editable')
    .component('mdEditable', {
        bindings: {
            mdeEditable: '<',
            mdeLabel: '<',
            mdeProperty: '<',
            mdeValue: '<',
            mdeType: '<',
            mdeOptions: '<',
            mdeOptionDisplay: '<',
            mdeOptionValue: '<',
            onUpdate: '&'
        },
        templateUrl: 'md-editable/md-editable.html',
        controller: ["filterFilter", function(filterFilter)
        {
            var ctrl = this;

            ctrl.$onInit = function()
            {
                ctrl.editable = typeof(ctrl.mdeEditable) == 'undefined' ? true : ctrl.mdeEditable;
                ctrl.editing = false;
                ctrl.selectedItem = false;
                ctrl.newValue = ctrl.mdeValue;
                ctrl.searchText = '';
                filterOptions();
            }

            ctrl.$onChanges = function(changes)
            {
                if (changes.mdeValue)
                {
                    ctrl.mdeValue = changes.mdeValue.currentValue;
                    ctrl.newValue = ctrl.mdeValue;
                    ctrl.cancel();
                }
                if (changes.mdeOptions)
                {
                    ctrl.mdeOptions = changes.mdeOptions.currentValue;
                    filterOptions();
                }
                if (changes.mdeEditable)      { ctrl.mdeEditable = changes.mdeEditable.currentValue; }
                if (changes.mdeLabel)         { ctrl.mdeLabel = changes.mdeLabel.currentValue; }
                if (changes.mdeProperty)      { ctrl.mdeProperty = changes.mdeProperty.currentValue; }
                if (changes.mdeType)          { ctrl.mdeType = changes.mdeType.currentValue; }
                if (changes.mdeOptionDisplay) { ctrl.mdeOptionDisplay = changes.mdeOptionDisplay.currentValue; }
                if (changes.mdeOptionValue)   { ctrl.mdeOptionValue = changes.mdeOptionValue.currentValue; }
            }

            ctrl.edit = function()
            {
                ctrl.searchText = '';
                ctrl.editing = true;
            }

            ctrl.cancel = function()
            {
                ctrl.editing = false;
            }

            ctrl.onSearchTextChanged = function()
            {
                filterOptions();
            }

            ctrl.onSelectedItemChanged = function(selected)
            {
                if (typeof selected != 'undefined' && selected != null)
                {
                    if (ctrl.mdeOptionValue) {
                        ctrl.newValue = selected[ctrl.mdeOptionValue];
                    } else {
                        ctrl.newValue = selected;
                    }
                }
            }

            ctrl.update = function(property, newValue)
            {
                ctrl.onUpdate({
                    property: property,
                    value: newValue
                });
            }

            function filterOptions()
            {
                ctrl.filteredOptions = filterFilter(ctrl.mdeOptions, ctrl.searchText);
            }
        }]
    });
