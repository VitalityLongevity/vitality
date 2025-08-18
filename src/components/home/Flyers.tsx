import React from 'react';
import { Leaf, Heart, Brain, Shield, Zap, Droplets, Star, CheckCircle } from 'lucide-react';

const HEALTH_BENEFITS = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Cardiovascular Health",
    benefits: [
      "Supports healthy blood pressure",
      "Improves circulation",
      "Rich in potassium for heart function"
    ]
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Mental Clarity",
    benefits: [
      "Enhances cognitive function",
      "Supports memory and focus",
      "Reduces brain fog"
    ]
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Immune Support",
    benefits: [
      "Boosts natural immunity",
      "Rich in antioxidants",
      "Fights inflammation"
    ]
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Energy & Vitality",
    benefits: [
      "Natural energy boost",
      "Combats fatigue",
      "Supports metabolism"
    ]
  }
];

const MINERAL_HIGHLIGHTS = [
  { name: "Iodine", benefit: "Thyroid function" },
  { name: "Iron", benefit: "Blood health" },
  { name: "Magnesium", benefit: "Muscle & nerve function" },
  { name: "Calcium", benefit: "Bone strength" },
  { name: "Potassium", benefit: "Heart health" },
  { name: "Zinc", benefit: "Immune system" }
];

const USAGE_TIPS = [
  "Start with 1-2 tablespoons daily",
  "Mix into smoothies or beverages",
  "Take consistently for best results",
  "Store in refrigerator after opening",
  "Can be used in cooking and baking"
];

export default function Flyers() {
  return (
    <section className="py-20 m-6 lg:m-8 bg-gradient-to-b from-white to-primary/5">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Leaf className="w-8 h-8 text-primary" />
            <h2 className="font-montserrat font-bold text-4xl text-primary">
              Nature's Complete Superfood
            </h2>
            <Leaf className="w-8 h-8 text-primary" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover why sea moss is called "Nature's Multivitamin" - packed with 92 of the 102 
            essential minerals your body needs for optimal health and vitality.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Health Benefits */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <Star className="w-7 h-7 text-coral" />
                <h3 className="font-montserrat font-bold text-2xl text-primary">
                  Comprehensive Health Benefits
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {HEALTH_BENEFITS.map((category, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-coral/10 group-hover:text-coral transition-colors">
                        {category.icon}
                      </div>
                      <h4 className="font-montserrat font-semibold text-lg text-primary">
                        {category.title}
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {category.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mineral Content */}
          <div>
            <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Droplets className="w-7 h-7 text-coral" />
                <h3 className="font-montserrat font-bold text-xl">
                  Essential Minerals
                </h3>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-coral mb-2">92</div>
                <div className="text-sm opacity-90">out of 102 minerals your body needs</div>
              </div>

              <div className="space-y-3">
                {MINERAL_HIGHLIGHTS.map((mineral, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-white/20 last:border-b-0">
                    <span className="font-medium">{mineral.name}</span>
                    <span className="text-sm opacity-80">{mineral.benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <p className="text-sm text-center">
                  <strong>Bioavailable Form:</strong> Natural minerals are easier for your body to absorb and utilize effectively.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Guide */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="font-montserrat font-bold text-2xl text-primary mb-4">
              How to Use Sea Moss
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple ways to incorporate this powerful superfood into your daily routine for maximum benefits.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {USAGE_TIPS.map((tip, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-coral/10 transition-colors">
                  <span className="font-bold text-primary group-hover:text-coral transition-colors">
                    {index + 1}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 rounded-2xl shadow-xl p-12 text-center text-white">
          <h3 className="font-montserrat font-bold text-3xl mb-4">
            Ready to Transform Your Health?
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands who have discovered the life-changing benefits of premium sea moss. 
            Start your wellness journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-coral">100%</div>
              <div className="text-sm">Natural & Pure</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-coral">92</div>
              <div className="text-sm">Essential Minerals</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-coral">0</div>
              <div className="text-sm">Artificial Additives</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
