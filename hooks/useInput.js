import React, { useState, useCallback } from 'react';

const UseInput = (initialKey = null) => {
	const [value, setValue] = useState(initialKey);
	const onChangeValue = useCallback((e) => {
		setValue(e.target.value);
	}, []);
	return [value, onChangeValue];
};

export default UseInput;
