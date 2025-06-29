import  { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  Bike,
  Star,
  CheckCircle,
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success'>(null);
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        serviceType: 'general'
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
      description: "Mon-Fri 9AM-7PM, Sat 9AM-6PM"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["info@ecocyclehub.com", "support@ecocyclehub.com"],
      description: "We'll respond within 24 hours"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Our Store",
      details: ["123 Green Street", "Portland, OR 97201"],
      description: "Free parking available"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Store Hours",
      details: ["Mon-Fri: 9AM-7PM", "Sat-Sun: 9AM-6PM"],
      description: "Closed on major holidays"
    }
  ];

  const services = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales & Products' },
    { value: 'service', label: 'Bike Service & Repair' },
    { value: 'warranty', label: 'Warranty & Returns' },
    { value: 'partnership', label: 'Business Partnership' }
  ];

  const testimonials = [
    {
      name: "Jennifer Martinez",
      rating: 5,
      text: "Amazing customer service! They helped me find the perfect eco-friendly bike for my daily commute.",
      location: "Portland, OR"
    },
    {
      name: "David Chen",
      rating: 5,
      text: "The team's expertise is unmatched. My e-bike has been running perfectly thanks to their maintenance service.",
      location: "Seattle, WA"
    },
    {
      name: "Sarah Williams",
      rating: 5,
      text: "Love supporting a business that truly cares about the environment. Great bikes, great people!",
      location: "San Francisco, CA"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Hero Section */}
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
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

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden">
          <MessageCircle className="absolute w-8 h-8 text-white/10 animate-bounce" style={{ left: '15%', top: '25%', animationDelay: '0s' }} />
          <Mail className="absolute w-6 h-6 text-white/10 animate-bounce" style={{ left: '75%', top: '40%', animationDelay: '1s' }} />
          <Phone className="absolute w-7 h-7 text-white/10 animate-bounce" style={{ left: '85%', top: '70%', animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Ready to start your eco-friendly cycling journey? We're here to help you find the perfect sustainable ride.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative bg-white">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
        
        <div className="container mx-auto px-6 py-20">
          {/* Contact Information Grid */}
          <section 
            id="contact-info" 
            data-animate
            className={`mb-20 transition-all duration-1000 ${
              visibleSections.has('contact-info') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-16'
            }`}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="group bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-3xl border border-indigo-100 hover:border-indigo-300 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700 font-medium mb-1">{detail}</p>
                  ))}
                  <p className="text-gray-500 text-sm mt-2">{info.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Form and Map Section */}
          <section 
            id="contact-form" 
            data-animate
            className={`mb-20 transition-all duration-1000 delay-300 ${
              visibleSections.has('contact-form') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-16'
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="bg-gradient-to-br from-gray-50 to-indigo-50 p-8 lg:p-12 rounded-3xl border border-gray-200">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Send Us a Message
                </h2>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </div>
                )}

           <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Service Type</label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                      >
                        {services.map(service => (
                          <option key={service.value} value={service.value}>
                            {service.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                      placeholder="What can we help you with?"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          Send Message
                        </>
                      )}
                    </span>
                  </button>
                </div>
           </form>
              </div>

              {/* Map/Location Info */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 lg:p-12 rounded-3xl text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    {[...Array(8)].map((_, i) => (
                      <Bike
                        key={i}
                        className="absolute w-8 h-8 opacity-20"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          transform: `rotate(${Math.random() * 360}deg)`
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-6">Visit Our Showroom</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium">123 Green Street</p>
                          <p className="opacity-90">Portland, OR 97201</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Clock className="w-6 h-6 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Store Hours:</p>
                          <p className="opacity-90">Mon-Fri: 9AM-7PM</p>
                          <p className="opacity-90">Sat-Sun: 9AM-6PM</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                      <h4 className="font-bold mb-3">What to Expect:</h4>
                      <ul className="space-y-2 text-sm opacity-90">
                        <li>• Test ride any bike in our collection</li>
                        <li>• Free bike fitting consultation</li>
                        <li>• Expert advice on eco-friendly options</li>
                        <li>• Complimentary basic maintenance check</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-2 gap-4">
                  <button className="group bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 hover:border-green-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg text-left">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Bike className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">Book Test Ride</h4>
                    <p className="text-gray-600 text-sm">Schedule a free test ride</p>
                  </button>
                  
                  <button className="group bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg text-left">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">Live Chat</h4>
                    <p className="text-gray-600 text-sm">Chat with our experts</p>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section 
            id="testimonials" 
            data-animate
            className={`transition-all duration-1000 delay-500 ${
              visibleSections.has('testimonials') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-16'
            }`}
          >
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-indigo-50 p-8 rounded-3xl border border-gray-200 hover:border-indigo-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold text-gray-800">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;