"use strict";

const { Employee } = require('./classes/employee');

const employee = new Employee;

employee.cpr = '0000090000';
employee.firstName = 'Jonas';
employee.lastName = 'Hellborg';
employee.department = 'IT';
employee.baseSalary = 35000.678;
employee.educationalLevel = 2;
employee.birthDate = new Date('2004-12-08');
employee.employmentDate = new Date('2011-12-08');
employee.country = 'Iceland';

console.log(employee.cpr);
console.log(employee.firstName);
console.log(employee.lastName);
console.log(employee.department);
console.log(employee.baseSalary);
console.log(employee.educationalLevel);
console.log(employee.birthDate);
console.log(employee.employmentDate);
console.log(employee.country);

console.log('Salary: ' + employee.getSalary());
console.log('Discount: ' + employee.getDiscount());
console.log('Shipping costs: ' + employee.getShippingCosts());