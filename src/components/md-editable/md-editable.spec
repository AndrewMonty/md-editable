describe('mdEditable component', function() {

    var $componentController;

    beforeEach(module('md.editable'));

    beforeEach(inject(function(_$componentController_) {
        $componentController = _$componentController_;
    }));

    it('should receive bindings defined', function() {
        var bindings = {
            mdeEditable: true,
            mdeLabel: 'test label',
            mdeProperty: 'test property',
            mdeValue: 'test value',
            mdeType: 'select',
            mdeOptions: [
                { id: 1, name: 'option one' },
                { id: 2, name: 'option two' },
                { id: 3, name: 'option three' }
            ],
            mdeOptionDisplay: 'name',
            mdeOptionValue: 'id',
            onUpdate: 'callback'
        };

        var ctrl = $componentController('mdEditable', null, bindings);
        ctrl.$onInit();

        expect(ctrl.mdeEditable).toBe(bindings.mdeEditable);
        expect(ctrl.editable).toBe(bindings.mdeEditable);
        expect(ctrl.mdeLabel).toBe(bindings.mdeLabel);
        expect(ctrl.mdeProperty).toBe(bindings.mdeProperty);
        expect(ctrl.mdeValue).toBe(bindings.mdeValue);
        expect(ctrl.mdeType).toBe(bindings.mdeType);
        expect(ctrl.mdeOptions).toBe(bindings.mdeOptions);
        expect(ctrl.mdeOption).toBe(bindings.mdeOption);
        expect(ctrl.mdeOption).toBe(bindings.mdeOption);
        expect(ctrl.onUpdate).toBe(bindings.onUpdate);
    });

    it('should default to true when no mdeEditable binding is passed', function() {
        var bindings = {};

        var ctrl = $componentController('mdEditable', null, bindings);
        ctrl.$onInit();

        expect(ctrl.editable).toBe(true);
    });

    it('should filter options', function() {
        var options = [
            { id: 1, name: 'option one' },
            { id: 2, name: 'option two' },
            { id: 3, name: 'option three' }
        ];

        var filteredOptions = options.slice(1, 2);

        var bindings = {
            mdeOptions: options
        };

        var ctrl = $componentController('mdEditable', null, bindings);
        ctrl.$onInit();

        expect(ctrl.filteredOptions).toEqual(options);

        ctrl.searchText = 'two';
        ctrl.onSearchTextChanged();

        expect(ctrl.filteredOptions).toEqual(filteredOptions);

    });

    it('should process changes to bindings', function() {
        var oldLabel = 'steve';
        var newLabel = 'brule';

        var bindings = {
            mdeLabel: oldLabel
        };

        var ctrl = $componentController('mdEditable', null, bindings);

        expect(ctrl.mdeLabel).toBe(bindings.mdeLabel);

        var changes = {
            mdeLabel: {
                currentValue: newLabel
            }
        };

        ctrl.$onChanges(changes);

        expect(ctrl.mdeLabel).toBe(newLabel);
    });
});
