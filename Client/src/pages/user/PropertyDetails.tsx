import React from 'react'
import Nave from '../../components/user/Nav'
import PropertyDetailsPage from '../../components/user/PropertyDetailsPage'
import ReportPropertyPage from '../../components/user/ReportProperty'
import Footer from '../../components/user/Footer'
const PropertyDetails = () => {
  return (
    <div>
      <Nave />
      <PropertyDetailsPage />
      {/* <ReportPropertyPage /> */}
      <Footer />
    </div>
  )
}

export default PropertyDetails
