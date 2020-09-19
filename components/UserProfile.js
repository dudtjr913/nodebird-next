import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
	const dispatch = useDispatch();
	const { isLoggingOut } = useSelector((state) => state.user);
	const LogOutForm = useCallback(() => {
		dispatch(logoutRequestAction());
	}, []);
	return (
		<Card
			actions={[
				<div key="twit">
					짹짹
					<br />0
				</div>,
				<div key="followings">
					짹짹
					<br />0
				</div>,
				<div key="followings">
					짹짹
					<br />0
				</div>,
			]}>
			<Card.Meta avatar={<Avatar>ZC</Avatar>} title="Yeong" />
			<Button loading={isLoggingOut} onClick={LogOutForm}>
				로그아웃
			</Button>
		</Card>
	);
};

export default UserProfile;
