import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </Link>

      <h1 className="text-4xl font-bold text-gray-900 mb-8">Health Disclaimer</h1>

      <div className="prose prose-lg max-w-none">
        <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-lg mb-8">
          <p className="text-amber-800 font-medium">Important Notice</p>
          <p className="text-amber-700">
            The statements made about these products have not been evaluated by the Food and Drug Administration. 
            These products are not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>

        <h2>General Information</h2>
        <p>
          The information provided on this website is for educational and informational purposes only. 
          It should not be used as a substitute for professional medical advice, diagnosis, or treatment.
        </p>

        <h2>No Medical Advice</h2>
        <p>
          The content on this website, including text, graphics, images, and other material, is not intended 
          to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice 
          of your physician or other qualified health provider with any questions you may have regarding a 
          medical condition.
        </p>

        <h2>Individual Results May Vary</h2>
        <p>
          The results described on this website are not guaranteed and individual results may vary. The 
          testimonials and examples used are not intended to represent or guarantee that anyone will achieve 
          the same or similar results.
        </p>

        <h2>Pregnancy and Medical Conditions</h2>
        <p>
          If you are pregnant, nursing, taking medication, or have a medical condition, consult your physician 
          before using our products. Keep out of reach of children.
        </p>

        <h2>Allergies and Sensitivities</h2>
        <p>
          If you have any known allergies or sensitivities to sea moss or other marine products, please consult 
          your healthcare provider before using our products. Discontinue use and consult your healthcare provider 
          if you experience any adverse reactions.
        </p>

        <h2>Storage and Safety</h2>
        <p>
          Follow all storage and usage instructions provided with the products. Improper storage or use may 
          affect product safety and efficacy. Do not use if safety seal is broken or missing.
        </p>

        <div className="bg-gray-100 p-6 rounded-lg mt-8">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <p>
            If you have any questions about this disclaimer or our products, please contact us at:
          </p>
          <ul className="list-none pl-0 mt-2">
            <li>Email: kayobless@gmail.com</li>
            <li>Phone: (919) 730-8782</li>
          </ul>
        </div>
      </div>
    </div>
  );
}