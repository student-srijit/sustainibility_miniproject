import Link from "next/link"
import {
  Leaf,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  Heart,
} from "lucide-react"

export function Footer() {
  const footerSections = [
    {
      title: "Learning Topics",
      links: [
        { name: "Solar Energy", href: "/solar-energy" },
        { name: "Wind Energy", href: "/wind-energy" },
        { name: "Recycling", href: "/recycling" },
        { name: "Energy Efficiency", href: "/energy-efficiency" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Interactive Quiz", href: "/quiz" },
        { name: "Sustainability Tools", href: "/tools" },
        { name: "Learning Games", href: "/games" },
        { name: "Marketplace", href: "/marketplace" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Careers", href: "/careers" },
        { name: "Press & Media", href: "/press" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-pink-600" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:bg-red-600" },
  ]

  const contactInfo = [
    { icon: Mail, text: "hello@sustainabilitylearn.edu", href: "mailto:hello@sustainabilitylearn.edu" },
    { icon: Phone, text: "+91 80 2861 1004", href: "tel:+918028611004" },
    { icon: MapPin, text: "Bangalore, Karnataka, India", href: "#" },
  ]

  const stats = [
    { value: "100K+", label: "Active Learners" },
    { value: "50+", label: "Countries" },
    { value: "95%", label: "Success Rate" },
    { value: "24/7", label: "Support" },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-400 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-400 rounded-full animate-float-delayed blur-xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-emerald-400 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-cyan-400 rounded-full animate-float-delayed blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-green-500 via-emerald-500 to-blue-500 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-xl">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse-slow">
                  <Sparkles className="w-2 h-2 text-white m-1" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Learn for Sustainability
                </span>
                <div className="text-sm text-gray-300 -mt-1">Empowering Green Future</div>
              </div>
            </Link>

            <p className="text-gray-300 max-w-md leading-relaxed">
              Empowering individuals and communities to create a sustainable future through innovative education,
              interactive learning, and real-world action. Join our global movement today.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <Link
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors duration-300 group"
                >
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-green-500/20 transition-colors duration-300">
                    <contact.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{contact.text}</span>
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className={`p-3 bg-white/10 rounded-lg ${social.color} transition-all duration-300 group hover:scale-110 hover:shadow-lg`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4 relative">
                {section.title}
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-green-400 transition-all duration-300 hover:translate-x-1 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-white/10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-white/10">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Get the latest sustainability tips, course updates, and environmental news delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>© {new Date().getFullYear()} Learn for Sustainability. Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-heartbeat" />
            <span>for our planet.</span>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
              Cookie Policy
            </Link>
            <Link href="/accessibility" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
              Accessibility
            </Link>
          </div>
        </div>

        {/* Environmental Impact Statement */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20 backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-3 text-center">
            <Leaf className="h-6 w-6 text-green-400 animate-pulse-slow" />
            <p className="text-gray-300 text-sm">
              <span className="font-semibold text-green-400">Carbon Neutral Website:</span>
              This platform is powered by 100% renewable energy and offset through verified carbon credits.
            </p>
            <Sparkles className="h-5 w-5 text-blue-400 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </footer>
  )
}
