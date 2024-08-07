import { useState } from 'react';
import { useAddSubscriptionMutation } from '../../store/admin/adminApi';

interface AddSubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (newSubscription: {
        type: string;
        price: number;
        durationInDays: number;
        features: string[];
        propertiesLimit: number;
        sponsoredPropertiesLimit: number;
    }) => void;
}

const AddSubscriptionModal: React.FC<AddSubscriptionModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [addSubscription] = useAddSubscriptionMutation();
    const [type, setType] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [durationInDays, setDurationInDays] = useState<number>(0);
    const [features, setFeatures] = useState<string[]>([]);
    const [propertiesLimit, setPropertiesLimit] = useState<number>(0);
    const [sponsoredPropertiesLimit, setSponsoredPropertiesLimit] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (type && price && durationInDays && propertiesLimit && sponsoredPropertiesLimit) {
            try {
               const res = await addSubscription({
                    type,
                    price,
                    durationInDays,
                    features,
                    propertiesLimit,
                    sponsoredPropertiesLimit
                }).unwrap();
                if(res.status){
                    onAdd({
                        type,
                        price,
                        durationInDays,
                        features,
                        propertiesLimit,
                        sponsoredPropertiesLimit
                    });
                    onClose();
                }
            } catch (err) {
                console.log(err,"consoleingTypeError: Cannot read properties of undefined (reading 'invalidatesTags')")
                setError('Failed to add subscription. Please try again.');
            }
        } else {
            setError('Please fill in all required fields.');
        }
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
    };

    const handleAddFeature = () => {
        setFeatures([...features, '']);
    };

    const handleRemoveFeature = (index: number) => {
        const newFeatures = features.filter((_, i) => i !== index);
        setFeatures(newFeatures);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-xl w-full">
                <h2 className="text-2xl font-semibold mb-6">Add New Subscription</h2>

                {error && <p className="text-red-600 mb-4">{error}</p>}

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="" disabled>Select a subscription type</option>
                        <option value="Basic">Basic</option>
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter price"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Duration (Months)</label>
                    <input
                        type="number"
                        value={durationInDays}
                        onChange={(e) => setDurationInDays(parseInt(e.target.value, 10))}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter duration in months"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Features</label>
                    <div className="max-h-32 overflow-y-auto mb-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="Enter a feature"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFeature(index)}
                                    className="text-red-600 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={handleAddFeature}
                        className="text-blue-600 hover:underline"
                    >
                        + Add Feature
                    </button>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Properties Limit</label>
                    <input
                        type="number"
                        value={propertiesLimit}
                        onChange={(e) => setPropertiesLimit(parseInt(e.target.value, 10))}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter properties limit"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">Sponsored Properties Limit</label>
                    <input
                        type="number"
                        value={sponsoredPropertiesLimit}
                        onChange={(e) => setSponsoredPropertiesLimit(parseInt(e.target.value, 10))}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter sponsored properties limit"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none">
                        Add Subscription
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddSubscriptionModal;
