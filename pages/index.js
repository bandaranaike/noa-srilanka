import Head from 'next/head'

/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
export default function Home({ videos }) {
  return (
    <div>
      <div className='home-slider'>
        <div className='container mx-auto md:flex py-12'>
          <div className='py-20'>
            <div className='welcome text-2xl font-bold'>Welcome</div>
            <h1>Nippon Origami Association - <span>Sri Lanka</span></h1>
            <p>One beauty of origami that has been alive in the mind of one person over the countries and regions</p>
          </div>
          <div>
            <img src='images/origami-blue-eagle.png' />
          </div>
        </div>
      </div>
      <div className='container mx-auto py-12'>
        <ul className='grid grid-cols-3 gap-8'>
          {videos.map(video => (
            <li key={video.id} className='rounded-lg shadow-xl relative'> 
              <img className='object-cover rounded-t-lg h-64 w-full' src={'/video-thumbs/' + video.thumbnail} />
              <div className='p-6 pb-24'>
                <div className='mb-3 theme-color'>YouTube</div>
                <h3 className='mb-4'>{video.title}</h3>
                <p className='text-gray-600'>{video.content}</p>
                <div className='md:flex absolute bottom-0 pb-5'> 
                  <img className='rounded-full border h-12 w-12 object-cover border-gray-400' src='/images/logo.jpg' />
                  <div className='pl-4'>
                    <div>NOA Sri lanka</div>
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
  const response = await fetch('http://localhost:3000/api/videos')
  const videos = await response.json();
  return {
    props: {
      videos,
    }
  }
}