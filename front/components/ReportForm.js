import React, { useCallback, useState } from 'react';
import { Row, Col, Form, Button, Input } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { REPORT_POST_REQUEST } from '../reducers/post';

const ReportForm = ({ setReport, postId }) => {
  const [reportValue, setReportValue] = useState(null);
  const [etc, setEtc] = useState(false);
  const [etcValue, setEtcValue] = useState('');
  const dispatch = useDispatch();

  const EtcValueChange = useCallback((e) => {
    setEtcValue(e.target.value);
  }, []);

  const handleOnValue = useCallback((e) => {
    setEtc(false);
    const value = document.getElementsByClassName('check');
    Array.prototype.forEach.call(value, (v) => {
      v.checked = false;
    });
    e.target.checked = true;
    if (e.target.value === '4') {
      return setEtc(true);
    }
    setReportValue(e.target.value);
  }, []);

  const handleOnSubmit = useCallback(() => {
    if (!reportValue && etcValue) {
      const reConfirm = window.confirm('정말로 게시글을 신고하시겠습니까?');
      if (!reConfirm) {
        return null;
      }
      dispatch({
        type: REPORT_POST_REQUEST,
        data: { etcValue, postId },
      });
      setEtcValue('');
    } else {
      const reConfirm = window.confirm('정말로 게시글을 신고하시겠습니까?');
      if (!reConfirm) {
        return null;
      }
      dispatch({
        type: REPORT_POST_REQUEST,
        data: { reportValue, postId },
      });
    }
    setReport(false);
  }, [reportValue, etcValue]);

  return (
    <Form onFinish={handleOnSubmit}>
      {console.log(postId)}
      <Row>
        <Col span={24}>
          <input
            type="checkbox"
            className="check"
            id={`${postId}a`}
            value="1"
            onClick={handleOnValue}
          />
          <label htmlFor={`${postId}a`}> 선정적인 게시글입니다.</label>
        </Col>
        <Col span={24}>
          <input
            type="checkbox"
            className="check"
            id={`${postId}b`}
            value="2"
            onClick={handleOnValue}
          />
          <label htmlFor={`${postId}b`}> 욕설이 있는 게시글입니다.</label>
        </Col>
        <Col span={24}>
          <input
            type="checkbox"
            className="check"
            id={`${postId}c`}
            value="3"
            onClick={handleOnValue}
          />
          <label htmlFor={`${postId}c`}> 유해하거나 위험한 게시글입니다.</label>
        </Col>
        <Col span={24}>
          <input
            type="checkbox"
            className="check"
            id={`${postId}d`}
            value={4}
            onClick={handleOnValue}
          />
          <label htmlFor={`${postId}d`}> 기타</label>
        </Col>
        <Col span={24}>
          {etc && (
            <Input
              placeholder="신고하려는 이유를 적어주십시오."
              value={etcValue}
              onChange={EtcValueChange}
            />
          )}
        </Col>
      </Row>
      <Button htmlType="submit">확인</Button>
      <Button onClick={() => setReport(false)}>취소</Button>
    </Form>
  );
};

ReportForm.propTypes = {
  setReport: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};

export default ReportForm;
