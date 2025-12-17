import React from 'react'
import Navbar from './../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';

const About = () => {
  return (
    <>
          <SEO 
        title="About Us - Our World of Education"
        description="Learn about our mission to revolutionize education with innovative teaching methods and expert tutors."
        keywords="about us, education mission, teaching methodology"
      />
      <div>
        <Navbar />
        <div className='min-h-[30vh] flex items-center justify-center'>
          i am about

        </div>




        <Footer />
      </div></>
  )
}

export default About
