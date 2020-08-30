import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';

const UserProfile = ({ setIsLoggedIn }) => {
	const LogOutForm = useCallback(() => {
		setIsLoggedIn(false);
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
			<Button onClick={LogOutForm}>로그아웃</Button>
		</Card>
	);
};

export default UserProfile;
