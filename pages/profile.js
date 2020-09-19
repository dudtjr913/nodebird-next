import React from 'react';
import Head from 'next/head';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';

const Profile = () => {
	const { user, logInDone } = useSelector((state) => state.user);

	const followingList = [
		{ nickname: 'yeong' },
		{ nickname: 'cheon' },
		{ nickname: 'bak' },
	];
	const followerList = [
		{ nickname: 'yeong' },
		{ nickname: 'cheon' },
		{ nickname: 'bak' },
	];
	return (
		<>
			<Head>
				<title>프로필</title>
			</Head>

			{logInDone ? (
				<AppLayout>
					<NicknameEditForm />
					<FollowList data={user.Followings} header="팔로잉" />
					<FollowList data={user.Followers} header="팔로워" />{' '}
				</AppLayout>
			) : (
				<AppLayout>
					<div
						style={{
							width: '100%',
							textAlign: 'center',
							marginTop: '50px',
							fontSize: '30px',
						}}>
						로그인을 해주세요.
					</div>
				</AppLayout>
			)}
		</>
	);
};

export default Profile;
