export const BASE_URL = "";
export const USERS_URL = "/api/users";
export const PRODUCTS_URL = "/api/products";
export const DEFAULT_IMAGE = "/images/placeholder.jpg";
export const UPLOADS_URL = "/api/upload";
export const ORDERS_URL = "/api/orders";
export const PAYPAL_URL = "/api/config/paypal";

export const CATEGORY_TYPES = [
  "birds",
  "aquatics",
  "tanks",
  "food",
  "pets",
  "accessories",
  "treats",
  "toys",
  "care",
  "holidays",
];

export const CATEGORY_METADATA = {
  birds: {
    label: "Pet Birds & Parrots",
    icon: "🦜",
    desc: "Cockatiels, budgies, finches & companion birds",
    image: "/uploads/bird_cockatiel.jpg",
  },
  aquatics: {
    label: "Fish & Aquatics",
    icon: "🐠",
    desc: "Exotic Betta, neon tetras, goldfish & aquatic life",
    image: "/uploads/tropical_betta_fish.jpg",
  },
  tanks: {
    label: "Fish Tanks & Cages",
    icon: "🫧",
    desc: "Rimless glass aquariums, LED tanks & spacious cages",
    image: "/uploads/aquarium_fish_tank.jpg",
  },
  food: {
    label: "Pet Food & Nutrition",
    icon: "🍖",
    desc: "Vet-crafted food for birds, fish, dogs & cats",
    image: "/uploads/bird_food_mix.jpg",
  },
  pets: {
    label: "Adoptable Pets",
    icon: "🐾",
    desc: "Puppies, kittens, rabbits & healthy companions",
    image: "/images/adoptable_golden_puppy.jpg",
  },
  accessories: {
    label: "Gear & Accessories",
    icon: "🦮",
    desc: "Aquarium filters, bird perches, harnesses & beds",
    image: "/uploads/image-1715602050347.webp",
  },
  treats: {
    label: "Treats & Chews",
    icon: "🥓",
    desc: "Natural jerky, seed bars, mineral treats & chews",
    image: "/images/category2.png",
  },
  toys: {
    label: "Toys & Play",
    icon: "🎾",
    desc: "Bird swings, chew toys & interactive brain puzzles",
    image: "/images/category1.png",
  },
  care: {
    label: "Wellness & Care",
    icon: "🛁",
    desc: "Aquarium conditioners, organic shampoos & hygiene",
    image: "/uploads/image-1715602383826.jpg",
  },
  holidays: {
    label: "Seasonal Specials",
    icon: "🎁",
    desc: "Limited-edition holiday boxes, festive sets & gifts",
    image: "/images/category3.png",
  },
};

export const SORT_TYPES = [
  { label: "Featured / Newest", value: "createdAt:desc" },
  { label: "Price: Low to High", value: "price:asc" },
  { label: "Price: High to Low", value: "price:desc" },
  { label: "Oldest", value: "createdAt:asc" },
];

export const PAGINATION_LIMIT = 12;
