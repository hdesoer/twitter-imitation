import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { addTweet, deleteTweet, editTweet } from '@/states/tweetsSlice'
import TweetCard from '@/components/Tweet'
import type { Tweet } from '@/typings'

import s from './index.module.scss'

const HomePage = () => {
  const [text, setText] = useState('')
  const dispatch = useAppDispatch()
  const tweets = useAppSelector(state => state.tweets.tweets.filter(item => !item.isDeleted))
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const currentUser = useAppSelector(state => state.users.currentUser!)

  const [currentTweet, setCurrentTweet] = useState<Tweet>()
  // edit tweet
  const [currentTweetText, setCurrentTweetText] = useState('')
  useEffect(() => {
    if (currentTweet) {
      setCurrentTweetText(currentTweet.text)
    }
  }, [currentTweet])

  // delete modal visible
  const [delModalShow, setDelModalShow] = useState(false)
  const handleDelModalClose = () => setDelModalShow(false)
  const handleDelModalOpen = () => setDelModalShow(true)

  // edit modal visible
  const [editModalShow, setEditModalShow] = useState(false)
  const handleEditModalClose = () => { 
    // reset tweet's text
    setCurrentTweetText(currentTweet?.text || '')
    setEditModalShow(false) 
  }
  const handleEditModalOpen = () => setEditModalShow(true)

  const onPost = () => {
    dispatch(addTweet({
      text,
      user: currentUser,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }))
    setText('')
  }

  const confirmDelete = () => {
    if (!currentTweet || currentTweet.user.id !== currentUser.id) return
    dispatch(deleteTweet(currentTweet.id))
    handleDelModalClose()
  }

  const confirmEdit = () => {
    if (!currentTweet || currentTweet.user.id !== currentUser.id) return
    dispatch(editTweet({ 
      tweetId: currentTweet.id,
      text: currentTweetText
    }))
    handleEditModalClose()
  }

  return <div className={classNames(s.container, 'p-3')}>
    <div className="w-100 mb-2">
      <textarea 
        className="form-control" 
        value={text} 
        onChange={(e) => {
          setText(e.target.value)
        }} 
        placeholder="What's happening?" rows={3}
      >
      </textarea>
      <button className="btn btn-outline-primary mt-2" onClick={onPost} disabled={!text}>Tweet</button>
    </div>
    {
      tweets.map(item => <TweetCard 
        key={item.id} 
        tweet={item}
        onEdit={(tweet) => {
          setCurrentTweet(tweet)
          handleEditModalOpen()
        }}
        onDelete={(tweet) => {
          setCurrentTweet(tweet)
          handleDelModalOpen()
        }}
      />)
    }

    <Modal show={delModalShow} onHide={handleDelModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete tweet</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure delete this tweet?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDelModalClose}>
            Cancel
        </Button>
        <Button variant="primary" onClick={confirmDelete}>
            Ok
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={editModalShow} onHide={handleEditModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit tweet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea 
          className="form-control" 
          value={currentTweetText}
          onChange={(e) => { setCurrentTweetText(e.target.value) }}
          placeholder="What's happening?" rows={3}
        >
        </textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleEditModalClose}>
            Cancel
        </Button>
        <Button variant="primary" disabled={!currentTweetText} onClick={confirmEdit}>
            Ok
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
}

export default HomePage