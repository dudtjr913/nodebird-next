import React, { useMemo } from 'react';
import { List, Card, Button } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const FollowList = ({ data, header }) => {
	const grid = useMemo(() => ({ gutter: 4, xs: 2, md: 3 }));
	const liststyle = useMemo(() => ({ marginBottom: 20, marginTop: 10 }));
	const divStyle = useMemo(() => ({ textAlign: 'center', margin: '10px 0' }));
	return (
		<>
			<List
				style={liststyle}
				grid={grid}
				size="small"
				header={header}
				loadMore={
					<div style={divStyle}>
						<Button>더 보기</Button>
					</div>
				}
				bordered
				dataSource={data}
				renderItem={(item) => (
					<List.Item>
						<Card actions={[<StopOutlined key="stop" />]}>
							<Card.Meta description={item.nickname} />
						</Card>
					</List.Item>
				)}
			/>
		</>
	);
};

FollowList.propTypes = {
	header: PropTypes.string.isRequired,
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FollowList;
