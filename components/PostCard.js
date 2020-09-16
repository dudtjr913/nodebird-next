import React, { useCallback, useState } from 'react';
import { Card, Popover, Button, Avatar, Comment, List, Tooltip } from 'antd';
import {
	RetweetOutlined,
	HeartOutlined,
	HeartTwoTone,
	MessageOutlined,
	EllipsisOutlined,
} from '@ant-design/icons';
import PostImages from './PostImages';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm';
import moment from 'moment';

const PostCard = ({ post }) => {
	const [liked, setLiked] = useState(false);
	const [commented, setCommented] = useState(false);
	const { user } = useSelector((state) => state.user);
	const id = user?.id;
	const handleOnLike = useCallback(() => {
		setLiked((prev) => !prev);
	}, []);
	const handleOnComment = useCallback(() => {
		setCommented((prev) => !prev);
	}, []);
	return (
		<div>
			<Card
				cover={post.Images[0] && <PostImages images={post.Images} />}
				actions={[
					<RetweetOutlined key="retweet" />,
					liked ? (
						<HeartTwoTone key="twotone" onClick={handleOnLike} />
					) : (
						<HeartOutlined key="heart" onClick={handleOnLike} />
					),
					<MessageOutlined key="comment" onClick={handleOnComment} />,
					<Popover
						key="more"
						content={
							<Button.Group>
								{id && id === post.User.id ? (
									<>
										<Button>수정</Button>
										<Button type="danger">삭제</Button>
									</>
								) : (
									<Button>신고</Button>
								)}
							</Button.Group>
						}>
						<EllipsisOutlined />
					</Popover>,
				]}>
				<Card.Meta
					avatar={<Avatar>{post.User.id[0].toUpperCase()}</Avatar>}
					title={post.User.nickname}
					description={post.content}
				/>
			</Card>
			{commented && (
				<div>
					<CommentForm post={post} />
					<List
						header={`${post.Comments.length}개의 댓글`}
						itemLayout="horizontal"
						dataSource={post.Comments}
						renderItem={(comments) => (
							<li>
								<Comment
									actions={[<span key="reply-comment">답장</span>]}
									author={comments.User.nickname}
									avatar={
										<Avatar>{comments.User.nickname[0].toUpperCase()}</Avatar>
									}
									content={comments.content}
									datetime={
										<Tooltip
											title={moment().subtract().format('YYYY-MM-DD HH:mm:ss')}>
											<span>{moment().subtract().fromNow()}</span>
										</Tooltip>
									}
								/>
							</li>
						)}
					/>
				</div>
			)}
		</div>
	);
};

PostCard.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.number,
		User: PropTypes.shape({
			id: PropTypes.string,
			nickname: PropTypes.string,
		}),
		content: PropTypes.string,
		Images: PropTypes.arrayOf(PropTypes.object),
		Comments: PropTypes.arrayOf(
			PropTypes.shape({
				User: PropTypes.shape({
					nickname: PropTypes.string,
				}),
				content: PropTypes.string,
			}),
		),
	}),
};

export default PostCard;
