import React from 'react'
// import ComomnBanner
import CommonBanner from '../component/Common/CommonBanner'
// import NewsArtea
import NewsArea from '../component/News'
const News = () => {
  return (
    <>
    <CommonBanner heading="News" pagination="News"/>
    <NewsArea/>
    </>
  )
}

export default News