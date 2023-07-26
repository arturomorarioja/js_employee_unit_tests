"use strict";

const { Employee } = require('../classes/employee');

describe('Employee tests', () => {
    let employee = new Employee;

    /**
     * Adds a number of days or years to a specified date
     * @param {*} date      The date days or years will be added to
     * @param {*} unit      'Y' for years, 'D' for days
     * @param {*} amount    The number of years or days to add. If negative, it performs a subtraction
     * @returns             A new date with the desired calculations in place
     */
    const dateAdd = (date, unit, amount) => {
        const startDate = new Date(date);
        let returnDate;
        switch (unit) {
            case 'Y':
                returnDate = new Date(startDate.setFullYear(startDate.getFullYear() + amount));
                break;
            case 'D':
                returnDate = new Date(startDate.setDate(startDate.getDate() + amount));
                break;
        }
        return returnDate;
    };
    
    describe('setter tests', () => {
        beforeEach(() => {
            employee = new Employee;
        });

        const cprProvider = [
            {'value': '1234567890', 'expected': '1234567890'},
            {'value': '0000000000', 'expected': '0000000000'},
            {'value': '9999999999', 'expected': '9999999999'},
            {'value': '99999999999', 'expected': ''},
            {'value': '999999999', 'expected': ''},
            {'value': 1234567890, 'expected': ''},              // AMR: This test actually caught an error (lack of type validation)
            {'value': 12345678901, 'expected': ''},
            {'value': 123456789, 'expected': ''},
            {'value': 'ABCDEFGHIJ', 'expected': ''},
            {'value': true, 'expected': ''},
            {'value': '          ', 'expected': ''},
            {'value': '', 'expected': ''},
        ];     
        describe.each(cprProvider)('cpr is valid', (cpr) => {
            it(`setting ${cpr.value} gets ${cpr.expected}`, () => {
                employee.cpr = cpr.value;

                expect(employee.cpr).toBe(cpr.expected);
            });
        });

        const nameProvider = [
            {'value': 'A', 'expected': 'A'},
            {'value': 'AB', 'expected': 'AB'},
            {'value': 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCD', 'expected': 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCD'},
            {'value': 'ABCDEFGHIJKLMNOPQRSTUVWXYZABC', 'expected': 'ABCDEFGHIJKLMNOPQRSTUVWXYZABC'},
            {'value': 'ABCDEFGHIJKLMN', 'expected': 'ABCDEFGHIJKLMN'},
            {'value': 'abcdefghijklmn', 'expected': 'abcdefghijklmn'},
            {'value': 'æøåñç', 'expected': 'æøåñç'},
            {'value': 'áéíóúàèìòùäëïöü', 'expected': 'áéíóúàèìòùäëïöü'},
            {'value': 'âêîôû', 'expected': 'âêîôû'},
            {'value': 'ÆØÅÑÇ', 'expected': 'ÆØÅÑÇ'},
            {'value': 'ÁÉÍÓÚÀÈÌÒÙÄËÏÖÜ', 'expected': 'ÁÉÍÓÚÀÈÌÒÙÄËÏÖÜ'},
            {'value': 'ÂÊÎÔÛ', 'expected': 'ÂÊÎÔÛ'},
            {'value': 'a a a a a a a', 'expected': 'a a a a a a a'},
            {'value': 'a-a-a-a-a-a-a', 'expected': 'a-a-a-a-a-a-a'},
            {'value': '-', 'expected': '-'},
            {'value': ' ', 'expected': ' '},
            {'value': '', 'expected': ''},
            {'value': 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDE', 'expected': ''},
            {'value': 'abcdef1', 'expected': ''},
            {'value': 'abcdef2', 'expected': ''},
            {'value': 'abcdef/', 'expected': ''},
            {'value': 'abcdef,', 'expected': ''}
        ];
        describe.each(nameProvider)('name is valid', (name) => {
            it(`setting ${name.value} as first name gets ${name.expected}`, () => {
                employee.firstName = name.value;

                expect(employee.firstName).toBe(name.expected);
            });

            it(`setting ${name.value} as last name gets ${name.expected}`, () => {
                employee.lastName = name.value;

                expect(employee.lastName).toBe(name.expected);
            });
        });

        const departmentProvider = [
            {'value': 'HR', 'expected': 'HR'},
            {'value': 'Finance', 'expected': 'Finance'},
            {'value': 'IT', 'expected': 'IT'},
            {'value': 'Sales', 'expected': 'Sales'},
            {'value': 'General Services', 'expected': 'General Services'},
            {'value': 'Bonds', 'expected': ''},
            {'value': '', 'expected': ''},
            {'value': 0, 'expected': ''}
        ];
        describe.each(departmentProvider)('department is valid', (department) => {
            it(`setting ${department.value} gets ${department.expected}`, () => {
                employee.department = department.value;
    
                expect(employee.department).toBe(department.expected);
            });
        })

        const baseSalaryProvider = [
            {'value': 20000, 'expected': 20000},            
            {'value': 20000.01, 'expected': 20000.01},      // AMR: This test actually caught an error, since I had forgotten how weird are JavaScript, Python and Java at calculating decimals             
            {'value': 60000, 'expected': 60000},            
            {'value': 100000, 'expected': 100000},            
            {'value': 99999.99, 'expected': 99999.99},            
            {'value': 25000.348, 'expected': 25000.34},     // AMR: This test case and the next one were created because of the problem found in the previous comment
            {'value': 25000.343, 'expected': 25000.34},
            {'value': 19999.99, 'expected': 0},            
            {'value': 100000.01, 'expected': 0},            
            {'value': 10000, 'expected': 0},            
            {'value': 110000, 'expected': 0},            
            {'value': 0, 'expected': 0},            
            {'value': -1, 'expected': 0},            
            {'value': -1, 'expected': 0},            
            {'value': -10000, 'expected': 0},            
            {'value': false, 'expected': 0},            
        ];
        describe.each(baseSalaryProvider)('base salary is valid', (baseSalary) => {
            it(`setting ${baseSalary.value} gets ${baseSalary.expected}`, () => {
                employee.baseSalary = baseSalary.value;

                expect(employee.baseSalary).toBe(baseSalary.expected);
            });
        });

        const educationalLevelProvider = [
            {'value': 0, 'expected': 'None'},
            {'value': 1, 'expected': 'Primary'},
            {'value': 2, 'expected': 'Secondary'},
            {'value': 3, 'expected': 'Tertiary'},
            {'value': -1, 'expected': 'None'},      // AMR: These 4 test cases caught an error in the getter (I clumsily used OR instead of AND)
            {'value': 4, 'expected': 'None'},
            {'value': 10, 'expected': 'None'},
            {'value': -10, 'expected': 'None'},
        ];
        describe.each(educationalLevelProvider)('educational level is valid', (educationalLevel) => {
            it(`setting ${educationalLevel.value} gets ${educationalLevel.expected}`, () => {
                employee.educationalLevel = educationalLevel.value;

                expect(employee.educationalLevel).toBe(educationalLevel.expected);
            });
        });

        const eighteenYearsAgo = dateAdd(new Date(), 'Y', -18);
        const eighteenYearsAgoMinusOneDay = dateAdd(eighteenYearsAgo, 'D', -1);
        const eighteenYearsAgoMinusTenDays = dateAdd(eighteenYearsAgo, 'D', -10);
        const eighteenYearsAgoMinusEightYears = dateAdd(eighteenYearsAgo, 'Y', -8);
        const eighteenYearsAgoPlusOneDay = dateAdd(eighteenYearsAgo, 'D', 1);
        const eighteenYearsAgoPlusTenDays = dateAdd(eighteenYearsAgo, 'D', 10);
        const eighteenYearsAgoPlusEightYears = dateAdd(eighteenYearsAgo, 'Y', 8);
        const birthDateProvider = [
            {'value': eighteenYearsAgo, 'expected': eighteenYearsAgo},
            {'value': eighteenYearsAgoMinusOneDay, 'expected': eighteenYearsAgoMinusOneDay},
            {'value': eighteenYearsAgoMinusTenDays, 'expected': eighteenYearsAgoMinusTenDays},
            {'value': eighteenYearsAgoMinusEightYears, 'expected': eighteenYearsAgoMinusEightYears},
            {'value': eighteenYearsAgoPlusOneDay, 'expected': undefined},
            {'value': eighteenYearsAgoPlusTenDays, 'expected': undefined},
            {'value': eighteenYearsAgoPlusEightYears, 'expected': undefined},
            {'value': '', 'expected': undefined},
            // {'value': new Date('1970/02/31'), 'expected': undefined},    // JS automatically translates February 31 into March 2
            {'value': 999, 'expected': undefined},
            {'value': true, 'expected': undefined},
        ];
        describe.each(birthDateProvider)('date of birth is valid', (birthDate) => {
            it(`setting ${birthDate.value} gets ${birthDate.expected}`, () => {
                employee.birthDate = birthDate.value;

                expect(employee.birthDate).toBe(birthDate.expected);
            });
        });

        const today = new Date();
        const yesterday = dateAdd(today, 'D', -1);
        const todayMinusTenDays = dateAdd(today, 'D', -10);
        const todayMinusEightYears = dateAdd(today, 'Y', -8);
        const tomorrow = dateAdd(today, 'D', 1);
        const todayPlusTenDays = dateAdd(today, 'D', 10);
        const todayPlusEightYears = dateAdd(today, 'Y', 8);
        const employmentDateProvider = [
            {'value': today, 'expected': today},
            {'value': yesterday, 'expected': yesterday},
            {'value': todayMinusTenDays, 'expected': todayMinusTenDays},
            {'value': todayMinusEightYears, 'expected': todayMinusEightYears},
            {'value': tomorrow, 'expected': undefined},
            {'value': todayPlusTenDays, 'expected': undefined},
            {'value': todayPlusEightYears, 'expected': undefined},
            {'value': '', 'expected': undefined},
            {'value': 999, 'expected': undefined},
            {'value': true, 'expected': undefined},
        ];
        describe.each(employmentDateProvider)('date of employment is valid', (employmentDate) => {
            it(`setting ${employmentDate.value} gets ${employmentDate.expected}`, () => {
                employee.employmentDate = employmentDate.value;

                expect(employee.employmentDate).toBe(employmentDate.expected);
            });
        });

    });

    describe('Calculation tests', () => {
        beforeEach(() => {
            employee = new Employee;
        });

        const salaryProvider = [
            {'baseSalary': 30000, 'educationalLevel': 0, 'expected': 30000},
            {'baseSalary': 30000, 'educationalLevel': 1, 'expected': 31220},
            {'baseSalary': 30000, 'educationalLevel': 2, 'expected': 32440},
            {'baseSalary': 30000, 'educationalLevel': 3, 'expected': 33660},
            {'baseSalary': 10000, 'educationalLevel': 0, 'expected': false},
            {'baseSalary': 110000, 'educationalLevel': 0, 'expected': false},
        ];
        describe.each(salaryProvider)('salary is correctly calculated', (salary) => {
            it(`base salary ${salary.baseSalary} DKK and educational level ${salary.educationalLevel} mean salary ${salary.expected} DKK`, () => {
                employee.baseSalary = salary.baseSalary;
                employee.educationalLevel = salary.educationalLevel;

                expect(employee.getSalary()).toBe(salary.expected);
            });
        });

        const today = new Date();
        const todayMinusOneYear = dateAdd(today, 'Y', -1);
        const todayMinusTenYears = dateAdd(today, 'Y', -10);
        const todayMinusFifteenYears = dateAdd(today, 'Y', -15);
        const todayMinusTwentyThreeYears = dateAdd(today, 'Y', -23);
        const discountProvider = [
            {'employmentDate': today, 'expected': 0},
            {'employmentDate': todayMinusOneYear, 'expected': 0.5},
            {'employmentDate': todayMinusTenYears, 'expected': 5},
            {'employmentDate': todayMinusFifteenYears, 'expected': 7.5},
            {'employmentDate': todayMinusTwentyThreeYears, 'expected': 11.5},
        ];
        describe.each(discountProvider)('discount is correctly calculated', (discount) => {
            it(`date of employment ${discount.employmentDate} means a discount of ${discount.expected}%`, () => {
                employee.employmentDate = discount.employmentDate;

                expect(employee.getDiscount()).toBe(discount.expected);
            });
        });

        const shippingCostsProvider = [
            {'country': 'Denmark', 'expected': 0},
            {'country': 'Norway', 'expected': 0},
            {'country': 'Sweden', 'expected': 0},
            {'country': 'Iceland', 'expected': 50},
            {'country': 'Finland', 'expected': 50},
            {'country': 'DENMARK', 'expected': 100},
            {'country': 'Spain', 'expected': 100},
            {'country': 'ABCDEFG', 'expected': 100},
            {'country': 0, 'expected': 100},
            {'country': true, 'expected': 100},
        ];
        describe.each(shippingCostsProvider)('shipping costs are correctly calculated', (shippingCosts) => {
            it(`country ${shippingCosts.country} means shipping costs of ${shippingCosts.expected}%`, () => {
                employee.country = shippingCosts.country;

                expect(employee.getShippingCosts()).toBe(shippingCosts.expected);
            });
        });
    });
})