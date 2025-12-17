import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useThemeStore } from './../store/themeStore';
import {
    Calendar,
    Clock,
    User,
    Tag,
    ChevronLeft,
    Share2,
    MessageCircle,
    BookOpen,
    Heart,
    Facebook,
    Twitter,
    Linkedin,
    Mail,
    ChevronRight,
    Award,
    GraduationCap
} from 'lucide-react';
import SEO from './../components/SEO';
import LoadingSpinner from './../components/LoadingSpinner';
// Mock blog data - in real app, this would come from API/database
const blogPosts = {
    1: {
        id: 1,
        title: "5 Strategies to Make Math Fun for Elementary Students",
        excerpt: "Discover engaging techniques to transform math from a chore into an adventure for young learners.",
        content: `
      <p>Mathematics doesn't have to be a subject that students dread. In fact, with the right approach, it can become one of the most enjoyable and rewarding parts of a child's education. Here are five proven strategies to make math fun for elementary students.</p>
      
      <h2>1. Gamify Math Learning</h2>
      <p>Children naturally love games, and when you incorporate math into gameplay, learning becomes an adventure rather than a chore. Consider these approaches:</p>
      
      <ul>
        <li><strong>Math Board Games:</strong> Games like Sum Swamp or Math Dice turn basic arithmetic into friendly competition</li>
        <li><strong>Digital Math Games:</strong> Educational apps like Prodigy or Khan Academy Kids make practice feel like play</li>
        <li><strong>Math Scavenger Hunts:</strong> Hide math problems around the classroom or home for students to solve</li>
      </ul>
      
      <h2>2. Connect Math to Real Life</h2>
      <p>When students see how math applies to their daily lives, it becomes more meaningful and engaging:</p>
      
      <ul>
        <li><strong>Cooking Measurements:</strong> Double a recipe together and practice fractions</li>
        <li><strong>Grocery Shopping:</strong> Calculate totals, discounts, and change</li>
        <li><strong>Sports Statistics:</strong> Track and analyze favorite players' stats</li>
      </ul>
      
      <h2>3. Use Hands-On Manipulatives</h2>
      <p>Physical objects help abstract concepts become concrete:</p>
      
      <ul>
        <li><strong>Base Ten Blocks:</strong> Perfect for understanding place value</li>
        <li><strong>Fraction Circles:</strong> Visualize parts of a whole</li>
        <li><strong>Pattern Blocks:</strong> Explore geometry and symmetry</li>
      </ul>
      
      <h2>4. Incorporate Movement</h2>
      <p>Kinesthetic learning engages different parts of the brain:</p>
      
      <ul>
        <li><strong>Math Hopscotch:</strong> Solve problems by jumping to answers</li>
        <li><strong>Human Number Line:</strong> Students become numbers on a life-sized number line</li>
        <li><strong>Math Simon Says:</strong> Incorporate math problems into movement games</li>
      </ul>
      
      <h2>5. Celebrate Math Success</h2>
      <p>Recognition and celebration motivate continued effort:</p>
      
      <ul>
        <li><strong>Math Achievement Wall:</strong> Display student work and accomplishments</li>
        <li><strong>Math Certificates:</strong> Recognize improvement and mastery</li>
        <li><strong>Math Story Time:</strong> Share stories of mathematicians and their discoveries</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Making math fun isn't about eliminating the challenge—it's about framing mathematics as an exciting puzzle to solve. When students enjoy the process of learning math, they develop confidence and competence that will serve them throughout their education.</p>
      
      <p>At Our World of Education, we integrate these strategies into our elementary curriculum, ensuring that every student develops both mathematical skills and a positive attitude toward learning.</p>
    `,
        author: {
            name: "Dr. Sarah Chen",
            role: "Founder & Academic Director",
            bio: "Ph.D. in Mathematics Education with 20+ years of teaching experience. Former MIT Mathematics Professor.",
            image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        date: "Mar 15, 2024",
        readTime: "5 min read",
        category: "teaching",
        tags: ["Elementary Math", "Teaching Strategies", "Student Engagement", "Math Games", "Hands-On Learning"],
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        views: 1250,
        likes: 89,
        comments: 24
    },
    2: {
        id: 2,
        title: "How to Prepare Your Child for Math Competitions",
        excerpt: "A comprehensive guide for parents and students interested in mathematics competitions.",
        content: `<p>Content for competition article...</p>`,
        author: {
            name: "David Kim",
            role: "Competition Program Director",
            bio: "IMO Gold Medalist with 10+ years of coaching experience. Has coached 50+ AIME qualifiers.",
            image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        date: "Mar 10, 2024",
        readTime: "8 min read",
        category: "competition",
        tags: ["Math Competitions", "AMC", "Preparation", "Problem Solving", "Advanced Math"],
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        views: 980,
        likes: 67,
        comments: 18
    }
};

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useThemeStore();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    // Brand colors
    const primaryColor = '#007698';
    const accentColor = '#8bc540';
    const primaryLight = '#e6f4f9';

    // Related articles (mock data - would filter by category/tags in real app)
    const relatedArticles = [
        {
            id: 3,
            title: "The Importance of Building Math Confidence Early",
            excerpt: "Why early math confidence impacts academic success throughout a child's education.",
            author: "Priya Sharma",
            date: "Mar 5, 2024",
            readTime: "6 min read",
            category: "student-success",
            image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 4,
            title: "Integrating Technology in Math Education",
            excerpt: "How digital tools are revolutionizing the way we teach and learn mathematics.",
            author: "Michael Rodriguez",
            date: "Feb 28, 2024",
            readTime: "7 min read",
            category: "technology",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 5,
            title: "Common Core Math: What Parents Need to Know",
            excerpt: "Demystifying Common Core standards and how they benefit student learning.",
            author: "Dr. Sarah Chen",
            date: "Feb 22, 2024",
            readTime: "10 min read",
            category: "parent-tips",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
    ];

    // Categories for navigation
    const categories = [
        { id: 'teaching', name: 'Teaching Strategies' },
        { id: 'curriculum', name: 'Curriculum' },
        { id: 'student-success', name: 'Student Success' },
        { id: 'parent-tips', name: 'Parent Tips' },
        { id: 'competition', name: 'Math Competitions' },
        { id: 'technology', name: 'EdTech' }
    ];

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const foundPost = blogPosts[id];
            if (foundPost) {
                setPost(foundPost);
                setLikesCount(foundPost.likes);

                // Mock comments
                setComments([
                    {
                        id: 1,
                        name: "Parent of 3rd Grader",
                        date: "Mar 16, 2024",
                        comment: "These strategies worked wonders for my son! He went from dreading math to asking for extra problems.",
                        avatar: "👨‍👦"
                    },
                    {
                        id: 2,
                        name: "Elementary Teacher",
                        date: "Mar 17, 2024",
                        comment: "I've implemented the math scavenger hunt idea in my classroom. The engagement levels have skyrocketed!",
                        avatar: "👩‍🏫"
                    },
                    {
                        id: 3,
                        name: "Homeschool Parent",
                        date: "Mar 18, 2024",
                        comment: "The cooking measurement tip was a game-changer. My daughter finally understands fractions!",
                        avatar: "👨‍👧"
                    }
                ]);
            }
            setLoading(false);
        }, 500);
    }, [id]);

    // Structured Data for Blog Post
    const getStructuredData = () => {
        if (!post) return null;

        return {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.image,
            "datePublished": post.date,
            "dateModified": post.date,
            "author": {
                "@type": "Person",
                "name": post.author.name,
                "jobTitle": post.author.role
            },
            "publisher": {
                "@type": "EducationalOrganization",
                "name": "Our World of Education",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://our-we.netlify.app/logo.png"
                }
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://our-we.netlify.app/blog/${post.id}`
            },
            "articleSection": post.category,
            "keywords": post.tags.join(", ")
        };
    };

    const handleLike = () => {
        if (!liked) {
            setLikesCount(prev => prev + 1);
            setLiked(true);
        } else {
            setLikesCount(prev => prev - 1);
            setLiked(false);
        }
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.trim() && name.trim() && email.trim()) {
            const newComment = {
                id: comments.length + 1,
                name,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                comment,
                avatar: "👤"
            };
            setComments([newComment, ...comments]);
            setComment('');
            setName('');
            setEmail('');
        }
    };

    const shareOnSocial = (platform) => {
        const url = window.location.href;
        const text = post?.title || '';

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`, '_blank');
                break;
            case 'email':
                window.location.href = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`;
                break;
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
                <LoadingSpinner />
            </div>
        );
    }

    if (!post) {
        return (
            <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
                <Navbar />
                <main className="pt-32 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Article Not Found</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">The blog post you're looking for doesn't exist.</p>
                    <Link
                        to="/blog"
                        className="inline-flex items-center px-6 py-3 bg-[#007698] text-white rounded-lg hover:bg-[#005a75] transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 mr-2" />
                        Back to Blog
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <>
            <SEO
                title={`${post.title} | Our World of Education Blog`}
                description={post.excerpt}
                keywords={post.tags.join(", ")}
                url={`https://our-we.netlify.app/blog/${post.id}`}
                image={post.image}
                author={post.author.name}
                publishedTime={post.date}
                structuredData={getStructuredData()}
            />

            <Suspense fallback={<LoadingSpinner />}>
                <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
                    <main className="pt-16">
                        {/* Back to Blog */}
                        <div className="py-6 px-4 md:px-8 lg:px-16">
                            <div className="max-w-4xl mx-auto">
                                <button
                                    onClick={() => navigate('/blog')}
                                    className={`inline-flex items-center ${theme === 'light' ? 'text-[#007698] hover:text-[#005a75]' : 'text-gray-400 hover:text-gray-300'} transition-colors`}
                                >
                                    <ChevronLeft className="w-5 h-5 mr-2" />
                                    Back to Blog
                                </button>
                            </div>
                        </div>

                        {/* Article Header */}
                        <article className="pb-16 px-4 md:px-8 lg:px-16">
                            <div className="max-w-4xl mx-auto">
                                {/* Category & Date */}
                                <div className="flex items-center mb-6">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${theme === 'light'
                                        ? 'bg-[#e6f4f9] text-[#007698]'
                                        : 'bg-gray-700 text-gray-300'
                                        }`}>
                                        {categories.find(c => c.id === post.category)?.name}
                                    </span>
                                    <span className="mx-4 text-gray-400">•</span>
                                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {post.date}
                                    </span>
                                </div>

                                {/* Title */}
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8">
                                    {post.title}
                                </h1>

                                {/* Excerpt */}
                                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                {/* Author & Stats */}
                                <div className="flex flex-wrap items-center justify-between mb-12 pb-8 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center mb-4 md:mb-0">
                                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                                            <img
                                                src={post.author.image}
                                                alt={post.author.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 dark:text-white">
                                                {post.author.name}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {post.author.role}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-6">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-gray-600 dark:text-gray-400">
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <button
                                            onClick={handleLike}
                                            className={`flex items-center ${liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                                        >
                                            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                                            <span className="ml-2">{likesCount}</span>
                                        </button>
                                        <div className="flex items-center text-gray-400">
                                            <MessageCircle className="w-5 h-5 mr-2" />
                                            <span>{comments.length}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Featured Image */}
                                <div className="mb-12 rounded-2xl overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-auto max-h-[500px] object-cover"
                                    />
                                </div>

                                {/* Article Content */}
                                <div className={`prose prose-lg max-w-none mb-12 ${theme === 'light'
                                    ? 'prose-gray'
                                    : 'prose-invert dark:prose-dark'
                                    }`}>
                                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                                </div>

                                {/* Tags */}
                                <div className="mb-12">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <Link
                                                key={tag}
                                                to={`/blog?tag=${tag.toLowerCase().replace(/\s+/g, '-')}`}
                                                className={`px-4 py-2 rounded-full text-sm transition-colors ${theme === 'light'
                                                    ? 'bg-gray-100 text-gray-700 hover:bg-[#007698] hover:text-white'
                                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                    }`}
                                            >
                                                {tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Share Section */}
                                <div className={`mb-12 p-6 rounded-2xl ${theme === 'light'
                                    ? 'bg-[#e6f4f9] border border-blue-100'
                                    : 'bg-gray-800 border border-gray-700'
                                    }`}>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Share this article
                                    </h3>
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => shareOnSocial('facebook')}
                                            className={`p-3 rounded-lg transition-colors ${theme === 'light'
                                                ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                }`}
                                            aria-label="Share on Facebook"
                                        >
                                            <Facebook className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => shareOnSocial('twitter')}
                                            className={`p-3 rounded-lg transition-colors ${theme === 'light'
                                                ? 'bg-blue-100 text-blue-400 hover:bg-blue-200'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                }`}
                                            aria-label="Share on Twitter"
                                        >
                                            <Twitter className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => shareOnSocial('linkedin')}
                                            className={`p-3 rounded-lg transition-colors ${theme === 'light'
                                                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                }`}
                                            aria-label="Share on LinkedIn"
                                        >
                                            <Linkedin className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => shareOnSocial('email')}
                                            className={`p-3 rounded-lg transition-colors ${theme === 'light'
                                                ? 'bg-blue-100 text-blue-500 hover:bg-blue-200'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                }`}
                                            aria-label="Share via Email"
                                        >
                                            <Mail className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Author Bio */}
                                <div className={`mb-12 p-8 rounded-2xl ${theme === 'light'
                                    ? 'bg-gray-50 border border-gray-100'
                                    : 'bg-gray-800 border border-gray-700'
                                    }`}>
                                    <div className="flex flex-col md:flex-row items-start md:items-center">
                                        <div className="w-20 h-20 rounded-full overflow-hidden mb-6 md:mb-0 md:mr-8">
                                            <img
                                                src={post.author.image}
                                                alt={post.author.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                                About {post.author.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                                {post.author.bio}
                                            </p>
                                            <div className="flex items-center">
                                                <Award className="w-5 h-5 text-[#007698] dark:text-blue-400 mr-2" />
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    Expert Mathematics Educator
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Comments Section */}
                                <div className="mb-16">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                                        Comments ({comments.length})
                                    </h3>

                                    {/* Comment Form */}
                                    <form onSubmit={handleCommentSubmit} className="mb-12">
                                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className={`w-full px-4 py-3 rounded-lg border ${theme === 'light'
                                                        ? 'border-gray-300 focus:border-[#007698] focus:ring-2 focus:ring-blue-200'
                                                        : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                                        } focus:outline-none transition-colors`}
                                                    placeholder="Your name"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className={`w-full px-4 py-3 rounded-lg border ${theme === 'light'
                                                        ? 'border-gray-300 focus:border-[#007698] focus:ring-2 focus:ring-blue-200'
                                                        : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                                        } focus:outline-none transition-colors`}
                                                    placeholder="your@email.com"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Comment *
                                            </label>
                                            <textarea
                                                id="comment"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                rows={4}
                                                className={`w-full px-4 py-3 rounded-lg border ${theme === 'light'
                                                    ? 'border-gray-300 focus:border-[#007698] focus:ring-2 focus:ring-blue-200'
                                                    : 'border-gray-600 bg-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-900'
                                                    } focus:outline-none transition-colors`}
                                                placeholder="Share your thoughts..."
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className={`px-8 py-3 rounded-lg font-semibold transition-colors ${theme === 'light'
                                                ? 'bg-[#007698] hover:bg-[#005a75] text-white'
                                                : 'bg-gray-700 hover:bg-gray-600 text-white'
                                                }`}
                                        >
                                            Post Comment
                                        </button>
                                    </form>

                                    {/* Comments List */}
                                    <div className="space-y-8">
                                        {comments.map((comment) => (
                                            <div
                                                key={comment.id}
                                                className={`p-6 rounded-2xl ${theme === 'light'
                                                    ? 'bg-gray-50 border border-gray-100'
                                                    : 'bg-gray-800 border border-gray-700'
                                                    }`}
                                            >
                                                <div className="flex items-start mb-4">
                                                    <div className="text-2xl mr-4">{comment.avatar}</div>
                                                    <div>
                                                        <div className="font-bold text-gray-900 dark:text-white">
                                                            {comment.name}
                                                        </div>
                                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                                            {comment.date}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 dark:text-gray-300">
                                                    {comment.comment}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* Related Articles */}
                        <section className={`py-16 px-4 md:px-8 lg:px-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
                            }`}>
                            <div className="max-w-7xl mx-auto">
                                <div className="flex items-center justify-between mb-12">
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                        Related <span style={{ color: primaryColor }}>Articles</span>
                                    </h2>
                                    <Link
                                        to="/blog"
                                        className={`flex items-center ${theme === 'light' ? 'text-[#007698] hover:text-[#005a75]' : 'text-gray-400 hover:text-gray-300'}`}
                                    >
                                        View All Articles
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </Link>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    {relatedArticles.map((article) => (
                                        <article
                                            key={article.id}
                                            className={`rounded-2xl overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 ${theme === 'light'
                                                ? 'bg-white shadow-lg hover:shadow-xl'
                                                : 'bg-gray-700 shadow-xl hover:shadow-2xl'
                                                }`}
                                        >
                                            <Link to={`/blog/${article.id}`}>
                                                <div className="relative h-48">
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="p-6">
                                                    <div className="flex items-center mb-4">
                                                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            {article.date}
                                                        </span>
                                                        <span className="mx-4 text-gray-400">•</span>
                                                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            {article.readTime}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-[#007698] dark:hover:text-blue-400">
                                                        {article.title}
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                                        {article.excerpt}
                                                    </p>
                                                    <div className="flex items-center">
                                                        <User className="w-4 h-4 text-gray-400 mr-2" />
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            {article.author}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Newsletter CTA */}
                        <section className="py-16 px-4 md:px-8 lg:px-16">
                            <div className="max-w-4xl mx-auto">
                                <div className={`rounded-3xl p-8 md:p-12 text-center ${theme === 'light'
                                    ? 'bg-linear-to-r from-[#007698] to-[#8bc540] text-white'
                                    : 'bg-linear-to-r from-gray-800 to-gray-900 text-white'
                                    }`}>
                                    <GraduationCap className="w-16 h-16 mx-auto mb-6" />
                                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                        Never Miss an Update
                                    </h2>

                                    <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                                        Subscribe to our newsletter for the latest math education insights,
                                        teaching resources, and success stories.
                                    </p>

                                    <form className="max-w-md mx-auto">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <input
                                                type="email"
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

export default BlogPost;