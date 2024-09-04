import { useEffect, useState } from 'react';
import AddSubscriptionModal from './AddSubscriptionModal';
import { useGetSubscriptionsQuery } from '../../store/admin/adminApi';

interface Subscription {
  _id: string;
  type: string;
  price: number;
  durationInDays: number;
  features: string[];
  propertiesLimit: number;
  sponsoredPropertiesLimit: number;
  active:boolean
}

const SubscriptionMain = () => {
  const { data: subscriptionsData, error, isLoading } = useGetSubscriptionsQuery({});
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);  

  useEffect(() => {
    if (subscriptionsData && subscriptionsData.subscriptions) {
      setFilteredSubscriptions(
        subscriptionsData.subscriptions.filter((sub: Subscription) =>
          sub.type.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, subscriptionsData]);

  const handleCancelSubscription = async (subscriptionId: string) => {
    try {
      setFilteredSubscriptions(prevSubscriptions => prevSubscriptions.map(sub => sub._id === subscriptionId ? { ...sub, active: false } : sub));
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
    }
  };

  const handleAddSubscription = (newSubscription: Subscription) => {
    if (subscriptionsData && subscriptionsData.subscriptions) {
      setFilteredSubscriptions([...subscriptionsData.subscriptions, { ...newSubscription, _id: Date.now().toString() }]);
    }
  };

  const getCardColor = (type: string) => {
    switch (type) {
      case 'Basic':
        return 'bg-blue-100';
      case 'Standard':
        return 'bg-yellow-100';
      case 'Premium':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };

  if (isLoading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Failed to load subscriptions.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Subscription List</h1>
      
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full max-w-md  focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform "
        />
        <button onClick={() => setIsModalOpen(true)} className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Add Subscription</button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSubscriptions.length > 0 ? (
          filteredSubscriptions.map((subscription) => (
            <div key={subscription._id} className={`p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 ${getCardColor(subscription.type)}`}>
              <h3 className="text-2xl font-semibold text-center mb-2 text-gray-800">{subscription.type} Subscription</h3>
              <p className="mb-2 text-lg font-medium">Price: <span className="font-bold text-blue-600">₹{subscription.price}</span></p>
              <p className="mb-2 text-lg font-medium">Duration: <span className="font-bold text-blue-600">{subscription.durationInDays} days</span></p>
              <p className="mb-2 text-lg font-medium">Properties Limit: <span className="font-bold text-blue-600">{subscription.propertiesLimit}</span></p>
              <p className="mb-2 text-lg font-medium">Sponsored Properties Limit: <span className="font-bold text-blue-600">{subscription.sponsoredPropertiesLimit}</span></p>
              <ul className="mb-4 list-disc pl-5 text-gray-700">
                {subscription.features.map((feature, index) => (
                  <li key={index} className="text-gray-700">{feature}</li>
                ))}
              </ul>
              <p className={`mb-4 text-lg font-bold ${subscription.active ? 'text-green-800' : 'text-red-800'}`}>
                {subscription.active ? 'Active' : 'Inactive'}
              </p>
              {subscription.active && (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-300"
                  onClick={() => handleCancelSubscription(subscription._id)}
                >
                  Cancel
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-lg text-gray-600">No subscriptions found</p>
        )}
      </div>

      <AddSubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddSubscription}
      />
    </div>
  );
};

export default SubscriptionMain;