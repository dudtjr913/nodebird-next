import React from 'react';
import Link from 'next/link';

const PostCardContent = ({ postData }) => {
	return (
		<div>
			{postData.split(/(#[^\s#]+)/g).map((v, i) => {
				if (v.match(/#[^\s#]+/)) {
					console.log(v);
					return (
						<Link key={i} href={`/hashtag/${v.slice(1)}`}>
							<a>{v}</a>
						</Link>
					);
				}
				return v;
			})}
		</div>
	);
};

export default PostCardContent;
