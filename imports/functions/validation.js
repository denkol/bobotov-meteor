export const isValidEmail = value => {
	const filter = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return filter.test(value);
};

export const isValidPhone = value => {
	const filter = /^([0-9\(\)\/\+ \-]*)$/; 
	return filter.test(value);
};