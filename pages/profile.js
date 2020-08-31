import React from 'react';
import Head from 'next/head';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
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
			<AppLayout>
				<NicknameEditForm />
				<FollowList data={followingList} header="팔로윙수" />
				<FollowList data={followerList} header="팔로워수" />
			</AppLayout>
		</>
	);
};

export default Profile;
