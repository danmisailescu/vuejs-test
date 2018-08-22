/* global describe, it, expect */

import {	
	arrayGetElementWithValue,	
} from './commonLogic';

const obj5 = {
	name: 'five',
	value: 5,
};
const obj2 = {
	name: 'two',
	value: 2,
};
const obj8 = {
	name: 'eight',
	value: 8,
};

describe('arrayGetElementWithValue', () => {
	it('numbers without propertyName', () => {
		const array = [5, 2, 8, 9];
		expect(arrayGetElementWithValue(array, 2)).toBe(2);
		expect(arrayGetElementWithValue(array, 30)).toBe(undefined);
		expect(arrayGetElementWithValue(array, 9)).toBe(9);
	});
	it('objects without propertyName', () => {
		const array = [obj5, obj2, obj8];
		expect(arrayGetElementWithValue(array, obj5)).toBe(obj5);
		expect(arrayGetElementWithValue(array, {})).toBe(undefined);
		expect(arrayGetElementWithValue(array, obj2)).toBe(obj2);
	});
	it('objects with propertyName', () => {
		const array = [obj5, obj2, obj8];
		expect(arrayGetElementWithValue(array, 5, 'value')).toBe(obj5);
		expect(arrayGetElementWithValue(array, 30, 'value')).toBe(undefined);
		expect(arrayGetElementWithValue(array, 2, 'value')).toBe(obj2);
	});
	it('objects with notExistingPropertyName', () => {
		const array = [obj5, obj2, obj8];
		expect(arrayGetElementWithValue(array, 5, 'notExistingPropertyName')).toBe(undefined);
		expect(arrayGetElementWithValue(array, 30, 'notExistingPropertyName')).toBe(undefined);
		expect(arrayGetElementWithValue(array, 2, 'notExistingPropertyName')).toBe(undefined);
	});
});