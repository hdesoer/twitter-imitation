import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/hooks'
import { Tweet } from '@/typings'

interface Props {
  tweet: Tweet
  onDelete: (tweet: Tweet) => void
  onEdit: (tweet: Tweet) => void
}

const TweetCard = ({ tweet, onDelete, onEdit }: Props) => {
  const currentUser = useAppSelector(state => state.users.currentUser)
  const navigate = useNavigate()

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    onEdit(tweet)
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    onDelete(tweet)
  }

  return <div 
    className="card mb-2" 
    onClick={() => {
      navigate(`/tweet/${tweet.id}`)
    }}
    style={{ cursor: 'pointer' }}
  >
    <div className="card-body">
      <div className='d-flex justify-content-between'>
        <span>{ tweet.user.firstName }</span>
        <span>{ tweet.createdAt }</span>
      </div>
      <p className="card-text mt-2">{ tweet.text }</p>
      <div className='d-flex justify-content-end'>
        {/* <Link to={`/tweet/${tweetId}`}>
          <button type="button" className="btn btn-link btn-sm">Detail</button>
        </Link> */}
        {
          currentUser?.id === tweet.user.id && <div>
            <button type="button" onClick={handleEdit} className="btn btn-primary btn-sm me-2">Edit</button>
            <button type="button" onClick={handleDelete} className="btn btn-danger btn-sm">Delete</button>
          </div>
        }
      </div>
    </div>
  </div>
}

export default TweetCard