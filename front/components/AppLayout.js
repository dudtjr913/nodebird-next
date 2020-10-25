import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [searchValue, setSearchValue] = useState('');

  const changeSearchValue = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const handleOnSearch = useCallback(() => {
    if (!searchValue) {
      return alert('검색어를 입력해주세요.');
    }
    Router.push(`/hashtag/${searchValue}`);
  }, [searchValue]);

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
          <SearchInput
            value={searchValue}
            onChange={changeSearchValue}
            onSearch={handleOnSearch}
            placeholder="input search text"
            enterButton
          />
        </Menu.Item>
        {!me && (
          <Menu.Item>
            <Link href="/signup">
              <a>회원가입</a>
            </Link>
          </Menu.Item>
        )}
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://blog.naver.com/dudtjr913"
            target="_blank"
            rel="noreferrer noopener"
          >
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
