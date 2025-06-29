import  { useState, useEffect } from 'react';
import { ChevronDown, Bike, Leaf, Heart, Zap } from 'lucide-react';

const AboutUs = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Environmental Stewardship",
      description: "Every bicycle sold prevents an average of 2,400 pounds of CO2 emissions annually. We're not just selling bikes; we're investing in our planet's future."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation & Quality",
      description: "We showcase cutting-edge bicycle technology that doesn't compromise on sustainability. From bamboo frames to solar-powered e-bikes."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Community Connection",
      description: "Cycling builds communities. We support local bike paths, sponsor community rides, and partner with schools to promote cycling education."
    }
  ];

  const team = [
    {
      name: "Alex Rodriguez",
      role: "Founder & CEO",
      description: "Former environmental engineer turned cycling advocate. Alex has cycled across 15 countries and believes bicycles are the key to sustainable urban mobility.",
      avatar: "AR"
    },
    {
      name: "Sarah Kim",
      role: "Head of Sustainability",
      description: "Sustainability expert with 10+ years in green technology. Sarah ensures every product meets our strict environmental standards.",
      avatar: "SK"
    },
    {
      name: "Marcus Johnson",
      role: "Chief Mechanic",
      description: "Professional bike mechanic with 20 years of experience. Marcus leads our quality assurance and customer service teams.",
      avatar: "MJ"
    },
    {
      name: "Emma Patel",
      role: "Community Manager",
      description: "Organizes cycling events and builds partnerships with environmental organizations. Emma connects customers with local cycling communities.",
      avatar: "EP"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-purple-900 to-pink-800">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Floating Bikes */}
        <div className="absolute inset-0 overflow-hidden">
          <Bike className="absolute w-12 h-12 text-white/5 animate-bounce" style={{ left: '10%', top: '20%', animationDelay: '0s' }} />
          <Bike className="absolute w-8 h-8 text-white/5 animate-bounce" style={{ left: '80%', top: '60%', animationDelay: '1s' }} />
          <Bike className="absolute w-10 h-10 text-white/5 animate-bounce" style={{ left: '70%', top: '30%', animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
              CycleCity Community
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Pedaling towards a sustainable future, one bike at a time. Discover premium bicycles that connect you with nature while reducing your carbon footprint.
            </p>
            <div className="animate-bounce mt-12">
              <ChevronDown className="w-8 h-8 text-white/70 mx-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative bg-white">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
        
        <div className="container mx-auto px-6 py-20">
          {/* Our Story Section */}
          <section 
            id="story" 
            data-animate
            className={`transition-all duration-1000 ${
              visibleSections.has('story') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-16'
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              Our Journey
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Founded in 2018 by cycling enthusiasts who believed that transportation could be both exhilarating and environmentally responsible, CycleCity Community began as a small workshop in Portland. What started as a passion project to restore vintage bicycles quickly evolved into a mission-driven business.
                </p>
                <p>
                  We witnessed firsthand how cycling transformed not just individual lives, but entire communities. From reducing traffic congestion to improving public health, bicycles represented a simple yet powerful solution to modern urban challenges.
                </p>
              </div>
              <div className="relative group">
                <div className="h-80 bg-gradient-to-br from-teal-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-8xl transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-2 shadow-2xl">
                  🚴‍♂️
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-teal-500 to-purple-600 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative group order-2 lg:order-1">
                <div className="h-80 bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl flex items-center justify-center text-white text-8xl transform transition-all duration-500 group-hover:scale-105 group-hover:-rotate-2 shadow-2xl">
                  🌱
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
              </div>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed order-1 lg:order-2">
                <p>
                  Today, CycleCity Community curates the finest selection of eco-friendly bicycles from innovative manufacturers who share our commitment to sustainability. Every bike in our collection is chosen not just for performance and style, but for the positive impact it creates.
                </p>
                <p>
                  We partner with brands that use recycled materials, sustainable manufacturing processes, and carbon-neutral shipping. Because we believe that the journey towards a greener planet should start the moment you decide to ride.
                </p>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section 
            id="values" 
            data-animate
            className={`py-20 transition-all duration-1000 delay-300 ${
              visibleSections.has('values') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-16'
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              Our Values
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="group relative bg-gradient-to-br from-teal-50 to-purple-50 p-8 rounded-3xl border border-teal-100 hover:border-teal-300 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section 
            id="team" 
            data-animate
            className={`py-20 transition-all duration-1000 delay-500 ${
              visibleSections.has('team') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-16'
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div 
                  key={index}
                  className="group text-center p-6 rounded-3xl hover:-translate-y-4 transition-all duration-500"
                >
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-teal-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
                      {member.avatar}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{member.name}</h3>
                  <p className="text-teal-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section 
            id="cta" 
            data-animate
            className={`py-20 transition-all duration-1000 delay-700 ${
              visibleSections.has('cta') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-16'
            }`}
          >
            <div className="relative bg-gradient-to-br from-teal-600 to-purple-700 rounded-3xl p-12 md:p-20 text-center text-white overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600/50 to-purple-700/50"></div>
              <div className="absolute inset-0">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Join the Movement?</h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Discover our collection of sustainable bicycles and start your journey toward a greener, healthier lifestyle. Every pedal stroke makes a difference.
                </p>
                <button className="group relative bg-white text-teal-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-transparent hover:text-white border-2 border-white hover:scale-105 hover:shadow-2xl">
                  <span className="relative z-10">Shop Eco-Friendly Bikes</span>
                  <div className="absolute inset-0 bg-white rounded-full transition-all duration-300 group-hover:scale-110 group-hover:opacity-0"></div>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;