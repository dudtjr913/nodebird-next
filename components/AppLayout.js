import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const SearchInput = styled(Input.Search)`
	vertical-align: middle;
`;

const AppLayout = ({ children }) => {
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	return (
		<div>
			<Menu mode="horizontal">
				<Menu.Item>
					<Link href="/">
						<a>메인화면</a>
					</Link>
				</Menu.Item>
				<Menu.Item>
					<Link href="/profile">
						<a>프로필</a>
					</Link>
				</Menu.Item>
				<Menu.Item>
					<SearchInput placeholder="input search text" enterButton />
				</Menu.Item>
				<Menu.Item>
					<Link href="/signup">
						<a>회원가입</a>
					</Link>
				</Menu.Item>
			</Menu>
			<Row gutter={8}>
				<Col xs={24} md={6}>
					{isLoggedIn ? <UserProfile /> : <LoginForm />}
				</Col>
				<Col xs={24} md={12}>
					{children}
				</Col>
				<Col xs={24} md={6}>
					<a
						href="https://blog.naver.com/dudtjr913"
						target="_blank"
						rel="noreferrer noopener">
						My Blog
					</a>
				</Col>
			</Row>
		</div>
	);
};

AppLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AppLayout;
