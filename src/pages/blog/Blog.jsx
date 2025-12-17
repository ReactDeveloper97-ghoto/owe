import React, { lazy, Suspense, useState } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  Tag,
  Search,
  ChevronRight,
  BookOpen,
  TrendingUp,
  Award,
  GraduationCap,
  Filter,
  ChevronLeft,
  ChevronDown,
  Share2,
  MessageCircle,
  Mail
} from 'lucide-react';
import SEO from '../../components/SEO';
import LoadingSpinner from '../../components/LoadingSpinner';

const Blog = () => {
  const { theme } = useThemeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Brand colors
  const primaryColor = '#007698';
  const accentColor = '#8bc540';
  const primaryLight = '#e6f4f9';

  // Structured Data for Blog Page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Mathematics Education Blog | Our World of Education",
    "description": "Expert insights, tips, and resources for mathematics education. Learn about teaching strategies, student success, and educational trends.",
    "url": "https://our-we.netlify.app/blog",
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Our World of Education",
      "logo": {
        "@type": "ImageObject",
        "url": "https://our-we.netlify.app/logo.png"
      }
    },
    "blogPost": []
  };

  // Blog categories
  const categories = [
    { id: 'all', name: 'All Articles', count: 24 },
    { id: 'teaching', name: 'Teaching Strategies', count: 8 },
    { id: 'curriculum', name: 'Curriculum', count: 5 },
    { id: 'student-success', name: 'Student Success', count: 6 },
    { id: 'parent-tips', name: 'Parent Tips', count: 7 },
    { id: 'competition', name: 'Math Competitions', count: 4 },
    { id: 'technology', name: 'EdTech', count: 3 }
  ];

  // Featured articles
  const featuredArticles = [
    {
      id: 1,
      title: "5 Strategies to Make Math Fun for Elementary Students",
      excerpt: "Discover engaging techniques to transform math from a chore into an adventure for young learners.",
      author: "Dr. Sarah Chen",
      date: "Mar 15, 2024",
      readTime: "5 min read",
      category: "teaching",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 2,
      title: "How to Prepare Your Child for Math Competitions",
      excerpt: "A comprehensive guide for parents and students interested in mathematics competitions.",
      author: "David Kim",
      date: "Mar 10, 2024",
      readTime: "8 min read",
      category: "competition",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    }
  ];

  // Recent articles
  const articles = [
    {
      id: 3,
      title: "The Importance of Building Math Confidence Early",
      excerpt: "Why early math confidence impacts academic success throughout a child's education.",
      author: "Priya Sharma",
      date: "Mar 5, 2024",
      readTime: "6 min read",
      category: "student-success",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Integrating Technology in Math Education",
      excerpt: "How digital tools are revolutionizing the way we teach and learn mathematics.",
      author: "Michael Rodriguez",
      date: "Feb 28, 2024",
      readTime: "7 min read",
      category: "technology",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Common Core Math: What Parents Need to Know",
      excerpt: "Demystifying Common Core standards and how they benefit student learning.",
      author: "Dr. Sarah Chen",
      date: "Feb 22, 2024",
      readTime: "10 min read",
      category: "parent-tips",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Algebra Foundations for Middle School Success",
      excerpt: "Essential algebra concepts every middle school student should master.",
      author: "David Kim",
      date: "Feb 18, 2024",
      readTime: "8 min read",
      category: "curriculum",
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 7,
      title: "Homework Strategies That Actually Work",
      excerpt: "Research-backed techniques to make math homework effective and stress-free.",
      author: "Priya Sharma",
      date: "Feb 12, 2024",
      readTime: "6 min read",
      category: "parent-tips",
      image: "https://images.unsplash.com/photo-1456513080510-3446c3c4d0a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 8,
      title: "Calculus Made Accessible: Teaching Approaches",
      excerpt: "Innovative methods to introduce calculus concepts to high school students.",
      author: "Michael Rodriguez",
      date: "Feb 8, 2024",
      readTime: "9 min read",
      category: "teaching",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Popular tags
  const popularTags = [
    "Mathematics", "Education", "Teaching", "Learning", "STEM",
    "Parenting", "Curriculum", "Technology", "Success", "Homework"
  ];

  // Newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log('Subscribed:', email);
    alert('Thank you for subscribing to our blog!');
    e.target.reset();
  };

  // Filter articles based on category
  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  // Pagination
  const articlesPerPage = 6;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  return (
    <>
      <SEO
        title="Mathematics Education Blog | Tips, Strategies & Resources"
        description="Expert insights on mathematics education. Teaching strategies, curriculum tips, parent resources, and student success stories from Our World of Education."
        keywords="math education blog, teaching strategies, mathematics tips, education resources, parent guidance, student success, math curriculum"
        url="https://our-we.netlify.app/blog"
        structuredData={structuredData}
      />

      <Suspense fallback={<LoadingSpinner />}>
        <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>


          <main className="pt-16">
            {/* Hero Section */}
            <section
              className={`relative overflow-hidden py-16 px-4 md:px-8 lg:px-16 ${theme === 'light'
                ? 'bg-linear-to-br from-blue-50 to-cyan-50'
                : 'bg-linear-to-br from-gray-800 to-gray-900'
                }`}
              aria-label="Blog Introduction"
            >
              <div className="relative max-w-7xl mx-auto">
                <div className="text-center">
                  <div className={`inline-flex items-center px-6 py-3 rounded-full ${theme === 'light' ? 'bg-[#e6f4f9]' : 'bg-gray-800'
                    } ${theme === 'light' ? 'text-[#007698]' : 'text-gray-300'} text-lg font-semibold mb-8`}>
                    <BookOpen className="w-5 h-5 mr-2" />
                    Education Insights & Resources
                  </div>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                    Math Education <span style={{ color: primaryColor }}>Blog</span>
                  </h1>

                  <p className="text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Expert insights, teaching strategies, and resources to support
                    mathematics learning and teaching.
                  </p>

                  {/* Search Bar */}
                  <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search articles, topics, or authors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full pl-12 pr-4 py-4 rounded-xl border ${theme === 'light'
                          ? 'border-gray-300 focus:border-[#007698] focus:ring-2 focus:ring-blue-200'
                          : 'border-gray-600 bg-gray-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                          } focus:outline-none transition-colors`}
                      />
                    </div>
                  </div>

                  {/* Category Filters */}
                  <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setCurrentPage(1);
                        }}
                        className={`px-5 py-2.5 rounded-full transition-all duration-300 ${selectedCategory === category.id
                          ? theme === 'light'
                            ? 'bg-[#007698] text-white shadow-lg'
                            : 'bg-gray-700 text-white shadow-lg'
                          : theme === 'light'
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                      >
                        <span className="font-medium">{category.name}</span>
                        <span className={`ml-2 text-sm ${selectedCategory === category.id ? 'opacity-90' : 'opacity-70'
                          }`}>
                          ({category.count})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Articles */}
            <section className="py-16 px-4 md:px-8 lg:px-16" aria-label="Featured Articles">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    Featured <span style={{ color: primaryColor }}>Articles</span>
                  </h2>
                  <div className={`flex items-center ${theme === 'light' ? 'text-[#007698]' : 'text-gray-400'}`}>
                    <TrendingUp className="w-5 h-5 mr-2" />
                    <span className="font-medium">Trending Now</span>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                  {featuredArticles.map((article) => (
                    <article
                      key={article.id}
                      className={`rounded-2xl overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-2 ${theme === 'light'
                        ? 'bg-white shadow-xl hover:shadow-2xl'
                        : 'bg-gray-800 shadow-xl hover:shadow-2xl'
                        }`}
                    >
                      <div className="relative h-64 md:h-72">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${theme === 'light'
                            ? 'bg-white/90 text-[#007698]'
                            : 'bg-gray-800/90 text-gray-300'
                            }`}>
                            Featured
                          </span>
                        </div>
                      </div>

                      <div className="p-8">
                        <div className="flex items-center mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${theme === 'light'
                            ? 'bg-[#e6f4f9] text-[#007698]'
                            : 'bg-gray-700 text-gray-300'
                            }`}>
                            {categories.find(c => c.id === article.category)?.name}
                          </span>
                          <span className="mx-4 text-gray-400">•</span>
                          <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {article.date}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          <Link to={`/blog/${article.id}`} className="hover:text-[#007698] dark:hover:text-blue-400">
                            {article.title}
                          </Link>
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center">
                            <User className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {article.author}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {article.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Main Content Area */}
            <div className="py-16 px-4 md:px-8 lg:px-16">
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-12">
                  {/* Articles List */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Latest <span style={{ color: primaryColor }}>Articles</span>
                      </h2>
                      <div className="flex items-center">
                        <Filter className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Showing {paginatedArticles.length} of {filteredArticles.length} articles
                        </span>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {paginatedArticles.map((article) => (
                        <article
                          key={article.id}
                          className={`p-6 rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-1 ${theme === 'light'
                            ? 'bg-white shadow-lg hover:shadow-xl border border-gray-100'
                            : 'bg-gray-800 shadow-xl hover:shadow-2xl border border-gray-700'
                            }`}
                        >
                          <div className="grid md:grid-cols-3 gap-6">
                            <div className="md:col-span-1">
                              <div className="relative h-48 rounded-xl overflow-hidden">
                                <img
                                  src={article.image}
                                  alt={article.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>

                            <div className="md:col-span-2">
                              <div className="flex items-center mb-3">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${theme === 'light'
                                  ? 'bg-[#e6f4f9] text-[#007698]'
                                  : 'bg-gray-700 text-gray-300'
                                  }`}>
                                  {categories.find(c => c.id === article.category)?.name}
                                </span>
                                <span className="mx-3 text-gray-400">•</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {article.date}
                                </span>
                              </div>

                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                <Link to={`/blog/${article.id}`} className="hover:text-[#007698] dark:hover:text-blue-400">
                                  {article.title}
                                </Link>
                              </h3>

                              <p className="text-gray-600 dark:text-gray-300 mb-4">
                                {article.excerpt}
                              </p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <User className="w-4 h-4 text-gray-400 mr-2" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {article.author}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 text-gray-400 mr-1" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                      {article.readTime}
                                    </span>
                                  </div>
                                  <button className="text-gray-400 hover:text-[#007698]">
                                    <Share2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center space-x-2 mt-12">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className={`p-2 rounded-lg ${currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : theme === 'light'
                              ? 'text-gray-700 hover:bg-gray-100'
                              : 'text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`w-10 h-10 rounded-lg font-medium ${currentPage === index + 1
                              ? theme === 'light'
                                ? 'bg-[#007698] text-white'
                                : 'bg-gray-700 text-white'
                              : theme === 'light'
                                ? 'text-gray-700 hover:bg-gray-100'
                                : 'text-gray-300 hover:bg-gray-700'
                              }`}
                          >
                            {index + 1}
                          </button>
                        ))}

                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className={`p-2 rounded-lg ${currentPage === totalPages
                            ? 'text-gray-400 cursor-not-allowed'
                            : theme === 'light'
                              ? 'text-gray-700 hover:bg-gray-100'
                              : 'text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-8">
                    {/* Newsletter Signup */}
                    <div className={`p-6 rounded-2xl ${theme === 'light'
                      ? 'bg-linear-to-r from-blue-50 to-cyan-50 border border-blue-100'
                      : 'bg-linear-to-r from-gray-800 to-gray-900 border border-gray-700'
                      }`}>
                      <div className="flex items-center mb-4">
                        <Mail className={`w-6 h-6 mr-3 ${theme === 'light' ? 'text-[#007698]' : 'text-gray-300'}`} />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Newsletter
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Get the latest math education tips and resources delivered to your inbox.
                      </p>
                      <form onSubmit={handleSubscribe} className="space-y-4">
                        <input
                          type="email"
                          name="email"
                          placeholder="Your email address"
                          className={`w-full px-4 py-3 rounded-lg border ${theme === 'light'
                            ? 'border-gray-300 focus:border-[#007698] focus:ring-2 focus:ring-blue-200'
                            : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                            } focus:outline-none transition-colors`}
                          required
                        />
                        <button
                          type="submit"
                          className={`w-full py-3 rounded-lg font-semibold transition-colors ${theme === 'light'
                            ? 'bg-[#007698] hover:bg-[#005a75] text-white'
                            : 'bg-gray-700 hover:bg-gray-600 text-white'
                            }`}
                        >
                          Subscribe
                        </button>
                      </form>
                      <p className={`text-xs mt-4 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                        No spam. Unsubscribe anytime.
                      </p>
                    </div>

                    {/* Popular Categories */}
                    <div className={`p-6 rounded-2xl ${theme === 'light'
                      ? 'bg-white shadow-lg border border-gray-100'
                      : 'bg-gray-800 shadow-xl border border-gray-700'
                      }`}>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        Popular Categories
                      </h3>
                      <div className="space-y-4">
                        {categories.slice(1, 6).map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className="flex items-center justify-between w-full group"
                          >
                            <span className={`text-left font-medium ${theme === 'light'
                              ? 'text-gray-700 group-hover:text-[#007698]'
                              : 'text-gray-300 group-hover:text-gray-100'
                              }`}>
                              {category.name}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs ${theme === 'light'
                              ? 'bg-gray-100 text-gray-600'
                              : 'bg-gray-700 text-gray-400'
                              }`}>
                              {category.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Popular Tags */}
                    <div className={`p-6 rounded-2xl ${theme === 'light'
                      ? 'bg-white shadow-lg border border-gray-100'
                      : 'bg-gray-800 shadow-xl border border-gray-700'
                      }`}>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        Popular Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {popularTags.map((tag) => (
                          <button
                            key={tag}
                            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${theme === 'light'
                              ? 'bg-gray-100 text-gray-700 hover:bg-[#007698] hover:text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div className={`p-6 rounded-2xl ${theme === 'light'
                      ? 'bg-linear-to-r from-[#007698] to-[#8bc540] text-white'
                      : 'bg-linear-to-r from-gray-800 to-gray-900 text-white'
                      }`}>
                      <Award className="w-12 h-12 mb-4" />
                      <h3 className="text-xl font-bold mb-4">
                        Looking for Expert Math Help?
                      </h3>
                      <p className="opacity-90 mb-6">
                        Our expert educators are ready to support your child's math journey.
                      </p>
                      <Link
                        to="/programs"
                        className="inline-flex items-center justify-center w-full py-3 bg-white text-[#007698] hover:bg-gray-100 font-semibold rounded-lg transition-colors"
                      >
                        Explore Programs
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Banner */}
            <section className="py-16 px-4 md:px-8 lg:px-16" aria-label="Newsletter Subscription">
              <div className="max-w-4xl mx-auto">
                <div className={`rounded-3xl p-8 md:p-12 text-center ${theme === 'light'
                  ? 'bg-linear-to-r from-blue-600 to-cyan-600 text-white'
                  : 'bg-linear-to-r from-gray-800 to-gray-900 text-white'
                  }`}>
                  <GraduationCap className="w-16 h-16 mx-auto mb-6" />
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Join Our Education Community
                  </h2>

                  <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                    Get weekly insights, teaching resources, and success stories
                    from mathematics educators.
                  </p>

                  <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="flex-1 px-6 py-4 rounded-lg border border-white/30 bg-white/10 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                        required
                      />
                      <button
                        type="submit"
                        className="px-8 py-4 bg-white text-[#007698] hover:bg-gray-100 font-bold rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
                      >
                        Subscribe
                      </button>
                    </div>
                    <p className="text-sm mt-6 opacity-80">
                      2,500+ educators and parents already subscribed
                    </p>
                  </form>
                </div>
              </div>
            </section>
          </main>

        </div>
      </Suspense>
    </>
  );
};

export default Blog;