import React from 'react'
import "./Home.scss"
import Featured from '../../components/featured/Featured'
import Slide from '../../components/slide/Slide'
import { cards,projects } from '../../data'
import CatCard from '../../components/catCard/CatCard'
import ProjectCard from '../../components/projectCard/ProjectCard'

const Home = () => {
  return (
    <div className='home'>
      <Featured />

      <Slide slidesToShow={4} arrowsScroll={2}>
        {cards.map((c) => (
          <CatCard key={c.id} card={c} />
        ))}
      </Slide>

      <div className="features">
        <div className="container">
          <div className="item">
            <h1>A whole world of freelance talent at your fingertips</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Quality work done quickly
            </div>
            <p>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Protected payments, every time
            </div>
            <p>
              Always know what you'll pay upfront. Your payment isn't released
              until you approve the work.
            </p>
            
          </div>

          <div className="item">
            <video src="./img/video.mp4" controls />
          </div>
        </div>
      </div>
          
        {/* <Slide slidesToShow={4} arrowsScroll={2}>
         {projects.map((c) => (
          <ProjectCard key={c.id} card={c} />
         ))}
       </Slide> */}

    </div>
  )
}

export default Home
