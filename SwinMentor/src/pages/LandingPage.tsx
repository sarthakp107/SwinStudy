import { motion } from 'framer-motion'
import { 
  AcademicCapIcon, 
  CalendarIcon, 
  ChartBarIcon, 
  BookOpenIcon 
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const features = [
  {
    name: 'Find Expert Mentors',
    description: 'Connect with experienced students and alumni who excel in your field of study. Get personalized guidance from those who\'ve successfully navigated your current challenges.',
    icon: AcademicCapIcon,
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600'
  },
  {
    name: 'Flexible Scheduling',
    description: 'Book sessions that fit your timetable. Choose between in-person or online meetings, and select times that work best for your schedule.',
    icon: CalendarIcon,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    name: 'Track Progress',
    description: 'Monitor your improvement with detailed feedback after each session. Set goals and watch as you achieve them with your mentor\'s guidance.',
    icon: ChartBarIcon,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    name: 'Resource Library',
    description: 'Access a curated collection of study materials, past exam papers, and helpful resources shared by mentors and top-performing students.',
    icon: BookOpenIcon,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }
]

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <motion.div 
        className="relative bg-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
              <motion.div 
                className="sm:text-center lg:text-left"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Find your perfect</span>
                  <span className="block text-red-600">mentor at Swinburne</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Connect with experienced mentors who can guide you through your academic journey and help you achieve your goals.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/signup"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/about"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-red-100 hover:bg-red-200 md:py-4 md:text-lg md:px-10"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="lg:text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Get the support and guidance you need to excel in your studies at Swinburne.
            </p>
          </motion.div>

          <motion.div 
            className="mt-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12">
              {features.map((feature) => (
                <motion.div 
                  key={feature.name} 
                  className="relative group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-4 p-6 rounded-lg transition-all duration-300 hover:bg-gray-50">
                    <div className={`${feature.bgColor} rounded-lg p-3 inline-flex`}>
                      <feature.icon 
                        className={`h-6 w-6 ${feature.iconColor}`} 
                        aria-hidden="true" 
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                        {feature.name}
                      </h3>
                      <p className="mt-2 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-red-100 transition-colors" 
                       aria-hidden="true" 
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage 