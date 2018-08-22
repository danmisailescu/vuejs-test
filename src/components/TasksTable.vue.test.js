
/* global describe, it, expect */

import Vue from 'vue';
import TasksTable from './TasksTable';

const getMountedComponent = (Component, propsData) => {
	const Constructor = Vue.extend(Component);
	const vm = new Constructor({ propsData: propsData }).$mount();
	return vm;
};

describe('TasksTable', () => {
	it('has a created hook', () => {
		expect(typeof TasksTable.mounted).toBe('function');
	});

	it('sets the correct default data', () => {
		expect(typeof TasksTable.data).toBe('function');
		const defaultData = TasksTable.data();
		expect(defaultData.jobTaskRows).toEqual([]);		
	});

	it('mounts correctly with different props', () => {
		const vm = getMountedComponent(TasksTable, {});
		expect(vm.$options.propsData).toEqual({});
	});
});
