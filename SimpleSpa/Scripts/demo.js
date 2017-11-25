(function () {
    'use strict';
    var MyApp = angular.module("MyApp", ['ngRoute','EmployeeService']);

myRoutes.$inject = ['$routeProvider'];
MyApp.config(myRoutes);

mainController.$inject=['$scope','$location']
MyApp.controller("mainController", mainController);
function mainController($scope,$location) {

    $scope.navLinks = [
        {
            Title: "home", LinkText: "Home"
        },
        {
            Title: "add", LinkText: "Add"
        },
        {
            Title: "edit", LinkText: "Edit"
        },
        {
            Title: "delete", LinkText: "Delete"
        }]


    $scope.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'home';
        return page === currentRoute ? 'active' : '';
    };

}

    function myRoutes($routeProvider) {
    $routeProvider
        .when("/add",
        {
            templateUrl: "/views/add.html",
            controller: "addController",
            controllerAs:"$ctrl"
        }).when("/edit",
        {
            templateUrl: "/views/edit.html",
            controller: "editController",
            controllerAs: "$ctrl"
        }).when("/delete",
        {
            templateUrl: "/views/delete.html",
            controller: "deleteController",
            controllerAs: "$ctrl"
        }).when("/home",
        {
            templateUrl: "/views/home.html",
            controller: "homeController",
            controllerAs: "$ctrl"
        }).otherwise({ redirectTo: "/home" });
}

    MyApp.controller("addController", addController);
    MyApp.controller("editController", editController);
    MyApp.controller("deleteController", deleteController);
    MyApp.controller("homeController", homeController);


    function addController (EmpApi) {
        var vm = this;
        vm.addEmployee=_addEmployee
        vm.message = "We are in ADD view now";
        function _addEmployee() {
            console.log("adding the new employee to database");
            EmpApi.addEmployee(vm.newEmp);
        }
    }

    function editController(EmpApi) {
        var vm = this;
        vm.message = "We are in EDIT view now";
        vm.updateEmployee = _updateEmployee;
        function _updateEmployee() {
            EmpApi.updateEmployee(vm.selectedEmployee);
        }
        getEmployees();
        function getEmployees() {
            EmpApi.getEmployees().then(success, error);
        }

        function success(response) {
            console.log(response);
            vm.employees = response.data;
        }

        function error(response) { console.log(response); }

    }
    function deleteController(EmpApi) {
        var vm = this;
        vm.message = "We are in DELETE view now";

        getEmployees();
        function getEmployees() {
            EmpApi.getEmployees().then(success, error);
        }

        function success(response) {
            console.log(response);
            vm.employees = response.data;
        }

        function error(response) { console.log(response); }
        vm.deleteEmployee = _deleteEmployee;
        function _deleteEmployee() {
            EmpApi.deleteEmployee(vm.selectedEmployee.Id);
        }
    }
    
    function homeController(EmpApi) {
        var vm = this;
        vm.message = "We are in HOME view now";
        
        getEmployees();
        function getEmployees() {
            EmpApi.getEmployees().then(success, error);
        }

        function success(response) {
            console.log(response);
            vm.employees = response.data;
            vm.keys=Object.keys(response.data[0])
        }
        function error(response) { console.log(response); }
    }
})()

    
