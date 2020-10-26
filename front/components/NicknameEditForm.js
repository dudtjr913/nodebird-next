import React, { useCallback } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const InputStyle = styled(Input.Search)`
  margin-bottom: 20px;
  border: 1px solid gray;
  padding: 20px;
`;
const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const { changeNicknameLoading } = useSelector((state) => state.user);
  const handleOnChangeNickname = useCallback((value) => {
    const reConfirm = window.confirm('정말로 닉네임을 변경하시겠습니까?');
    if (!reConfirm) {
      return null;
    }
    return dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: value,
    });
  }, []);

  return (
    <>
      <InputStyle
        addonBefore="닉네임"
        placeholder="Edit your name"
        enterButton="수정"
        loading={changeNicknameLoading}
        onSearch={handleOnChangeNickname}
      />
    </>
  );
};

export default NicknameEditForm;
