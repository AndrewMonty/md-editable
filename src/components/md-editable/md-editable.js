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
        controller: function(filterFilter)
        {
            var ctrl = this;

            ctrl.$onInit = function()
            {
                ctrl.editable = typeof(ctrl.mdeEditable) == 'undefined' ? true : ctrl.mdeEditable;
                ctrl.editing = false;
                ctrl.selectedItem = false;
                ctrl.newValue = ctrl.mdeValue;
                filterOptions();
            }

            ctrl.$onChanges = function(changes)
            {
                if (changes.mdeValue)
                {
                    ctrl.mdeValue = changes.mdeValue.currentValue;
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
                    ctrl.newValue = selected;
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
        }
    });
