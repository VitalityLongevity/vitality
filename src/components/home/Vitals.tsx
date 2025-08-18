import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Brain, Settings as Lungs, Droplets, Dumbbell, ShieldPlus, X } from 'lucide-react';

const VITAL_METRICS = [
  {
    icon: <Brain className="w-8 h-8" />,
    label: 'Mind',
    description: 'Enhances Mental Clarity',
    detailedInfo: {
      title: 'Mental Clarity & Cognitive Function',
      benefits: [
        'Improves focus and concentration',
        'Enhances memory retention',
        'Supports brain health with essential minerals',
        'Reduces mental fatigue and brain fog'
      ],
      keyMinerals: ['Magnesium', 'Potassium', 'Iron', 'Zinc'],
      howItWorks: 'Sea moss contains essential minerals that support neurotransmitter function and brain health. The high concentration of potassium helps maintain proper nerve function, while magnesium supports cognitive processes and mental clarity.'
    }
  },
  {
    icon: <Lungs className="w-8 h-8" />,
    label: 'Breath',
    description: 'Improves Respiratory Function',
    detailedInfo: {
      title: 'Respiratory Health & Breathing',
      benefits: [
        'Helps clear airways and reduce congestion',
        'Supports healthy lung function',
        'Natural expectorant properties',
        'Reduces respiratory inflammation'
      ],
      keyMinerals: ['Iodine', 'Potassium', 'Calcium', 'Magnesium'],
      howItWorks: 'Sea moss acts as a natural expectorant, helping to dissolve and expel mucus from the respiratory system. Its anti-inflammatory properties help reduce irritation in the airways, promoting clearer breathing.'
    }
  },
  {
    icon: <Droplets className="w-8 h-8" />,
    label: 'Flow',
    description: 'Optimizes Blood Circulation',
    detailedInfo: {
      title: 'Blood Circulation & Cardiovascular Health',
      benefits: [
        'Improves blood flow throughout the body',
        'Supports healthy blood pressure levels',
        'Rich in iron for healthy blood cells',
        'Promotes cardiovascular wellness'
      ],
      keyMinerals: ['Iron', 'Potassium', 'Magnesium', 'Calcium'],
      howItWorks: 'The high iron content in sea moss supports healthy red blood cell production, while potassium helps regulate blood pressure. These minerals work together to optimize circulation and cardiovascular function.'
    }
  },
  {
    icon: <Heart className="w-8 h-8" />,
    label: 'Sexual Health',
    description: 'Supports Libido Health',
    detailedInfo: {
      title: 'Sexual Wellness & Vitality',
      benefits: [
        'Naturally enhances libido and sex drive',
        'Supports hormonal balance',
        'Improves energy and stamina',
        'Rich in zinc for reproductive health'
      ],
      keyMinerals: ['Zinc', 'Iron', 'Magnesium', 'Potassium'],
      howItWorks: 'Sea moss contains zinc and other essential minerals that support hormone production and reproductive health. The natural energy boost from its mineral content helps improve stamina and overall sexual wellness.'
    }
  },
  {
    icon: <Dumbbell className="w-8 h-8" />,
    label: 'Strength',
    description: 'Boosts Physical Performance',
    detailedInfo: {
      title: 'Physical Strength & Performance',
      benefits: [
        'Increases energy levels and endurance',
        'Supports muscle recovery and growth',
        'Provides sustained energy without crashes',
        'Enhances overall physical performance'
      ],
      keyMinerals: ['Iron', 'Magnesium', 'Potassium', 'Calcium'],
      howItWorks: 'The comprehensive mineral profile in sea moss supports energy production at the cellular level. Iron helps transport oxygen to muscles, while magnesium and potassium support muscle function and recovery.'
    }
  },
  {
    icon: <ShieldPlus className="w-8 h-8" />,
    label: 'Defense',
    description: 'Strengthens Immune System',
    detailedInfo: {
      title: 'Immune System Support',
      benefits: [
        'Boosts natural immune response',
        'Rich in antioxidants and vitamins',
        'Supports white blood cell function',
        'Helps fight off infections naturally'
      ],
      keyMinerals: ['Zinc', 'Iron', 'Selenium', 'Iodine'],
      howItWorks: 'Sea moss provides essential nutrients that support immune system function. Zinc is crucial for immune cell development, while the antioxidant properties help protect cells from damage and support overall immune health.'
    }
  }
];

interface VitalModalProps {
  vital: typeof VITAL_METRICS[0] | null;
  isOpen: boolean;
  onClose: () => void;
}

function VitalModal({ vital, isOpen, onClose }: VitalModalProps) {
  if (!isOpen || !vital) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="text-primary">
                {vital.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {vital.detailedInfo.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">Key Benefits</h3>
              <ul className="space-y-2">
                {vital.detailedInfo.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <span className="w-2 h-2 bg-coral rounded-full mt-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">Essential Minerals</h3>
              <div className="flex flex-wrap gap-2">
                {vital.detailedInfo.keyMinerals.map((mineral, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {mineral}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">How It Works</h3>
              <p className="text-gray-600 leading-relaxed">
                {vital.detailedInfo.howItWorks}
              </p>
            </div>

            <div className="bg-primary/5 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> Individual results may vary. These statements have not been evaluated by the FDA. 
                Sea moss is not intended to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <div className="flex justify-between items-center">
              <Link
                to="/education"
                className="text-primary hover:text-amber-600 font-medium"
                onClick={onClose}
              >
                Learn More About Sea Moss
              </Link>
              <Link
                to="/collections"
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                onClick={onClose}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Vitals() {
  const navigate = useNavigate();
  const [selectedVital, setSelectedVital] = useState<typeof VITAL_METRICS[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVitalClick = (vital: typeof VITAL_METRICS[0]) => {
    setSelectedVital(vital);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVital(null);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#23408f]/5 to-transparent overflow-hidden relative p-10">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-amber-600/5 rounded-full -top-48 -left-48 animate-pulse-slow" />
        <div className="absolute w-96 h-96 bg-[#23408f]/5 rounded-full -bottom-48 -right-48 animate-pulse-slower" />
      </div>

      <div className="container-custom relative">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-5xl md:text-6xl text-primary mb-6">
            What's your <span className="inline-block">
              <span className="bg-gradient-to-r from-amber-500 via-purple-600 to-green-500 text-transparent bg-clip-text animate-gradient">
                VITALS
              </span>
            </span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every vital sign tells a story about your health. Enhance them all naturally with our premium sea moss products.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {VITAL_METRICS.map((metric, index) => (
            <div
              key={index}
              onClick={() => handleVitalClick(metric)}
              className="group relative bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-coral/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="mb-4 text-primary group-hover:text-coral transition-colors duration-300 flex justify-center">
                  {metric.icon}
                </div>
                <h3 className="font-montserrat font-semibold text-xl text-primary mb-2">
                  {metric.label}
                </h3>
                <p className="text-gray-600 text-sm">
                  {metric.description}
                </p>
                <div className="mt-3 text-xs text-primary/60 group-hover:text-coral/80 transition-colors">
                  Click to learn more
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/collections"
            className="inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Boost Your Vitals Today
          </Link>
        </div>
      </div>

      <VitalModal
        vital={selectedVital}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}
