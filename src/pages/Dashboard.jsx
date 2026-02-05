import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Home, MessageCircle, Search, User, Plus, Bell, 
  TrendingUp, Award, Clock, ThumbsUp, Filter,
  BookOpen, Code, Calculator, Beaker, Users, Zap, Calendar,
  Palette, Megaphone, BarChart3, FolderOpen, Star, X,

} from 'lucide-react'

const Dashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home')
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (!token || !user) {
      navigate('/login')
      return
    }
    
    setCurrentUser(JSON.parse(user))
  }, [])
  const [searchQuery, setSearchQuery] = useState('')
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [scheduleData, setScheduleData] = useState({
    title: '',
    type: 'meeting',
    date: '',
    time: ''
  })
  const [scheduledEvents, setScheduledEvents] = useState([
    { id: 1, title: 'Team Standup with Harsh', type: 'meeting', date: '2024-12-20', time: '09:00', status: 'upcoming' },
    { id: 2, title: 'Project Deadline', type: 'deadline', date: '2024-12-22', time: '23:59', status: 'upcoming' },
    { id: 3, title: 'Code Review with Prajwal', type: 'meeting', date: '2024-12-15', time: '14:00', status: 'past' }
  ])

  const notifications = [
    { id: 1, type: 'team', message: 'Prajwal Kate invited you to join AI Project team', time: '5 min ago', unread: true },
    { id: 2, type: 'event', message: 'Smart India Hackathon registration closes in 2 days', time: '1 hour ago', unread: true },
    { id: 3, type: 'rating', message: 'You received a 5-star rating from Aadesh Khande', time: '3 hours ago', unread: true },
    { id: 4, type: 'message', message: 'New message from Harsh Khatri', time: '5 hours ago', unread: false },
    { id: 5, type: 'achievement', message: 'You earned the "Team Player" badge!', time: '1 day ago', unread: false }
  ]


  const sidebarItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'teams', icon: Users, label: 'Find Teams', onClick: () => navigate('/team-matching') },
    { id: 'projects', icon: FolderOpen, label: 'Projects', onClick: () => navigate('/projects') },
    { id: 'community', icon: MessageCircle, label: 'Community', onClick: () => navigate('/community') },
    { id: 'events', icon: Calendar, label: 'Clubs & Events', onClick: () => navigate('/clubs-events') },
    { id: 'evaluation', icon: Star, label: 'Peer Review', onClick: () => navigate('/peer-evaluation') },
    { id: 'chat', icon: MessageCircle, label: 'Chat', onClick: () => navigate('/chat') },
    { id: 'profile', icon: User, label: 'Profile', onClick: () => navigate('/profile') }
  ]

  const recentEvents = [
    { id: 1, title: "Smart India Hackathon 2024", category: "Hackathon", time: "2 days left", status: "open", teams: 12 },
    { id: 2, title: "MITAOE Tech Fest - Web Dev Competition", category: "Competition", time: "1 week left", status: "open", teams: 8 },
    { id: 3, title: "AI/ML Workshop & Project Fair", category: "Workshop", time: "3 days left", status: "closed", teams: 15 }
  ]

  const topCollaborators = [
    { name: "Harsh Khatri", expertise: "Full Stack Dev", rating: 4.9, projects: 12 },
    { name: "Prajwal Kate", expertise: "Backend Developer", rating: 4.8, projects: 9 },
    { name: "Aadesh Khande", expertise: "UI/UX Designer", rating: 4.7, projects: 8 }
  ]



  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-64 bg-dark-gray border-r border-gray-800 p-6"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-space font-bold gradient-text">MITAOE TeamSync</h1>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={item.onClick || (() => setActiveTab(item.id))}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-electric-blue/20 to-neon-teal/20 text-electric-blue border border-electric-blue/30' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </motion.button>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Schedule</h3>
          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowScheduleModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-neon-purple/20 to-electric-blue/20 text-neon-purple border border-neon-purple/30 hover:border-neon-purple/60 transition-all duration-200 mb-4"
          >
            <Plus size={20} />
            New Event
          </motion.button>
          
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-500 mb-2">Upcoming</h4>
            {scheduledEvents.filter(e => e.status === 'upcoming').slice(0, 2).map(event => (
              <div key={event.id} className="glass rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 rounded-full ${
                    event.type === 'meeting' ? 'bg-blue-400' :
                    event.type === 'deadline' ? 'bg-red-400' : 'bg-yellow-400'
                  }`} />
                  <span className="text-sm font-medium text-white truncate">{event.title}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(event.date).toLocaleDateString()} • {event.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-dark-gray border-b border-gray-800 p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search teams, events, or students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-dark border border-gray-700 rounded-xl pl-12 pr-4 py-3 focus:border-electric-blue focus:outline-none transition-colors"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 glass rounded-xl hover:bg-gray-700/50 transition-colors"
              >
                <Filter size={20} />
              </motion.button>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 glass rounded-xl hover:bg-gray-700/50 transition-colors"
                >
                  <Bell size={20} />
                  {notifications.filter(n => n.unread).length > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-neon-teal rounded-full flex items-center justify-center text-xs font-bold">
                      {notifications.filter(n => n.unread).length}
                    </div>
                  )}
                </motion.button>

                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-80 glass rounded-xl p-4 z-50 max-h-96 overflow-y-auto"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg">Notifications</h3>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {notifications.map(notif => (
                        <div
                          key={notif.id}
                          className={`p-3 rounded-lg transition-colors ${
                            notif.unread ? 'bg-electric-blue/10 border border-electric-blue/30' : 'bg-gray-800/50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notif.type === 'team' ? 'bg-blue-400' :
                              notif.type === 'event' ? 'bg-green-400' :
                              notif.type === 'rating' ? 'bg-yellow-400' :
                              notif.type === 'message' ? 'bg-purple-400' : 'bg-neon-teal'
                            }`} />
                            <div className="flex-1">
                              <p className="text-sm text-gray-200">{notif.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 bg-gradient-to-r from-electric-blue to-neon-purple rounded-full flex items-center justify-center cursor-pointer"
                >
                  <User size={20} />
                </motion.button>

                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-56 glass rounded-xl p-2 z-50"
                  >
                    <div className="px-3 py-2 border-b border-gray-700 mb-2">
                      <p className="font-semibold">{currentUser?.name || 'User'}</p>
                      <p className="text-xs text-gray-400">{currentUser?.email || ''}</p>
                      <p className="text-xs text-neon-purple mt-1 capitalize">{currentUser?.role || 'student'}</p>
                    </div>
                    <button
                      onClick={() => { navigate('/profile'); setShowProfileMenu(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => { navigate('/dashboard'); setShowProfileMenu(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                      Dashboard
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                      Settings
                    </button>
                    {currentUser?.role === 'admin' && (
                      <button
                        onClick={() => { navigate('/admin'); setShowProfileMenu(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-neon-purple/20 transition-colors text-neon-purple"
                      >
                        Admin Dashboard
                      </button>
                    )}
                    <div className="border-t border-gray-700 mt-2 pt-2">
                      <button
                        onClick={() => {
                          localStorage.removeItem('token')
                          localStorage.removeItem('user')
                          navigate('/login')
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.header>

        {/* Dashboard Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 p-6 overflow-y-auto"
        >
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 mb-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/10 via-neon-purple/10 to-neon-teal/10" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Welcome back, <span className="gradient-text">{currentUser?.name || 'User'}!</span></h2>
                <p className="text-gray-400">Ready to collaborate and build something amazing today?</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/team-matching')}
                className="px-6 py-3 bg-gradient-to-r from-electric-blue to-neon-teal rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-neon-blue/50 transition-all"
              >
                <Users size={20} />
                Find Teams
              </motion.button>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/projects')}
              className="glass rounded-xl p-4 text-left hover:shadow-neon-blue/10 transition-all"
            >
              <FolderOpen className="text-electric-blue mb-2" size={24} />
              <p className="font-semibold">My Projects</p>
              <p className="text-xs text-gray-400">View all projects</p>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/clubs-events')}
              className="glass rounded-xl p-4 text-left hover:shadow-neon-purple/10 transition-all"
            >
              <Calendar className="text-neon-purple mb-2" size={24} />
              <p className="font-semibold">Events</p>
              <p className="text-xs text-gray-400">Browse events</p>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/community')}
              className="glass rounded-xl p-4 text-left hover:shadow-neon-teal/10 transition-all"
            >
              <MessageCircle className="text-neon-teal mb-2" size={24} />
              <p className="font-semibold">Community</p>
              <p className="text-xs text-gray-400">Join discussions</p>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/peer-evaluation')}
              className="glass rounded-xl p-4 text-left hover:shadow-yellow-400/10 transition-all"
            >
              <Star className="text-yellow-400 mb-2" size={24} />
              <p className="font-semibold">Peer Review</p>
              <p className="text-xs text-gray-400">Give feedback</p>
            </motion.button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass rounded-2xl p-6 hover:shadow-neon-blue/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-electric-blue/20 rounded-xl">
                  <MessageCircle className="text-electric-blue" size={24} />
                </div>
                <TrendingUp className="text-green-400" size={20} />
              </div>
              <div className="text-2xl font-bold mb-1">5</div>
              <div className="text-gray-400 text-sm">Teams Joined</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass rounded-2xl p-6 hover:shadow-neon-purple/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-neon-purple/20 rounded-xl">
                  <Award className="text-neon-purple" size={24} />
                </div>
                <TrendingUp className="text-green-400" size={20} />
              </div>
              <div className="text-2xl font-bold mb-1">3</div>
              <div className="text-gray-400 text-sm">Events Won</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass rounded-2xl p-6 hover:shadow-neon-teal/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-neon-teal/20 rounded-xl">
                  <ThumbsUp className="text-neon-teal" size={24} />
                </div>
                <TrendingUp className="text-green-400" size={20} />
              </div>
              <div className="text-2xl font-bold mb-1">12</div>
              <div className="text-gray-400 text-sm">Successful Matches</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass rounded-2xl p-6 hover:shadow-electric-blue/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-electric-blue/20 rounded-xl">
                  <Clock className="text-electric-blue" size={24} />
                </div>
                <div className="text-green-400 text-sm">+12%</div>
              </div>
              <div className="text-2xl font-bold mb-1">4.8</div>
              <div className="text-gray-400 text-sm">Team Rating</div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Events */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-space font-bold">Upcoming Events</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-electric-blue hover:underline"
                >
                  View All
                </motion.button>
              </div>

              <div className="space-y-4">
                {recentEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.01, x: 4 }}
                    className="glass rounded-2xl p-6 hover:shadow-neon-blue/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'open' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {event.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-4">
                        <span className="px-2 py-1 bg-electric-blue/20 text-electric-blue rounded-lg">
                          {event.category}
                        </span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={16} />
                        <span>{event.teams} teams</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Top Collaborators */}
            <div>
              <h2 className="text-2xl font-space font-bold mb-6">Top Collaborators</h2>
              <div className="space-y-4">
                {topCollaborators.map((collaborator, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    className="glass rounded-2xl p-4 hover:shadow-neon-purple/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-electric-blue rounded-full flex items-center justify-center">
                        <User size={20} />
                      </div>
                      <div>
                        <div className="font-semibold">{collaborator.name}</div>
                        <div className="text-sm text-gray-400">{collaborator.expertise}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <div className="text-yellow-400">★</div>
                        <span>{collaborator.rating}</span>
                      </div>
                      <div className="text-gray-400">{collaborator.projects} projects</div>
                    </div>
                  </motion.div>
                ))}
              </div>


            </div>
          </div>

          {/* Schedule Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-space font-bold">My Schedule</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowScheduleModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-neon-purple to-electric-blue rounded-xl font-semibold flex items-center gap-2"
              >
                <Plus size={20} />
                New Event
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Clock className="text-blue-400" size={20} />
                  Upcoming Events
                </h3>
                <div className="space-y-3">
                  {scheduledEvents.filter(e => e.status === 'upcoming').map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass rounded-xl p-4 hover:shadow-neon-blue/10 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            event.type === 'meeting' ? 'bg-blue-400' :
                            event.type === 'deadline' ? 'bg-red-400' : 'bg-yellow-400'
                          }`} />
                          <h4 className="font-semibold text-white">{event.title}</h4>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          event.type === 'meeting' ? 'bg-blue-500/20 text-blue-400' :
                          event.type === 'deadline' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {event.type}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {event.time}
                      </div>
                    </motion.div>
                  ))}
                  {scheduledEvents.filter(e => e.status === 'upcoming').length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <Calendar size={48} className="mx-auto mb-2 opacity-50" />
                      <p>No upcoming events</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Clock className="text-gray-400" size={20} />
                  Past Events
                </h3>
                <div className="space-y-3">
                  {scheduledEvents.filter(e => e.status === 'past').map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass rounded-xl p-4 opacity-60"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-gray-500" />
                          <h4 className="font-semibold text-white">{event.title}</h4>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400 capitalize">
                          {event.type}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {event.time}
                      </div>
                    </motion.div>
                  ))}
                  {scheduledEvents.filter(e => e.status === 'past').length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <Calendar size={48} className="mx-auto mb-2 opacity-50" />
                      <p>No past events</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.main>
      </div>

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(0, 191, 255, 0.6)" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/team-matching')}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-electric-blue to-neon-teal rounded-full flex items-center justify-center shadow-neon-blue hover:shadow-neon-blue/60 transition-all duration-300"
      >
        <Users size={24} />
      </motion.button>

      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold gradient-text">Schedule Event</h2>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="p-2 glass rounded-lg hover:bg-red-500/20"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault()
              const newEvent = {
                id: Date.now(),
                title: scheduleData.title,
                type: scheduleData.type,
                date: scheduleData.date,
                time: scheduleData.time,
                status: new Date(scheduleData.date) > new Date() ? 'upcoming' : 'past'
              }
              setScheduledEvents([...scheduledEvents, newEvent])
              alert(`${scheduleData.type} "${scheduleData.title}" scheduled!`)
              setShowScheduleModal(false)
              setScheduleData({ title: '', type: 'meeting', date: '', time: '' })
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Event Title *</label>
                <input
                  type="text"
                  required
                  value={scheduleData.title}
                  onChange={(e) => setScheduleData({...scheduleData, title: e.target.value})}
                  placeholder="Enter event title..."
                  className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Event Type *</label>
                <select
                  value={scheduleData.type}
                  onChange={(e) => setScheduleData({...scheduleData, type: e.target.value})}
                  className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                >
                  <option value="meeting" className="bg-gray-800">Meeting</option>
                  <option value="deadline" className="bg-gray-800">Deadline</option>
                  <option value="reminder" className="bg-gray-800">Reminder</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Date *</label>
                  <input
                    type="date"
                    required
                    value={scheduleData.date}
                    onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})}
                    className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Time *</label>
                  <input
                    type="time"
                    required
                    value={scheduleData.time}
                    onChange={(e) => setScheduleData({...scheduleData, time: e.target.value})}
                    className="w-full glass rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 text-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 glass py-3 rounded-xl font-semibold hover:bg-gray-700/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-neon-purple to-electric-blue py-3 rounded-xl font-semibold"
                >
                  Schedule
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Dashboard