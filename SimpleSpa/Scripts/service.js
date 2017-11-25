(function () {
    'use strict';
var EmployeeService = angular.module('EmployeeService', []);


EmployeeService.factory("EmpApi", function($http){

    var EmpApi = {};
    EmpApi.getEmployees = function () {
        return $http.get('http://localhost:58295/api/employees');
    };
    EmpApi.addEmployee = function (emp) {
        return $http.post('http://localhost:58295/api/employees',emp);
    };
    EmpApi.updateEmployee = function (emp) {
        return $http({
            method: 'put',
            url: 'http://localhost:58295/api/employees/' + emp.Id,
            data: emp
        });
    };
    EmpApi.deleteEmployee = function (empId) {
        return $http({
            method: 'delete',
            url: 'http://localhost:58295/api/employees/' + empId
        });     
    };
    return EmpApi;
    
})
})()