import { create } from "zustand";

export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  orders: number;
  seller: string;
  image: string;
  category: {
    id: number;
    description: string;
  };
  brand: string;
  colors: string[];
  dateAbrev: string;
  
  date: string;
  place: string;
}

interface ProductStore {
  // State
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: string;
  searchQuery: string;
  priceRange: [number, number];
  selectedBrands: string[];
  selectedColors: string[];

  // Actions
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setPriceRange: (range: [number, number]) => void;
  toggleBrand: (brand: string) => void;
  applyFilters: () => void;
}

// Sample products data with comprehensive filtering properties
const sampleEvents: Product[] = [
  {
    id: 1,
    title: "The Weeknd: After Hours Til Dawn",
    price: 450.0,
    originalPrice: 600.0,
    discount: 25,
    rating: 4.9,
    orders: 1240,
    seller: "Live Nation",
    image: "https://res.cloudinary.com/london-stadium/image/upload/assets/main_image/1669933935_the-weeknd-london-stadium-socials-twitter.jpg",
    category: { id: 1, description: 'Concierto' },
    brand: "Pop/R&B",
    colors: ["black", "red"],
    dateAbrev: '15 FEB',
    date: '15 de Febrero',
    place: 'Estadio Nacional',
  },
  {
    id: 2,
    title: "Mistura 2026: Festival Gastronómico",
    price: 35.0,
    originalPrice: 50.0,
    discount: 30,
    rating: 4.7,
    orders: 8500,
    seller: "Apega",
    image: "https://peruretail.sfo3.cdn.digitaloceanspaces.com/wp-content/uploads/mistura-peru-scaled.jpg",
    category: { id: 2, description: 'Gastronomía' },
    brand: "Culinaria",
    colors: ["orange", "green"],
    dateAbrev: '20 MAR',
    date: '20 de Marzo',
    place: 'Costa Verde',
  },
  {
    id: 3,
    title: "Comic-Con Latin America",
    price: 120.0,
    originalPrice: 150.0,
    discount: 20,
    rating: 4.8,
    orders: 3200,
    seller: "Fans Events",
    image: "https://images.squarespace-cdn.com/content/v1/59b9c2b7d2b8570174037c16/1728501156330-4DU1JKBHX5ILJNS49W27/LCX_Web+Page_03c_NoSaveDate.jpg",
    category: { id: 3, description: 'Convención' },
    brand: "Cultura Pop",
    colors: ["yellow", "blue"],
    dateAbrev: '05 MAY',
    date: '05 de Mayo',
    place: 'Jockey Exhibición',
  },
  {
    id: 4,
    title: "Final Copa Libertadores 2026",
    price: 800.0,
    originalPrice: 1200.0,
    discount: 33,
    rating: 5.0,
    orders: 15000,
    seller: "CONMEBOL",
    image: "https://e01-phantom-marca-mx.uecdn.es/55fefbd03e496f97d53acb3cbef26bdf/resize/828/f/jpg/mx/assets/multimedia/imagenes/2025/10/31/17618778363808.jpg",
    category: { id: 4, description: 'Deportes' },
    brand: "Fútbol",
    colors: ["gold", "black"],
    dateAbrev: '12 JUN',
    date: '12 de Junio',
    place: 'Estadio Monumental',
  },
  {
    id: 5,
    title: "Tech Summit: Inteligencia Artificial",
    price: 250.0,
    rating: 4.6,
    orders: 950,
    seller: "IEEE Tech",
    image: "https://media.es.wired.com/photos/65c2b064fd8dee1ab475d0cc/16:9/w_6176,h_3474,c_limit/AI%20Tech%20Summit%20Skopje%202023-89.jpg",
    category: { id: 5, description: 'Conferencia' },
    brand: "Tecnología",
    colors: ["cyan", "navy"],
    dateAbrev: '22 JUL',
    date: '22 de Julio',
    place: 'Centro de Convenciones Lima',
  },
  {
    id: 6,
    title: "Coldplay: Music of the Spheres",
    price: 400.0,
    originalPrice: 550.0,
    discount: 27,
    rating: 5.0,
    orders: 4500,
    seller: "Artes Perú",
    image: "https://www.gillettestadium.com/wp-content/uploads/2024/10/Coldplay2025_1200x800.png",
    category: { id: 1, description: 'Concierto' },
    brand: "Alternative Rock",
    colors: ["cyan", "magenta"],
    dateAbrev: '10 SEP',
    date: '10 de Septiembre',
    place: 'Estadio Nacional',
  },
  {
    id: 7,
    title: "Cirque du Soleil: Bazzar",
    price: 320.0,
    originalPrice: 450.0,
    discount: 28,
    rating: 4.9,
    orders: 2800,
    seller: "Cirque Official",
    image: "https://www.cirquedusoleil.com/-/media/cds/images/shows/bazzar/spain_2024/cirque-du-soleil-bazzar-share-1200x630.jpg?db=web&vs=1&hash=6F6C6CDD584443DE72B1AC7F3FF98E87",
    category: { id: 6, description: 'Teatro' },
    brand: "Artes Escénicas",
    colors: ["purple", "gold"],
    dateAbrev: '15 OCT',
    date: '15 de Octubre',
    place: 'Gran Carpa Jockey',
  },
  {
    id: 8,
    title: "Maratón Adidas 42K",
    price: 90.0,
    rating: 4.5,
    orders: 5000,
    seller: "Adidas Running",
    image: "https://i.ytimg.com/vi/KI8c8t8pb88/maxresdefault.jpg",
    category: { id: 4, description: 'Deportes' },
    brand: "Atletismo",
    colors: ["blue", "white"],
    dateAbrev: '02 NOV',
    date: '02 de Noviembre',
    place: 'Miraflores',
  },
  {
    id: 9,
    title: "Ultra Music Festival Lima",
    price: 600.0,
    originalPrice: 800.0,
    discount: 25,
    rating: 4.7,
    orders: 3200,
    seller: "Vastion",
    image: "https://ultraperu.com/wp-content/uploads/2025/12/ULTRA_PERU_26TH_WEBBANNER_en.png",
    category: { id: 1, description: 'Concierto' },
    brand: "EDM",
    colors: ["silver", "black"],
    dateAbrev: '15 NOV',
    date: '15 de Noviembre',
    place: 'Estadio San Marcos',
  },
  {
    id: 10,
    title: "Feria del Libro de Lima (FIL)",
    price: 7.0,
    originalPrice: 10.0,
    discount: 30,
    rating: 4.4,
    orders: 12000,
    seller: "Cámara del Libro",
    image: "https://i0.wp.com/limagris.com/wp-content/uploads/2025/07/fil-1.png?fit=1200%2C675&ssl=1",
    category: { id: 7, description: 'Cultura' },
    brand: "Literatura",
    colors: ["red", "white"],
    dateAbrev: '20 JUL',
    date: '20 de Julio',
    place: 'Parque de los Próceres',
  },
  {
    id: 11,
    title: "Salsa All Stars: Gran Combo",
    price: 180.0,
    originalPrice: 250.0,
    discount: 28,
    rating: 4.6,
    orders: 1500,
    seller: "Tropimusic",
    image: "https://instagram.flim39-1.fna.fbcdn.net/v/t51.82787-15/572173161_18540829621006403_5536312681913854029_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ig_cache_key=Mzc1MjY4OTMyNzM2NjExMTY1NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTA4MC5zZHIuQzMifQ%3D%3D&_nc_ohc=tYAFKm9A2JQQ7kNvwHNbSxG&_nc_oc=Admi7k73Su8pVALLuQMCtwR0Fl_1jm2XJPqHrxTVpazbvWDoH5QxUGBpxcXUZPWol_Y8Y2meUuxKc7atmFjuvZhW&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.flim39-1.fna&_nc_gid=Nqbbor3FGOJ53imyTmz28w&oh=00_Afva1rUHnqxrRKMVUaET-xHG9G3C37M5y48Jjl2e4g9XrA&oe=69858898",
    category: { id: 1, description: 'Concierto' },
    brand: "Salsa",
    colors: ["red", "gold"],
    dateAbrev: '15 DEC',
    date: '15 de Diciembre',
    place: 'Estadio Nacional',
  },
  {
    id: 12,
    title: "TEDx Lima: El Futuro es Hoy",
    price: 150.0,
    rating: 4.8,
    orders: 450,
    seller: "TEDx Org",
    image: "https://cdn.joinnus.com/user/1322235/7oKcalBrOsMCgcb.webp",
    category: { id: 5, description: 'Conferencia' },
    brand: "Educación",
    colors: ["red", "black"],
    dateAbrev: '05 MAR',
    date: '05 de Marzo',
    place: 'Teatro Municipal',
  },
  {
    id: 13,
    title: "Festival de Cine de Lima",
    price: 20.0,
    originalPrice: 30.0,
    discount: 33,
    rating: 4.7,
    orders: 2200,
    seller: "CCPUCP",
    image: "https://festivaldelima.com/2025/wp-content/uploads/2025/07/Banner29FCLwEB.png",
    category: { id: 7, description: 'Cultura' },
    brand: "Cine",
    colors: ["black", "purple"],
    dateAbrev: '12 AGO',
    date: '12 de Agosto',
    place: 'Cines Variados',
  },
  {
    id: 14,
    title: "Iron Maiden: Future Past",
    price: 350.0,
    rating: 4.9,
    orders: 1800,
    seller: "Move Concerts",
    image: "https://www.ironmaiden.com/files/2024/08/tfp_imcom_poster.jpg",
    category: { id: 1, description: 'Concierto' },
    brand: "Heavy Metal",
    colors: ["black", "blue"],
    dateAbrev: '02 NOV',
    date: '02 de Noviembre',
    place: 'Estadio San Marcos',
  },
  {
    id: 15,
    title: "Lima Fashion Week (LIF Week)",
    price: 200.0,
    originalPrice: 300.0,
    discount: 33,
    rating: 4.3,
    orders: 600,
    seller: "LIF Producciones",
    image: "https://media.fashionnetwork.com/cdn-cgi/image/fit=contain,width=1000,height=1000,format=auto/m/d3d8/0188/a10f/dbc8/2651/1e71/a0a4/6c8a/d821/6913/6913.jpg",
    category: { id: 8, description: 'Moda' },
    brand: "Estilo",
    colors: ["pink", "black"],
    dateAbrev: '25 ABR',
    date: '25 de Abril',
    place: 'Boutique Hotel',
  },
  {
    id: 16,
    title: "El Cascanueces: Ballet Nacional",
    price: 80.0,
    rating: 4.9,
    orders: 1100,
    seller: "Gran Teatro Nacional",
    image: "https://cdn.joinnus.com/user/4598187/zVUyNxfMs9aEuZs.webp",
    category: { id: 6, description: 'Teatro' },
    brand: "Ballet",
    colors: ["white", "gold"],
    dateAbrev: '20 DEC',
    date: '20 de Diciembre',
    place: 'Gran Teatro Nacional',
  }
];

export const useProductStore = create<ProductStore>((set, get) => ({
  // Initial state
  products: sampleEvents,
  filteredProducts: sampleEvents,
  selectedCategory: "all",
  searchQuery: "",
  priceRange: [0, 3000],
  selectedBrands: [],
  selectedColors: [],

  // Actions
  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    get().applyFilters();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  setPriceRange: (range) => {
    set({ priceRange: range });
    get().applyFilters();
  },

  toggleBrand: (brand) => {
    const { selectedBrands } = get();
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    set({ selectedBrands: newBrands });
    get().applyFilters();
  },

  applyFilters: () => {
    const {
      products,
      selectedCategory,
      searchQuery,
      priceRange,
      selectedBrands
    } = get();

    let filtered = products;

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category.id.toString() === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.seller.toLowerCase().includes(query)
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand));
    }

    set({ filteredProducts: filtered });
  }
}));