import React from 'react';

function Support() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center text-gray-100">
      {/* Header */}
      <header className="w-full bg-gray-800 text-white p-6 text-center shadow-lg">
        <h1 className="text-3xl font-bold">Customer Support</h1>
        <p className="mt-2 text-gray-300">
          We're here to help! Get in touch with us or check our FAQ.
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl p-6 space-y-12">
        {/* Contact Form */}
        <section className="bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-400 font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-400 font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-400 font-medium mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </section>

        {/* Contact Information */}
        <section className="bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              📞 <span className="font-medium">Phone:</span> +254 700 123 456
            </li>
            <li>
              ✉️ <span className="font-medium">Email:</span> support@localecommerce.com
            </li>
            <li>
              📍 <span className="font-medium">Address:</span> 123 Local Street, Nairobi, Kenya
            </li>
          </ul>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-100">Q: How do I track my order?</h3>
              <p className="text-gray-300">
                A: You can track your order by visiting the "Track Order" section and entering your order ID.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-100">Q: What is your return policy?</h3>
              <p className="text-gray-300">
                A: We offer a 14-day return policy for unused and unopened items. Please visit our "Returns" page for more details.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-100">Q: Can I change my shipping address?</h3>
              <p className="text-gray-300">
                A: Yes, please contact us within 24 hours of placing your order to update your shipping address.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Support;
