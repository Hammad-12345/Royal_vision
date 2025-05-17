import React from 'react'
import Banner from '../Component/Banner'
import WhyChooseUs from '../Component/WhyChooseUs'
import TotalInvester from '../Component/TotalInvester'
import OverviewMission from '../Component/OverviewMission'
import ProfitCalculator from '../Component/ProfitCalculator'
import PricingPlans from '../Component/PricingPlans'

const Home = () => {
  return <>
  <Banner/>
  <PricingPlans showAll={false}/>
  <WhyChooseUs/>
  <ProfitCalculator/> 
  <TotalInvester/>
  <OverviewMission/>
  </>
}

export default Home
