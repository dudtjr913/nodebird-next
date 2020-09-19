import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../reducers/user';

const UserProfile = () => {
	const dispatch = useDispatch();
	const { logOutLoading, user } = useSelector((state) => state.user);
	const LogOutForm = useCallback(() => {
		dispatch(logoutAction());
	}, []);
	return (
		<Card
			actions={[
				<div key="twit">
					짹짹
					<br />
					{user.Posts.length}
				</div>,
				<div key="followings">
					짹짹
					<br />
					{user.Followings.length}
				</div>,
				<div key="followings">
					짹짹
					<br />
					{user.Followers.length}
				</div>,
			]}>
			<Card.Meta avatar={<Avatar>ZC</Avatar>} title="Yeong" />
			<Button loading={logOutLoading} onClick={LogOutForm}>
				로그아웃
			</Button>
		</Card>
	);
};

export default UserProfile;
