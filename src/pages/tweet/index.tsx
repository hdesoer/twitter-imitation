import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import type { Tweet } from '@/typings'

import s from './index.module.scss'

const TweetDetailPage = () => {
  const tweet = useLoaderData() as Tweet | undefined
  const navigate = useNavigate()

  if (!tweet) return <div className={classNames(s.container, 'p-3')}>Tweet not found</div>

  return <div className={classNames(s.container, 'p-3')}>
    <h4 className='mb-3'>Tweet detail</h4>
    <div className='row mb-3'>
      <div className='col-3'>id</div>
      <div className='col-9'>{ tweet.id }</div>
    </div>
    <div className='row mb-3'>
      <div className='col-3'>text</div>
      <div className='col-9'>{ tweet.text }</div>
    </div>
    <div className='row mb-3'>
      <div className='col-3'>posted time</div>
      <div className='col-9'>{ tweet.createdAt }</div>
    </div>
    <div className='row mb-3'>
      <div className='col-3'>poster</div>
      <div className='col-9'>{ tweet.user.firstName }</div>
    </div>

    <button type="button" className="btn btn-link" style={{ padding: 0 }} onClick={() => { navigate(-1) }}>Go back</button>
  </div>
}

export default TweetDetailPage