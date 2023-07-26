'use strict';
/**
 * Class Employee
 * @author  Arturo Mora-Rioja (amri@kea.dk)
 * @version 1.0.0, December 2022
 *          1.0.1, December 2022. Rounding errors fixed in the baseSalary setter
 *                                Logic error fixed in the educationalLevel setter (AND instead of OR)
 */

class Employee {
    #departments = ['HR', 'Finance', 'IT', 'Sales', 'General Services'];
    #educationalLevels = ['None', 'Primary', 'Secondary', 'Tertiary'];
    #countriesNoShippingCosts = ['Denmark', 'Sweden', 'Norway'];
    #countriesHalfShippingCosts = ['Iceland', 'Finland'];

    #cpr;
    #firstName;
    #lastName;
    #department;
    #baseSalary;
    #educationalLevel = 0;
    #birthDate;
    #employmentDate;
    #country;

    set cpr(cpr) {        
        if (typeof cpr === 'string' && cpr.match(/^[0-9]{10}$/) !== null) {
            this.#cpr = cpr;
        }
    }

    #nameIsValid(name) {
        return (
            (name.length > 0) &&
            (name.length <= 30) &&
            (name.match(/^[a-zA-ZæøåñçáéíóúàèìòùäëïöüâêîôûÆØÅÑÇÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÂÊÎÔÛ \-]+$/i) !== null)
        );
    }

    set firstName(firstName) {
        if (typeof firstName === 'string' && this.#nameIsValid(firstName)) {
            this.#firstName = firstName;
        }
    }
    set lastName(lastName) {
        if (typeof lastName === 'string' && this.#nameIsValid(lastName)) {
            this.#lastName = lastName;
        }
    }

    set department(department) {
        if (typeof department === 'string' && this.#departments.includes(department)) {
            this.#department = department;
        }
    }

    set baseSalary(baseSalary) {
        if (typeof baseSalary === 'number' && baseSalary >= 20000 && baseSalary <= 100000) {
            
            // Because JS follows the IEEE 754 standard for floating-point arithmetic,
            // the following calculations are necessary to avoid rounding errors
            let baseSalaryString = baseSalary.toString();
            if (baseSalaryString.includes('.')) {
                // If there are more than two decimals, they are removed without letting JS round them,
                // as rounding them up would result in storing a nonexisting monetary value

                // An easier way of achieving this is by doing Math.floor(baseSalary * 100) / 100,
                // but it presents a rounding error derived from the aforementioned use of IEEE 754
                baseSalaryString = baseSalaryString.substring(0, baseSalaryString.length - (baseSalaryString.split('.')[1].length - 2));
                baseSalary = parseFloat(baseSalaryString);
            }

            this.#baseSalary = baseSalary;
        }
    }

    set educationalLevel(eduLevel) {
        if (typeof eduLevel === 'number' && eduLevel >= 0 && eduLevel <= 3) {
            this.#educationalLevel = Math.round(eduLevel);
        }
    }

    set birthDate(birthDate) {
        if (birthDate instanceof Date) {
            const date18yearsAgo = new Date();
            date18yearsAgo.setFullYear(date18yearsAgo.getFullYear() - 18);
            if (birthDate < date18yearsAgo) {
                this.#birthDate = birthDate;
            }
        }
    }

    set employmentDate(employmentDate) {
        if (employmentDate instanceof Date && employmentDate <= new Date()) {
            this.#employmentDate = employmentDate;
        }
    }

    set country(country) {
        if (typeof country === 'string') {
            this.#country = country;
        }
    }

    get cpr() {                 return (this.#cpr !== undefined ? this.#cpr : ''); }
    get firstName() {           return (this.#firstName !== undefined ? this.#firstName : ''); }
    get lastName() {            return (this.#lastName !== undefined ? this.#lastName : ''); }
    get department() {          return (this.#department !== undefined ? this.#department : ''); }
    get baseSalary() {          return (this.#baseSalary !== undefined ? this.#baseSalary : 0); }
    get educationalLevel() {    return this.#educationalLevels[this.#educationalLevel]; }
    get birthDate() {           return this.#birthDate; }
    get employmentDate() {      return this.#employmentDate; }
    get country() {             return (this.#country !== undefined ? this.#country : ''); }

    getSalary() {
        if (this.#baseSalary === undefined) {
            return false;
        } else {
            return this.#baseSalary + (this.#educationalLevel * 1220)
        }
    }

    getDiscount() {
        if (!this.#employmentDate instanceof Date) {
            return false;
        } else {
            const employmentTime = (new Date().getTime() - this.#employmentDate.getTime()) / 1000 / (60 * 60 * 24);
            return Math.abs(Math.round(employmentTime / 365.25)) * 0.5;
        }
    }

    getShippingCosts() {
        if (this.#countriesNoShippingCosts.includes(this.#country)) {
            return 0;
        } else if (this.#countriesHalfShippingCosts.includes(this.#country)) {
            return 50;
        } else {
            return 100;
        }
    }
}

exports.Employee = Employee;