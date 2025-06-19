import React, { useState } from 'react';
import { Mail, Phone, Send, User } from 'lucide-react';

// Reusable Contact Detail Component
const ContactDetail = ({ icon: Icon, title, content }: { icon: any; title: string; content: string }) => (
  <div className="flex items-start space-x-4">
    <Icon className="h-6 w-6 text-primary flex-shrink-0" />
    <div>
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{content}</p>
    </div>
  </div>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions about our products or interested in placing a custom order?
            We'd love to hear from you.
          </p>

          <div className="space-y-6">
            <ContactDetail icon={Phone} title="Call Us" content="(919) 730-8782" />
            <ContactDetail icon={Mail} title="Email Us" content="info@seamossvitality.com" />
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Your Name</span>
                </div>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Address</span>
                </div>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="message">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Message</span>
                </div>
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                placeholder="How can we help you?"
              />
            </div>
            
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
            >
              <Send className="h-4 w-4" />
              Send Message
            </button>

            {status === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            {status === 'error' && error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
