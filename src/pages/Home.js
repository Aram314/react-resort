import React from 'react'
import Hero from  '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import Services from '../components/Services'
import FeaturedHome from '../components/FeaturedRooms'


import SimpleButton from '../components/StyledHero'


export default function Home() {
    return (
        <>
            <Hero hero='defaultHero'>
                <Banner title='Luxurious rooms' subtitle='deluxe room starting at $299'>
                    <Link to='/rooms' className='btn-primary'>Our rooms</Link>
                </Banner>
            </Hero>
            <Services />
            <FeaturedHome />
            <SimpleButton></SimpleButton>
        </>
    )
}