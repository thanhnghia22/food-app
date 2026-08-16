export const CATEGORIES = [
  { id: 'all', name: 'Tất cả', icon: '🍽️' },
  { id: 'mon-chinh', name: 'Món chính', icon: '🍜' },
  { id: 'fast-food', name: 'Thức ăn nhanh', icon: '🍔' },
  { id: 'an-vat', name: 'Ăn vặt', icon: '🍢' },
  { id: 'do-uong', name: 'Đồ uống & Trà', icon: '🧋' },
  { id: 'trang-mieng', name: 'Tráng miệng', icon: '🍰' },
  { id: 'healthy', name: 'Healthy & Chay', icon: '🥗' }
];

export const FOOD_ITEMS = [
  {
    id: 1,
    name: 'Phở Bò Tái Nạm Đặc Biệt',
    category: 'mon-chinh',
    price: 65000,
    oldPrice: 75000,
    rating: 4.9,
    reviewsCount: 320,
    prepTime: '15-20 phút',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=700&auto=format&fit=crop&q=80',
    description: 'Bát phở bò truyền thống với nước dùng xương hầm 12 tiếng thơm lừng quế hồi, thịt bò tái mềm ngọt kết hợp nạm bò béo ngậy.',
    isPopular: true,
    isNew: false,
    tags: ['Best Seller', 'Truyền thống'],
    sizes: [
      { name: 'Tô vừa', priceModifier: 0 },
      { name: 'Tô lớn', priceModifier: 15000 },
      { name: 'Tô đặc biệt', priceModifier: 25000 }
    ],
    toppings: [
      { id: 't1', name: 'Thêm trứng chần', price: 10000 },
      { id: 't2', name: 'Thêm quẩy giòn (3 cái)', price: 8000 },
      { id: 't3', name: 'Thêm bò viên', price: 15000 },
      { id: 't4', name: 'Thêm thịt tái', price: 20000 }
    ]
  },
  {
    id: 2,
    name: 'Burger Bò Nướng Phô Mai Tan Chảy',
    category: 'fast-food',
    price: 79000,
    oldPrice: 95000,
    rating: 4.8,
    reviewsCount: 245,
    prepTime: '20-25 phút',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80',
    description: 'Thịt bò Úc xay nướng than hoa thơm phức, kẹp lớp phô mai Cheddar kép béo ngậy, rau xà lách giòn và sốt bí truyền.',
    isPopular: true,
    isNew: true,
    tags: ['Best Seller', 'Ưu đãi'],
    sizes: [
      { name: 'Size Single (1 miếng bò)', priceModifier: 0 },
      { name: 'Size Double (2 miếng bò)', priceModifier: 35000 }
    ],
    toppings: [
      { id: 't5', name: 'Thêm lát Phô mai Cheddar', price: 12000 },
      { id: 't6', name: 'Thịt xông khói giòn (Bacon)', price: 18000 },
      { id: 't7', name: 'Khoai tây chiên đi kèm', price: 25000 }
    ]
  },
  {
    id: 3,
    name: 'Cơm Tấm Sườn Bì Chả Trứng',
    category: 'mon-chinh',
    price: 55000,
    oldPrice: null,
    rating: 4.9,
    reviewsCount: 412,
    prepTime: '15-20 phút',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=700&auto=format&fit=crop&q=80',
    description: 'Đặc sản Sài Gòn với miếng sườn cốt lết ướp mật ong nướng thơm lừng, bì dai giòn, chả trứng bùi béo và mỡ hành tóp mỡ.',
    isPopular: true,
    isNew: false,
    tags: ['Best Seller'],
    sizes: [
      { name: 'Phần tiêu chuẩn', priceModifier: 0 },
      { name: 'Phần sườn khủng', priceModifier: 20000 }
    ],
    toppings: [
      { id: 't8', name: 'Trứng ốp la lòng đào', price: 8000 },
      { id: 't9', name: 'Chả trứng thêm', price: 12000 },
      { id: 't10', name: 'Tóp mỡ giòn cay', price: 10000 }
    ]
  },
  {
    id: 4,
    name: 'Pizza Hải Sản Sốt Pesto Ý',
    category: 'fast-food',
    price: 165000,
    oldPrice: 195000,
    rating: 4.7,
    reviewsCount: 180,
    prepTime: '25-30 phút',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&auto=format&fit=crop&q=80',
    description: 'Đế bánh nhào thủ công giòn xốp bên ngoài mềm bên trong, phủ đầy tôm tươi, mực giòn, ớt chuông và phô mai Mozzarella kéo sợi.',
    isPopular: true,
    isNew: false,
    tags: ['Món Ý', 'Hot'],
    sizes: [
      { name: 'Size M (22cm - 6 miếng)', priceModifier: 0 },
      { name: 'Size L (29cm - 8 miếng)', priceModifier: 55000 }
    ],
    toppings: [
      { id: 't11', name: 'Gấp đôi Phô mai Mozzarella', price: 30000 },
      { id: 't12', name: 'Viền xúc xích phô mai', price: 35000 }
    ]
  },
  {
    id: 5,
    name: 'Trà Sữa Trân Châu Đường Đen Hoàng Gia',
    category: 'do-uong',
    price: 45000,
    oldPrice: 50000,
    rating: 4.9,
    reviewsCount: 520,
    prepTime: '10-15 phút',
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=700&auto=format&fit=crop&q=80',
    description: 'Trà đen Ceylon đậm vị kết hợp sữa tươi thanh trùng béo nhẹ cùng trân châu đen dẻo quánh ngấm đường đen mật mía.',
    isPopular: true,
    isNew: false,
    tags: ['Best Seller', 'Yêu thích'],
    sizes: [
      { name: 'Size M (500ml)', priceModifier: 0 },
      { name: 'Size L (700ml)', priceModifier: 10000 }
    ],
    toppings: [
      { id: 't13', name: 'Trân châu hoàng kim', price: 8000 },
      { id: 't14', name: 'Kem cheese béo mặn', price: 12000 },
      { id: 't15', name: 'Pudding trứng', price: 10000 }
    ]
  },
  {
    id: 6,
    name: 'Bún Chả Hà Nội Nướng Than Hoa',
    category: 'mon-chinh',
    price: 55000,
    oldPrice: null,
    rating: 4.8,
    reviewsCount: 290,
    prepTime: '15-20 phút',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=700&auto=format&fit=crop&q=80',
    description: 'Chả miếng và chả viên nướng xém cạnh thơm phức, bát nước chấm đu đủ cà rốt chua ngọt chuẩn vị phố cổ Hà Nội.',
    isPopular: false,
    isNew: false,
    tags: ['Đặc sản'],
    sizes: [
      { name: 'Phần tiêu chuẩn', priceModifier: 0 },
      { name: 'Phần đặc biệt nhiều chả', priceModifier: 18000 }
    ],
    toppings: [
      { id: 't16', name: 'Nem rán giòn rụm (2 cái)', price: 20000 },
      { id: 't17', name: 'Thêm bún tươi', price: 5000 }
    ]
  },
  {
    id: 7,
    name: 'Gà Rán Giòn Sốt Cay Hàn Quốc',
    category: 'fast-food',
    price: 85000,
    oldPrice: 99000,
    rating: 4.9,
    reviewsCount: 388,
    prepTime: '20-25 phút',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=700&auto=format&fit=crop&q=80',
    description: 'Miếng gà tươi tẩm bột chiên vàng giòn rụm, đảo đều cùng sốt Yangnyeom cay ngọt đậm đà, rắc mè rang thơm bùi.',
    isPopular: true,
    isNew: true,
    tags: ['Hot Trend', 'Cay 🌶️'],
    sizes: [
      { name: 'Phần 3 miếng', priceModifier: 0 },
      { name: 'Phần 5 miếng', priceModifier: 45000 }
    ],
    toppings: [
      { id: 't18', name: 'Sốt Phô mai chấm kèm', price: 15000 },
      { id: 't19', name: 'Khoai tây lắc phô mai', price: 25000 }
    ]
  },
  {
    id: 8,
    name: 'Salad Ức Gà Nướng Bơ Sốt Mè Rang',
    category: 'healthy',
    price: 65000,
    oldPrice: null,
    rating: 4.7,
    reviewsCount: 154,
    prepTime: '15-20 phút',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&auto=format&fit=crop&q=80',
    description: 'Ức gà nướng thảo mộc mềm ngọt, bơ sáp béo ngậy, cà chua bi, xà lách Romain giòn ngọt kèm sốt mè rang Nhật Bản ít calo.',
    isPopular: false,
    isNew: true,
    tags: ['Eat Clean', 'Healthy'],
    sizes: [
      { name: 'Hộp thường (350 kcal)', priceModifier: 0 },
      { name: 'Hộp lớn Double Protein (500 kcal)', priceModifier: 25000 }
    ],
    toppings: [
      { id: 't20', name: 'Trứng luộc lòng đào', price: 8000 },
      { id: 't21', name: 'Hạt hạnh nhân nướng', price: 15000 }
    ]
  },
  {
    id: 9,
    name: 'Bánh Mì Kẹp Thịt Nướng Giòn Rụm',
    category: 'an-vat',
    price: 32000,
    oldPrice: 38000,
    rating: 4.9,
    reviewsCount: 460,
    prepTime: '10-12 phút',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=700&auto=format&fit=crop&q=80',
    description: 'Vỏ bánh mì nóng giòn đặc ruột, nhân thịt nướng sả thơm phức, pate gan béo bùi, bơ tươi và dưa góp thanh mát.',
    isPopular: true,
    isNew: false,
    tags: ['Bình dân', 'Nhanh gọn'],
    sizes: [
      { name: 'Tiêu chuẩn', priceModifier: 0 },
      { name: 'Đầy đủ gấp đôi thịt', priceModifier: 15000 }
    ],
    toppings: [
      { id: 't22', name: 'Thêm Chả lụa / Xúc xích', price: 8000 },
      { id: 't23', name: 'Thêm Phô mai con bò cười', price: 7000 }
    ]
  },
  {
    id: 10,
    name: 'Cà Phê Muối Kem Béo Huế',
    category: 'do-uong',
    price: 35000,
    oldPrice: null,
    rating: 4.9,
    reviewsCount: 310,
    prepTime: '5-10 phút',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&auto=format&fit=crop&q=80',
    description: 'Cà phê Robusta pha phin truyền thống đậm đà, phủ lớp kem muối mặn mặn béo ngậy tạo nên hương vị bùng nổ.',
    isPopular: true,
    isNew: false,
    tags: ['Best Seller', 'Signature'],
    sizes: [
      { name: 'Ly vừa', priceModifier: 0 },
      { name: 'Ly lớn', priceModifier: 8000 }
    ],
    toppings: [
      { id: 't24', name: 'Thêm lớp kem muối', price: 10000 }
    ]
  },
  {
    id: 11,
    name: 'Bánh Mousse Xoài Chanh Leo Pháp',
    category: 'trang-mieng',
    price: 48000,
    oldPrice: 55000,
    rating: 4.8,
    reviewsCount: 120,
    prepTime: '5-10 phút',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=700&auto=format&fit=crop&q=80',
    description: 'Lớp mousse xoài tươi mềm mịn tan ngay trong miệng, hòa quyện vị chua thanh thơm mát của thạch chanh leo tự nhiên.',
    isPopular: false,
    isNew: true,
    tags: ['Tráng miệng', 'Ngọt ngào'],
    sizes: [
      { name: '1 Phần (1 bánh)', priceModifier: 0 }
    ],
    toppings: []
  },
  {
    id: 12,
    name: 'Khoai Tây Lắc Phô Mai Rong Biển',
    category: 'an-vat',
    price: 35000,
    oldPrice: null,
    rating: 4.6,
    reviewsCount: 195,
    prepTime: '10-15 phút',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=700&auto=format&fit=crop&q=80',
    description: 'Khoai tây cắt que chiên giòn tan, lắc đều bột phô mai thơm lừng và vụn rong biển sấy giòn rụm.',
    isPopular: false,
    isNew: false,
    tags: ['Ăn vặt'],
    sizes: [
      { name: 'Túi vừa', priceModifier: 0 },
      { name: 'Túi lớn', priceModifier: 15000 }
    ],
    toppings: [
      { id: 't25', name: 'Sốt tương cà & mayonaise thêm', price: 5000 }
    ]
  }
];
