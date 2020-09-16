import React, { useCallback, useState } from 'react';
import { Input, Form, Button } from 'antd';
import PropTypes from 'prop-types';

const CommentForm = ({ comments }) => {
	const [comment, setComment] = useState('');
	const onChangeText = useCallback((e) => {
		setComment(e.target.value);
	}, []);
	const onCommentSubmit = useCallback(() => {
		console.log(comments, comment);
		setComment('');
	}, [comment]);
	return (
		<Form onFinish={onCommentSubmit}>
			<Form.Item>
				<Input.TextArea
					rows={4}
					style={{ marginTop: '5px' }}
					maxLength={150}
					onChange={onChangeText}
					value={comment}
					placeholder="댓글"
				/>
				<Button
					style={{ float: 'right', marginTop: '5px' }}
					type="primary"
					htmlType="submit">
					작성
				</Button>
			</Form.Item>
		</Form>
	);
};

CommentForm.propTypes = {
	comments: PropTypes.arrayOf(
		PropTypes.shape({
			User: PropTypes.shape({
				nickname: PropTypes.string,
			}),
			content: PropTypes.string,
		}),
	),
};

export default CommentForm;
