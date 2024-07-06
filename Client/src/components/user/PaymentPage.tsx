import ProfileSidebar from './ProfileSidebar'
import ProfileNav from './ProfileNav'
import Payment from './sections/profile/Payment'

const PaymentPage = () => {
  return (
    <div className="flex h-screen">
    <ProfileSidebar />
    <div className="flex-1 md:ml-64 ml-20 transition-all duration-300">
      <ProfileNav />
      <div className="p-4">
        <Payment />
      </div>
    </div>
  </div>
  )
}

export default PaymentPage
