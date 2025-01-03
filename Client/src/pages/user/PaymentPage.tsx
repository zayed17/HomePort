import ProfileSidebar from '../../components/user/ProfileSidebar'
import ProfileNav from '../../components/user/ProfileNav'
import Payment from '../../components/user/sections/profile/Payment'

const PaymentPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
    <ProfileSidebar />
    <div className="flex-1 md:ml-64 ml-20 transition-all duration-300">
      <ProfileNav name={"Payment"} />
      <div className="p-4">
        <Payment />
      </div>
    </div>
  </div>
  )
}

export default PaymentPage
