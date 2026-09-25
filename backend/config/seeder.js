import User from "../models/userModel.js";
import Product from "../models/productModel.js";

export const seedInitialData = async () => {
  try {
    let adminUser = await User.findOne({ email: "admin@123.com" });
    if (!adminUser) {
      adminUser = await User.create({
        name: "Admin User",
        email: "admin@123.com",
        password: "123456",
        isAdmin: true,
      });
      console.log("Seeded Admin user (admin@123.com / 123456)");
    }

    const testUser = await User.findOne({ email: "test@123.com" });
    if (!testUser) {
      await User.create({
        name: "Test User",
        email: "test@123.com",
        password: "123456",
        isAdmin: false,
      });
      console.log("Seeded Regular user (test@123.com / 123456)");
    }

    // Comprehensive A to Z Products Catalog
    const allProducts = [
      // ==========================================
      // 1. PET BIRDS & BIRD SUPPLIES (A to Z)
      // ==========================================
      {
        user: adminUser._id,
        name: "Hand-Tamed Yellow Crested Cockatiel (Sunny)",
        image: "/uploads/bird_cockatiel.jpg",
        brand: "Feathered Friends Aviary",
        category: "birds",
        description:
          "Sunny is a gentle, 4-month-old hand-raised yellow crested cockatiel. Highly vocal, whistle-trained, loves sitting on shoulders and interacting with families. Full avian vet health check certified.",
        price: 3500,
        countInStock: 2,
        isPublished: true,
        isPopular: true,
        isOnSale: false,
        rating: 5.0,
        numReviews: 28,
      },
      {
        user: adminUser._id,
        name: "Bonded Pair of Rainbow Budgerigars (Sky & Kiwi)",
        image: "/uploads/bird_cockatiel.jpg",
        brand: "Feathered Friends Aviary",
        category: "birds",
        description:
          "Playful, chirpy pair of bonded budgies with vibrant turquoise and emerald plumage. Ideal for apartment living, active and joyful. Includes initial adoption starter kit.",
        price: 1800,
        countInStock: 3,
        isPublished: true,
        isPopular: true,
        isOnSale: true,
        salePrice: 1499,
        rating: 4.9,
        numReviews: 19,
      },
      {
        user: adminUser._id,
        name: "AvianBlend Gourmet Seed, Nut & Dried Fruit Bird Feed (1.5kg)",
        image: "/uploads/bird_food_mix.jpg",
        brand: "AvianBlend Organics",
        category: "food",
        description:
          "Triple-cleaned natural seed blend enriched with sunflower kernels, safflower, dried papaya, pumpkin seeds, almond slivers, and essential avian vitamins. Perfect for cockatiels, conures, and parakeets.",
        price: 599,
        countInStock: 50,
        isPublished: true,
        isPopular: true,
        isOnSale: true,
        salePrice: 499,
        rating: 4.9,
        numReviews: 34,
      },
      {
        user: adminUser._id,
        name: "Villa Deluxe Wrought-Iron Spacious Bird Cage with Perches",
        image: "/uploads/bird_cage_luxury.jpg",
        brand: "AvianHaven",
        category: "tanks",
        description:
          "Rust-resistant stainless wrought-iron bird sanctuary cage with 3 natural wood perches, feeder bowls, rolling caster wheels, slide-out debris tray, and large front lockable door.",
        price: 3899,
        countInStock: 12,
        isPublished: true,
        isPopular: true,
        isOnSale: true,
        salePrice: 3299,
        rating: 4.8,
        numReviews: 15,
      },
      {
        user: adminUser._id,
        name: "Natural Wood Hanging Bird Ladder & Chewing Swing Toy",
        image: "/uploads/bird_cage_luxury.jpg",
        brand: "PurrfectPlay",
        category: "toys",
        description:
          "Stimulating natural timber chew ladder with non-toxic cotton ropes and stainless steel bells. Helps trim beaks and claws while providing energetic exercise for pet birds.",
        price: 249,
        countInStock: 40,
        isPublished: true,
        isPopular: false,
        isOnSale: false,
        rating: 4.7,
        numReviews: 14,
      },

      // ==========================================
      // 2. FISH, AQUARIUMS & AQUATIC ACCESSORIES
      // ==========================================
      {
        user: adminUser._id,
        name: "Royal Blue & Scarlet Halfmoon Betta Fish (Neptune)",
        image: "/uploads/tropical_betta_fish.jpg",
        brand: "AquaWorld Exotics",
        category: "aquatics",
        description:
          "Show-grade male Halfmoon Betta with stunning royal blue body and flowing 180-degree scarlet finnage. Raised in conditioned, pathogen-free water. Hardy, intelligent, and responsive to feeding.",
        price: 499,
        countInStock: 8,
        isPublished: true,
        isPopular: true,
        isOnSale: true,
        salePrice: 399,
        rating: 5.0,
        numReviews: 45,
      },
      {
        user: adminUser._id,
        name: "Dazzling Neon Tetra School (Pack of 6 Healthy Fish)",
        image: "/uploads/aquarium_fish_tank.jpg",
        brand: "AquaWorld Exotics",
        category: "aquatics",
        description:
          "Group of 6 peaceful, iridescent neon tetras featuring vivid electric-blue top stripe and bright red tail. Ideal for planted community tanks and serene desktop viewing.",
        price: 450,
        countInStock: 15,
        isPublished: true,
        isPopular: true,
        isOnSale: true,
        salePrice: 360,
        rating: 4.8,
        numReviews: 22,
      },
      {
        user: adminUser._id,
        name: "AquaScape Rimless Ultra-Clear Glass Aquarium Tank (45L / 12 Gal)",
        image: "/uploads/aquarium_fish_tank.jpg",
        brand: "AquaScape Studio",
        category: "tanks",
        description:
          "Ultra-clear low-iron bent glass rimless fish aquarium with 91% light transmission. Features full-spectrum plant-growth LED bar, leveling base mat, and glass cover clips.",
        price: 4499,
        countInStock: 10,
        isPublished: true,
        isPopular: true,
        isOnSale: true,
        salePrice: 3899,
        rating: 4.9,
        numReviews: 38,
      },
      {
        user: adminUser._id,
        name: "Desktop Nano LED Betta Cube Tank (15L / 4 Gal)",
        image: "/uploads/aquarium_fish_tank.jpg",
        brand: "AquaScape Studio",
        category: "tanks",
        description:
          "All-in-one desktop cube aquarium with touch-sensitive multi-color LED mood lighting and concealed silent 3-stage filtration pump. Ideal for home offices and bedrooms.",
        price: 2299,
        countInStock: 14,
        isPublished: true,
        isPopular: false,
        isOnSale: true,
        salePrice: 1999,
        rating: 4.8,
        numReviews: 17,
      },
      {
        user: adminUser._id,
        name: "AquaSupreme Spirulina High-Protein Tropical Fish Flakes & Micro Pellets",
        image: "/uploads/fish_food_pellets.jpg",
        brand: "AquaSupreme",
        category: "food",
        description:
          "Nutritionally complete daily diet enriched with pure spirulina, krill meal, and garlic extract. Enhances radiant natural pigmentation without clouding tank water.",
        price: 349,
        countInStock: 60,
        isPublished: true,
        isPopular: true,
        isOnSale: true,
        salePrice: 299,
        rating: 4.9,
        numReviews: 41,
      },
      {
        user: adminUser._id,
        name: "HydroClean Whisper-Quiet Submersible Aquarium Filter & Oxygen Pump",
        image: "/uploads/aquarium_fish_tank.jpg",
        brand: "HydroClean",
        category: "accessories",
        description:
          "Energy-saving 500L/H submersible water filter with dual biological sponge, activated carbon cartridge, and adjustable aeration venturi nozzle. Whisper quiet operation.",
        price: 649,
        countInStock: 35,
        isPublished: true,
        isPopular: true,
        isOnSale: true,
        salePrice: 549,
        rating: 4.8,
        numReviews: 29,
      },

      // ==========================================
      // 3. DOGS, FOOD & ESSENTIALS
      // ==========================================
      {
        user: adminUser._id,
        name: "Wild Harvest Raw Organic Beef & Salmon Kibble",
        image: "/uploads/food_kibble_raw.jpg",
        brand: "Wild Harvest",
        category: "food",
        description:
          "Real freeze-dried raw beef bites mixed with wild-caught Alaskan salmon, organic sweet potatoes, and blueberries. Vet recommended for all dog breeds.",
        price: 499,
        countInStock: 35,
        isPublished: true,
        isPopular: true,
        isOnSale: true,
        salePrice: 399,
        rating: 4.9,
        numReviews: 42,
      },
      {
        user: adminUser._id,
        name: "VitalPuppy Farm-Fresh Puppy Growth Formula",
        image: "/uploads/food_kibble_raw.jpg",
        brand: "VitalPuppy",
        category: "food",
        description:
          "DHA-enriched balanced nutrition crafted to support healthy brain, bone, and immune system development in growing puppies.",
        price: 349,
        countInStock: 30,
        isPublished: true,
        isPopular: false,
        isOnSale: false,
        rating: 4.7,
        numReviews: 19,
      },
      {
        user: adminUser._id,
        name: "AKC Purebred Golden Retriever Puppy (Oliver)",
        image: "/uploads/adoptable_golden_puppy.jpg",
        brand: "Certified Adoption Network",
        category: "pets",
        description:
          "Oliver is an 8-week-old purebred Golden Retriever puppy. Fully vet checked, initial vaccinations completed, dewormed, and microchipped. Gentle temperament, loves families and children.",
        price: 18500,
        countInStock: 1,
        isPublished: true,
        isPopular: true,
        isOnSale: false,
        rating: 5.0,
        numReviews: 14,
      },
      {
        user: adminUser._id,
        name: "No-Pull Reflective Breathable Dog Harness",
        image: "/uploads/image-1715602050347.webp",
        brand: "AirPaws",
        category: "accessories",
        description:
          "Comfortable padded mesh harness with dual-clip leash attachment to eliminate choking and pulling. 3M reflective piping for nighttime safety.",
        price: 699,
        countInStock: 28,
        isPublished: true,
        isPopular: true,
        isOnSale: false,
        rating: 4.8,
        numReviews: 19,
      },
      {
        user: adminUser._id,
        name: "Orthopedic Memory Foam Deep Sleep Pet Bed",
        image: "/uploads/image-1715603253557.jpg",
        brand: "ComfyPaws",
        category: "accessories",
        description:
          "Multi-layered medical orthopedic memory foam relieves joint pressure and supports hip alignment. Includes machine washable waterproof micro-suede cover.",
        price: 1899,
        countInStock: 15,
        isPublished: true,
        isPopular: true,
        isOnSale: true,
        salePrice: 1599,
        rating: 4.9,
        numReviews: 37,
      },
      {
        user: adminUser._id,
        name: "Natural Salmon & Sweet Potato Crunch Treats",
        image: "/uploads/image-1713690432183.jpg",
        brand: "Pawsome Bites",
        category: "treats",
        description:
          "Delicious, oven-baked crunchy treats made with real wild salmon and sweet potato for dogs. Rich in Omega-3 for a shiny coat.",
        price: 349,
        countInStock: 40,
        isPublished: true,
        isPopular: true,
        isOnSale: true,
        salePrice: 299,
        rating: 4.9,
        numReviews: 18,
      },
      {
        user: adminUser._id,
        name: "Tough Rubber Chew Bone with Dental Ridges",
        image: "/uploads/image-1713690916717.jpg",
        brand: "K9 Armor",
        category: "toys",
        description:
          "Ultra-durable non-toxic natural rubber chew toy designed for aggressive chewers. Helps remove plaque and massage gums.",
        price: 349,
        countInStock: 30,
        isPublished: true,
        isPopular: false,
        isOnSale: false,
        rating: 4.6,
        numReviews: 5,
      },

      // ==========================================
      // 4. CATS & FOOD & ACCESSORIES
      // ==========================================
      {
        user: adminUser._id,
        name: "Playful British Shorthair Kitten (Luna)",
        image: "/uploads/pets_sample.jpg",
        brand: "Loving Paws Rescue",
        category: "pets",
        description:
          "Luna is a 9-week-old British Shorthair mix kitten. Litter-box trained, vaccinated, super affectionate, and loves purring in warm laps. Certified adoption package included.",
        price: 14500,
        countInStock: 1,
        isPublished: true,
        isPopular: true,
        isOnSale: true,
        salePrice: 12500,
        rating: 5.0,
        numReviews: 11,
      },
      {
        user: adminUser._id,
        name: "NourishPet Gentle Grain-Free Turkey & Pumpkin Cat Stew",
        image: "/uploads/food_sample.jpg",
        brand: "NourishPet",
        category: "food",
        description:
          "Hydrating, tender shredded turkey in savory pumpkin broth formulated specifically for sensitive feline digestion. No artificial preservatives or fillers.",
        price: 299,
        countInStock: 45,
        isPublished: true,
        isPopular: true,
        isOnSale: false,
        rating: 4.8,
        numReviews: 29,
      },
      {
        user: adminUser._id,
        name: "Interactive Cat Feather Wand & Laser Toy",
        image: "/uploads/image-1712653333419.jpg",
        brand: "PurrfectPlay",
        category: "toys",
        description:
          "Engage your feline friend in energetic exercise and fun with this durable telescopic feather wand with interchangeable lure attachments.",
        price: 299,
        countInStock: 25,
        isPublished: true,
        isPopular: true,
        isOnSale: false,
        rating: 4.8,
        numReviews: 12,
      },
      {
        user: adminUser._id,
        name: "Freeze-Dried Chicken Liver Bites",
        image: "/uploads/image-1715601878691.jpg",
        brand: "PureMeats",
        category: "treats",
        description:
          "Single ingredient 100% human-grade chicken liver freeze-dried treats suitable for both dogs and cats. High protein and grain-free.",
        price: 399,
        countInStock: 50,
        isPublished: true,
        isPopular: true,
        isOnSale: false,
        rating: 5.0,
        numReviews: 24,
      },

      // ==========================================
      // 5. SMALL COMPANIONS & WELLNESS CARE
      // ==========================================
      {
        user: adminUser._id,
        name: "Friendly Dwarf Lop Bunny (Clover)",
        image: "/uploads/image-1715602033126.avif",
        brand: "Small Companion Sanctuary",
        category: "pets",
        description:
          "Clover is a sweet, curious 4-month-old dwarf rabbit. Vet inspected, spayed/neutered, highly socialized, and loves fresh greens and orchard hay.",
        price: 2500,
        countInStock: 2,
        isPublished: true,
        isPopular: false,
        isOnSale: false,
        rating: 4.9,
        numReviews: 8,
      },
      {
        user: adminUser._id,
        name: "Organic Oatmeal & Lavender Soothing Pet Shampoo",
        image: "/uploads/image-1715602383826.jpg",
        brand: "PureGroom",
        category: "care",
        description:
          "Deeply moisturizing shampoo formulated with colloidal oatmeal, aloe vera, and lavender essential oils. Soothes dry and irritated skin naturally.",
        price: 449,
        countInStock: 40,
        isPublished: true,
        isPopular: true,
        isOnSale: false,
        rating: 4.8,
        numReviews: 31,
      },
      {
        user: adminUser._id,
        name: "Pro De-Shedding & Massage Undercoat Grooming Tool",
        image: "/uploads/image-1715602269417.jpg",
        brand: "GroomLab",
        category: "care",
        description:
          "Reduces shedding by up to 95% without damaging the protective topcoat. Ergonomic anti-slip grip with quick hair release button.",
        price: 599,
        countInStock: 35,
        isPublished: true,
        isPopular: false,
        isOnSale: true,
        salePrice: 499,
        rating: 4.9,
        numReviews: 22,
      },
      {
        user: adminUser._id,
        name: "Festive Holiday Reindeer Collar & Bandana Set",
        image: "/uploads/image-1715602522640.png",
        brand: "HolidayPets",
        category: "holidays",
        description:
          "Adorn your pet in holiday cheer with this cozy, skin-safe, and adjustable festive bandana and bell collar set.",
        price: 449,
        countInStock: 20,
        isPublished: true,
        isPopular: false,
        isOnSale: true,
        salePrice: 379,
        rating: 4.8,
        numReviews: 7,
      },
    ];

    // Upsert or refresh all A to Z products
    for (const prod of allProducts) {
      await Product.findOneAndUpdate(
        { name: prod.name },
        { $set: prod },
        { upsert: true, new: true }
      );
    }
    console.log(`Seeded & updated ${allProducts.length} A-to-Z products (Birds, Fish, Tanks, Pets, Food, Accessories) in INR!`);
  } catch (err) {
    console.error("Seeder error:", err.message);
  }
};
