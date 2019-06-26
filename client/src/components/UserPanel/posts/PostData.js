import React from 'react';
import './PostData.css'
const PostData = ({ post }) => {
  const { body, title } = post;

  return (
    <div className="post-data">
      <div>
        <span className="property">Title:</span> {title} <br />
      </div>
      <div>
        <span className="property">Body:</span> {body}
      </div>
    </div>
  );
};

export default PostData;
