import React from 'react';
import { Card, Popover, Button } from 'antd';
import {
	RetweetOutlined,
	HeartOutlined,
	MessageOutlined,
	EllipsisOutlined,
} from '@ant-design/icons';
import PostImages from './PostImages';

const PostCard = ({ post }) => {
	return (
		<div>
			<Card
				cover={post.Images[0] && <PostImages images={post.Images} />}
				actions={[
					<RetweetOutlined />,
					<HeartOutlined />,
					<MessageOutlined />,
					<Popover
						key="more"
						content={
							<Button.Group>
								<Button>수정</Button>
								<Button type="danger">삭제</Button>
								<Button>신고</Button>
							</Button.Group>
						}>
						<EllipsisOutlined />
					</Popover>,
				]}></Card>
		</div>
	);
};

export default PostCard;
