export interface Product {
  id: number | string;
  name: string;
  nameAr: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  categoryAr: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  description: string;
  descriptionAr: string;
  rating?: number;
  reviewsCount?: number;
  inStock?: boolean;
}

export const products: Product[] = [
  // اشتراكات - Subscriptions
  {
    id: 1,
    name: 'Netflix Premium 1 Year',
    nameAr: 'اشتراك نتفلكس بريميوم سنة',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&q=80',
    category: 'Subscriptions',
    categoryAr: 'اشتراكات',
    isNew: true,
    description: 'Enjoy unlimited streaming with Netflix Premium. Watch on 4 screens simultaneously in Ultra HD quality.',
    descriptionAr: 'استمتع ببث غير محدود مع نتفلكس بريميوم. شاهد على 4 شاشات في وقت واحد بجودة Ultra HD.',
  },
  {
    id: 2,
    name: 'Spotify Premium 6 Months',
    nameAr: 'اشتراك سبوتيفاي 6 أشهر',
    price: 99,
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=500&q=80',
    category: 'Subscriptions',
    categoryAr: 'اشتراكات',
    isBestSeller: true,
    description: 'Listen to millions of songs ad-free. Download music for offline listening and enjoy high-quality audio.',
    descriptionAr: 'استمع لملايين الأغاني بدون إعلانات. حمّل الموسيقى للاستماع بدون إنترنت واستمتع بجودة صوت عالية.',
  },
  {
    id: 3,
    name: 'YouTube Premium 1 Year',
    nameAr: 'اشتراك يوتيوب بريميوم سنة',
    price: 149,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=500&q=80',
    category: 'Subscriptions',
    categoryAr: 'اشتراكات',
    description: 'Watch YouTube without ads. Play videos in the background and download for offline viewing.',
    descriptionAr: 'شاهد يوتيوب بدون إعلانات. شغّل الفيديوهات في الخلفية وحمّلها للمشاهدة بدون إنترنت.',
  },
  
  // تصاميم - Designs
  {
    id: 4,
    name: 'Professional Logo Design',
    nameAr: 'تصميم لوجو احترافي',
    price: 199,
    originalPrice: 299,
    image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=500&q=80',
    category: 'Designs',
    categoryAr: 'تصاميم',
    isNew: true,
    isBestSeller: true,
    description: 'Get a unique and professional logo for your brand. Includes 3 concepts and unlimited revisions.',
    descriptionAr: 'احصل على لوجو فريد واحترافي لعلامتك التجارية. يشمل 3 مفاهيم وتعديلات غير محدودة.',
  },
  {
    id: 5,
    name: 'Social Media Kit',
    nameAr: 'باقة تصاميم سوشيال ميديا',
    price: 149,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&q=80',
    category: 'Designs',
    categoryAr: 'تصاميم',
    description: 'Complete social media design kit. Includes templates for Instagram, Twitter, and Facebook.',
    descriptionAr: 'باقة تصاميم سوشيال ميديا كاملة. تشمل قوالب لانستغرام وتويتر وفيسبوك.',
  },
  {
    id: 6,
    name: 'YouTube Thumbnail Pack',
    nameAr: 'باقة صور مصغرة يوتيوب',
    price: 79,
    originalPrice: 99,
    image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=500&q=80',
    category: 'Designs',
    categoryAr: 'تصاميم',
    isNew: true,
    description: '10 professional YouTube thumbnail designs that increase click-through rates.',
    descriptionAr: '10 تصاميم صور مصغرة احترافية ليوتيوب تزيد من معدل النقر.',
  },

  // تفاعل - Engagement
  {
    id: 7,
    name: 'Instagram Followers 1K',
    nameAr: '1000 متابع انستغرام',
    price: 49,
    image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=500&q=80',
    category: 'Engagement',
    categoryAr: 'تفاعل',
    isBestSeller: true,
    description: 'Boost your Instagram presence with 1000 real followers. Gradual delivery for natural growth.',
    descriptionAr: 'عزز حضورك على انستغرام مع 1000 متابع حقيقي. تسليم تدريجي لنمو طبيعي.',
  },
  {
    id: 8,
    name: 'TikTok Likes 5K',
    nameAr: '5000 لايك تيك توك',
    price: 39,
    originalPrice: 59,
    image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=500&q=80',
    category: 'Engagement',
    categoryAr: 'تفاعل',
    description: 'Get 5000 likes on your TikTok videos. Fast delivery and high-quality engagement.',
    descriptionAr: 'احصل على 5000 لايك على فيديوهات تيك توك. تسليم سريع وتفاعل عالي الجودة.',
  },
  {
    id: 9,
    name: 'YouTube Views 10K',
    nameAr: '10000 مشاهدة يوتيوب',
    price: 89,
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=500&q=80',
    category: 'Engagement',
    categoryAr: 'تفاعل',
    isNew: true,
    description: 'Increase your YouTube video views with 10000 high-retention views.',
    descriptionAr: 'زد مشاهدات فيديوهات يوتيوب مع 10000 مشاهدة عالية الاحتفاظ.',
  },

  // ديسكورد - Discord
  {
    id: 10,
    name: 'Discord Nitro 1 Year',
    nameAr: 'ديسكورد نيترو سنة',
    price: 199,
    originalPrice: 249,
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=500&q=80',
    category: 'Discord',
    categoryAr: 'ديسكورد',
    isBestSeller: true,
    description: 'Discord Nitro with 2 server boosts, HD streaming, custom emojis, and larger file uploads.',
    descriptionAr: 'ديسكورد نيترو مع 2 تعزيز للسيرفر وبث HD وإيموجي مخصصة ورفع ملفات أكبر.',
  },
  {
    id: 11,
    name: 'Discord Server Setup',
    nameAr: 'إعداد سيرفر ديسكورد',
    price: 149,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&q=80',
    category: 'Discord',
    categoryAr: 'ديسكورد',
    isNew: true,
    description: 'Professional Discord server setup with custom roles, channels, bots, and security configurations.',
    descriptionAr: 'إعداد سيرفر ديسكورد احترافي مع رتب مخصصة وقنوات وبوتات وإعدادات أمان.',
  },
  {
    id: 12,
    name: 'Discord Bot Premium',
    nameAr: 'بوت ديسكورد مميز',
    price: 99,
    originalPrice: 129,
    image: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=500&q=80',
    category: 'Discord',
    categoryAr: 'ديسكورد',
    description: 'Custom Discord bot with moderation, music, games, and advanced features.',
    descriptionAr: 'بوت ديسكورد مخصص مع إدارة وموسيقى وألعاب وميزات متقدمة.',
  },
];

export const categories = ['All', 'Subscriptions', 'Designs', 'Engagement', 'Discord'];
export const categoriesAr = ['الكل', 'اشتراكات', 'تصاميم', 'تفاعل', 'ديسكورد'];
