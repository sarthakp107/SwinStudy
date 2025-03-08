import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-50 to-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12">
              <h1 className="text-5xl font-bold text-gray-800 mb-6">
                Hello <span className="text-red-600">Smart Flashcards</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Upload your study materials and instantly create interactive flashcards. Learn smarter, not harder with Cheetos.
              </p>
              <div className="flex gap-4">
                <Link to="/create" className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">
                  Create Flashcards
                </Link>
                <Link to="/demo" className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg hover:bg-red-50 transition-colors">
                  Try Demo
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-red-600 text-2xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Ace Your Studies?</h2>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto">
            Transform your study materials into effective flashcards in seconds. Start learning smarter today!
          </p>
          <Link to="/upload" className="bg-white text-red-600 px-8 py-3 rounded-lg hover:bg-red-50 transition-colors inline-block">
            Start Creating
          </Link>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: "📄",
    title: "Upload Files",
    description: "Simply upload your study materials in PDF, DOCX, or TXT format."
  },
  {
    icon: "⚡",
    title: "Instant Generation",
    description: "Our AI automatically creates flashcards from your uploaded content."
  },
  {
    icon: "📱",
    title: "Study Anywhere",
    description: "Access your flashcards on any device and study at your own pace."
  }
];

export default LandingPage; 