import React, { useEffect, useState } from 'react'
import DiscussionTile from './DiscussionTile';
import './Community.css';
import { ReactComponent as EditIcon } from '../../assets/svg/edit.svg';
import { ReactComponent as SearchIcon } from '../../assets/svg/search_24.svg'
import { getDiscussionInfo } from '../../db/firebaseFunction';

function ProjectDiscussion({ handleEdit, handleInfo }) {
  const [inputValue, setInputValue] = useState('');
  const [discussions, setDiscussions] = useState([]);
  useEffect(() => {
    const fetchDiscussion = async () => {
      const projectId = JSON.parse(sessionStorage.getItem('projectId'));
      const discussionInfo = await getDiscussionInfo(projectId);
      setDiscussions(discussionInfo);
    };

    fetchDiscussion();

  }, []);
  return (
    <div className='project-discussion-wrapper'>
      <div className='discussion-search-wrapper'>
        <div className='discussion-search'>
          <div className='input-field'>
            <input
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='フリーワード検索'
            />
            <div className='search-field'>
              <SearchIcon />
            </div>
          </div>
          <div className='post-button' onClick={handleEdit}>
            <p>投稿する</p>
            <EditIcon className='edit-icon' />
          </div>
        </div>
      </div>
      <div className='discussion-field'>
        <div onClick={handleInfo}>
          <DiscussionTile />
        </div>
        <DiscussionTile />
        <DiscussionTile />
        <DiscussionTile />
        <DiscussionTile />
      </div>
    </div>
  )
}

export default ProjectDiscussion;
