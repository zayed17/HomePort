import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-LightdarkBlue text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <p>
              We offer the best deals in town. Find your dream home with us. Our team is dedicated to providing you with excellent service.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul>
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/services" className="hover:underline">Services</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="https://facebook.com" className="hover:text-gray-300"><FaFacebook size={24} /></a>
              <a href="https://twitter.com" className="hover:text-gray-300"><FaTwitter size={24} /></a>
              <a href="https://instagram.com" className="hover:text-gray-300"><FaInstagram size={24} /></a>
            </div>
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <p>Email: info@example.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>&copy; 2024 Real Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
