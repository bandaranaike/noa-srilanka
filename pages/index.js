import Head from 'next/head'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import ModalVideo from 'react-modal-video'


/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
export default function Home({ videos }) {
  const [isOpen, setOpen] = useState(false)
  return (
    <div>
      <Head>
        <title>Nippon Origami Association Sri Lanka</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <nav className="bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-8 w-8" src="/images/logo.jpg" alt="Workflow logo" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {/* <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">Dashboard</a> */}

                    {/* <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Team</a> */}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </nav>
      </div>
      <div className='home-slider'>
        <div className='container mx-auto md:flex py-12'>
          <div className='py-24'>
            <div className='welcome text-2xl font-bold'>Welcome</div>
            <h1 className='poppins-font'>Nippon Origami Association <span>Sri Lanka</span></h1>
            <p>One beauty of origami that has been alive in the mind of one person over the countries and regions</p>
          </div>
          <div>
            <img src='images/origami-blue-eagle.png' />
          </div>
        </div>
      </div>
      <div className='container mx-auto py-12'>

        <div className='text-center text-5xl mt-6 text-gray-800 poppins-font'>Origami Recent Videos</div>
        <div className='text-center mb-16 text-gray-600 text-lg'>We have uploaded our new videos.</div>
        <ul className='grid lg:grid-cols-2 xl:grid-cols-3 gap-6 px-6 lg:px-0'>
          {videos.map(video => (
            <li key={video.id} className='rounded-lg shadow-xl relative'>
              <React.Fragment>
                <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={video.video_id} onClose={() => setOpen(false)} />
                <img className='object-cover rounded-t-lg h-64 w-full' src={'/video-thumbs/' + video.thumbnail} onClick={() => setOpen(true)} />
              </React.Fragment>
              <div className='p-6 pb-24'>
                <div className='mb-3 mt-2 theme-color font-bold'>YouTube</div>
                <h3 className='mb-4 poppins-font'>{video.title}</h3>
                <p className='gray-light-text'>{video.content}</p>
                <div className='flex absolute bottom-0 pb-6'>
                  <img className='rounded-full border h-12 w-12 object-cover border-gray-400' src='/images/logo.jpg' />
                  <div className='pl-4'>
                    <div className='font-bold text-gray-800'>NOA Sri lanka</div>
                    <div className='text-sm text-gray-600'>{(new Date(video.created_at).toDateString())}</div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


export async function getStaticProps() {
  //console.log(process.env.APP_URL, 49);

  const response = await fetch(process.env.APP_URL + '/api/videos')
  const videos = await response.json();
  return {
    props: {
      videos,
    }
  }
}