const arrayGetElementWithValue = (array, value, propertyName) => {
	const foundElement = array.find((x) => {
		if (propertyName) {
			return x[propertyName] === value;
		}
		return x === value;
	});
	return foundElement;
};

export {	
	arrayGetElementWithValue,	
};