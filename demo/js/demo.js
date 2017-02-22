var app = angular.module('md-editable-demo', [
    'ngMaterial',
    'ngAnimate',
    'md.editable'
]);

app.config(function($mdIconProvider) {
    $mdIconProvider
        .defaultIconSet('images/mdi.svg')
});

app.controller('DemoController', function($mdDialog) {
    var ctrl = this;

    ctrl.title = 'md-editable demo';

    ctrl.text = 'hello world';

    ctrl.number = 42;

    ctrl.select = {
        id: 1,
        name: 'Fred'
    };

    ctrl.selectOptions = [
        { id: 1, name: 'Fred' },
        { id: 2, name: 'Shaggy' },
        { id: 3, name: 'Velma' },
        { id: 4, name: 'Daphne' }
    ];

    ctrl.autoComplete = {
        id: 1,
        name: 'Zorak'
    };

    ctrl.autoCompleteOptions = [
        { id: 1, name: 'Zorak' },
        { id: 2, name: 'Moltar' },
        { id: 3, name: 'Brak' },
        { id: 4, name: 'Lokar' },
        { id: 5, name: 'Transit' },
    ];

    ctrl.onUpdate = function(property, value) {
        ctrl[property] = value;
        $mdDialog.show(
            $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Data updated')
                .textContent('You set ' + property + ' to: ' + value)
                .ariaLabel('update alert')
                .ok('Got it!')
        );
    }

});
