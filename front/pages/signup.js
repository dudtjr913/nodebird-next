import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import UseInput from '../hooks/useInput';
import { signUpAction } from '../reducers/user';

const SignUp = () => {
  const [email, onChangeEmail] = UseInput('');
  const [password, onChangePassword] = UseInput('');
  const [nickname, onChangeNickname] = UseInput('');

  const { signUpLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (passwordCheck !== password) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickname, password, passwordCheck);
    return dispatch(signUpAction({ email, nickname, password }));
  }, [email, nickname, term, password, passwordCheck]);
  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <Input
            type="email"
            name="user-email"
            value={email}
            required
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <Input
            name="user-nickname"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <Input.Password
            name="user-password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <label htmlFor="user-password-check">비밀번호체크</label>
        <Input.Password
          name="user-password-check"
          value={passwordCheck}
          required
          onChange={onChangePasswordCheck}
        />
        {passwordError ? (
          <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>
        ) : (
          <div />
        )}
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            회원가입을 하시겠습니까?
          </Checkbox>
        </div>
        {termError && <div style={{ color: 'red' }}>약관에 동의해주세요.</div>}
        <Button loading={signUpLoading} htmlType="submit" type="primary">
          회원가입
        </Button>
      </Form>
    </AppLayout>
  );
};

export default SignUp;
