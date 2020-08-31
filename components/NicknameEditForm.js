import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';

const InputStyle = styled(Input.Search)`
	margin-bottom: 20px;
	border: 1px solid gray;
	padding: 20px;
`;
const NicknameEditForm = () => {
	return (
		<>
			<InputStyle
				addonBefore="닉네임"
				placeholder="Edit your name"
				enterButton="수정"
			/>
		</>
	);
};

export default NicknameEditForm;
