import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Calendar, Clock, Users, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';

interface Session {
  id: string;
  title: string;
  domain: string;
  date: string;
  time: string;
  instructor: string;
  capacity: number;
  enrolled: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    domain: '',
    level: '',
  });

  // Mock data for sessions
  const mockSessions: Session[] = [
    {
      id: '1',
      title: 'Introduction to HTML & CSS',
      domain: 'Web Development',
      date: '2025-05-15',
      time: '10:00 AM - 12:00 PM',
      instructor: 'Ananya Gupta',
      capacity: 30,
      enrolled: 15,
      level: 'Beginner',
    },
    {
      id: '2',
      title: 'JavaScript Fundamentals',
      domain: 'Web Development',
      date: '2025-05-18',
      time: '2:00 PM - 4:00 PM',
      instructor: 'Rahul Verma',
      capacity: 25,
      enrolled: 20,
      level: 'Beginner',
    },
    {
      id: '3',
      title: 'React.js Crash Course',
      domain: 'Web Development',
      date: '2025-05-20',
      time: '11:00 AM - 1:00 PM',
      instructor: 'Priya Patel',
      capacity: 20,
      enrolled: 18,
      level: 'Intermediate',
    },
    {
      id: '4',
      title: 'Python for Data Science',
      domain: 'Data Science',
      date: '2025-05-22',
      time: '9:00 AM - 12:00 PM',
      instructor: 'Vikram Singh',
      capacity: 25,
      enrolled: 10,
      level: 'Beginner',
    },
    {
      id: '5',
      title: 'Machine Learning Basics',
      domain: 'AI & ML',
      date: '2025-05-25',
      time: '3:00 PM - 6:00 PM',
      instructor: 'Aditya Sharma',
      capacity: 20,
      enrolled: 12,
      level: 'Intermediate',
    },
    {
      id: '6',
      title: 'Flutter App Development',
      domain: 'App Development',
      date: '2025-05-27',
      time: '1:00 PM - 4:00 PM',
      instructor: 'Karthik Raj',
      capacity: 15,
      enrolled: 8,
      level: 'Intermediate',
    },
    {
      id: '7',
      title: 'Advanced React with Redux',
      domain: 'Web Development',
      date: '2025-05-30',
      time: '10:00 AM - 1:00 PM',
      instructor: 'Ananya Gupta',
      capacity: 15,
      enrolled: 10,
      level: 'Advanced',
    },
    {
      id: '8',
      title: 'Deep Learning with TensorFlow',
      domain: 'AI & ML',
      date: '2025-06-02',
      time: '2:00 PM - 5:00 PM',
      instructor: 'Vikram Singh',
      capacity: 15,
      enrolled: 5,
      level: 'Advanced',
    },
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      let filtered = [...mockSessions];
      
      // Filter by search query
      if (query) {
        const lowerQuery = query.toLowerCase();
        filtered = filtered.filter(
          session =>
            session.title.toLowerCase().includes(lowerQuery) ||
            session.domain.toLowerCase().includes(lowerQuery) ||
            session.instructor.toLowerCase().includes(lowerQuery)
        );
      }
      
      setSessions(filtered);
      setLoading(false);
    }, 800);
  }, [query]);

  const handleFilterChange = (key: 'domain' | 'level', value: string) => {
    setFilter(prev => ({
      ...prev,
      [key]: prev[key] === value ? '' : value,
    }));
  };

  // Apply filters
  const filteredSessions = sessions.filter(session => {
    const domainMatch = filter.domain === '' || session.domain === filter.domain;
    const levelMatch = filter.level === '' || session.level === filter.level;
    return domainMatch && levelMatch;
  });

  // Get unique domains for filtering
  const domains = Array.from(new Set(sessions.map(session => session.domain)));
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <>
      <SEO 
        title={query ? `Search: ${query}` : 'Search Sessions'} 
        description="Find upcoming educational sessions and workshops at Engiversee."
      />
      
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              {query ? `Search results for "${query}"` : 'Browse All Sessions'}
            </h1>
            
            <form className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                defaultValue={query}
                placeholder="Search for sessions, topics, or instructors..."
                className="w-full pl-10 pr-4 py-3 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Domain</h3>
                  <div className="space-y-2">
                    {domains.map(domain => (
                      <button
                        key={domain}
                        onClick={() => handleFilterChange('domain', domain)}
                        className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                          filter.domain === domain
                            ? 'bg-blue-100 text-blue-700'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {domain}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Experience Level</h3>
                  <div className="space-y-2">
                    {levels.map(level => (
                      <button
                        key={level}
                        onClick={() => handleFilterChange('level', level)}
                        className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                          filter.level === level
                            ? 'bg-blue-100 text-blue-700'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results */}
            <div className="lg:col-span-3">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 className="text-xl font-bold">
                    {loading
                      ? 'Loading sessions...'
                      : filteredSessions.length > 0
                      ? `${filteredSessions.length} Session${filteredSessions.length > 1 ? 's' : ''} Found`
                      : 'No sessions found'}
                  </h2>
                  
                  {Object.values(filter).some(v => v !== '') && (
                    <button
                      onClick={() => setFilter({ domain: '', level: '' })}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>
              
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
                  <p className="mt-4 text-gray-600">Loading sessions...</p>
                </div>
              ) : filteredSessions.length > 0 ? (
                <div className="space-y-6">
                  {filteredSessions.map((session) => (
                    <motion.div
                      key={session.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="p-6">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              session.domain === 'Web Development'
                                ? 'bg-blue-100 text-blue-700'
                                : session.domain === 'App Development'
                                ? 'bg-green-100 text-green-700'
                                : session.domain === 'Data Science'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-orange-100 text-orange-700'
                            }`}>
                              {session.domain}
                            </span>
                            <span className="inline-block ml-2 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                              {session.level}
                            </span>
                          </div>
                          
                          <span className="text-sm text-gray-600">
                            {session.enrolled} / {session.capacity} enrolled
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold mt-4 mb-2">{session.title}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                            <span className="text-sm">{new Date(session.date).toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-blue-600 mr-2" />
                            <span className="text-sm">{session.time}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                            <span className="text-sm">{session.instructor}</span>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
                          <div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${(session.enrolled / session.capacity) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {session.capacity - session.enrolled} spots remaining
                            </p>
                          </div>
                          
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <div className="flex justify-center mb-4">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No sessions found</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any sessions matching your search criteria. Try adjusting your filters or search term.
                  </p>
                  <button
                    onClick={() => {
                      window.history.pushState({}, '', '/search');
                      window.location.reload();
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View All Sessions
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;