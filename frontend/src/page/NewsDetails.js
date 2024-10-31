import React from 'react'
// import ComomnBanner
import CommonBanner from '../component/Common/CommonBanner'
// import NewsArtea
import NewsDetilsArea from '../component/NewsDetails'

const NewsDetails = () => {
  return (
    <>
     <CommonBanner heading="News Details" pagination="News Details"/>
     <NewsDetilsArea/>
    </>
  )
}

export default NewsDetails