"use client";
import React, { useState, useRef, useEffect } from "react";
import "./products.css";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

// --- PRODUCT DATA ---
const categories = [
  { id: "all", label: "All Products" },
  { id: "purees-concentrates", label: "Fruit Purees & Concentrates" },
  { id: "chow", label: "Chow" },
  { id: "freeze-dried", label: "Freeze Dried" },
  { id: "frozen-fruits-vegetables", label: "Frozen Fruits & Vegetables" },
  { id: "gro", label: "GRO" },
  { id: "zingat", label: "Zingat" },
  { id: "ice-farm", label: "Ice Farm" },
];

const products = [
  // FRUIT PUREES & CONCENTRATES
  {
    id: "tomato-crush-puree",
    category: "purees-concentrates",
    title: "Tomato Crush Puree",
    description: "High-quality tomato crush puree made from fresh, sun-ripened tomatoes.",
    specs: ["Aseptic / Canned", "Natural Color", "Rich Flavor"],
    image: "/products/tomato-crush-puree.jpg"
  },
  {
    id: "tomato-crush-concentrate",
    category: "purees-concentrates",
    title: "Tomato Crush Concentrate",
    description: "Concentrated tomato crush for versatile culinary applications.",
    specs: ["Aseptic / Bulk", "High Brix", "Consistent Texture"],
    image: "/products/tomato-crush-concentrate.jpg"
  },
  {
    id: "tomato-paste",
    category: "purees-concentrates",
    title: "Tomato Paste",
    description: "Thick, rich tomato paste perfect for sauces and bases.",
    specs: ["28-30% Brix", "Cold Break / Hot Break", "Aseptic"],
    image: "/products/tomato-paste.jpg"
  },
  {
    id: "pink-guava-puree",
    category: "purees-concentrates",
    title: "Pink Guava Puree",
    description: "Natural pink guava puree with authentic tropical flavor.",
    specs: ["9° Min Brix", "Aseptic", "Vitamin C Rich"],
    image: "/products/pink-guava-puree.jpg"
  },
  {
    id: "rajapuri-mango-puree",
    category: "purees-concentrates",
    title: "Rajapuri Mango Puree",
    description: "Distinctive Rajapuri mango puree known for its size and sweetness.",
    specs: ["Authentic Variety", "Aseptic", "Natural Sweetness"],
    image: "/products/rajapuri-mango-puree.jpg"
  },
  {
    id: "kesar-mango-puree",
    category: "purees-concentrates",
    title: "Kesar Mango Puree",
    description: "Saffron-colored Kesar mango puree with intense aroma.",
    specs: ["16° Min Brix", "Aseptic / Canned", "Premium Quality"],
    image: "/products/kesar-mango-puree.jpg"
  },
  {
    id: "banana-concentrate",
    category: "purees-concentrates",
    title: "Banana Concentrate",
    description: "Concentrated banana goodness for beverages and baking.",
    specs: ["High Viscosity", "Aseptic", "No Additives"],
    image: "/products/banana-concentrate.jpg"
  },
  {
    id: "banana-puree",
    category: "purees-concentrates",
    title: "Banana Puree",
    description: "Smooth banana puree made from ripe Cavendish bananas.",
    specs: ["20-22° Brix", "Aseptic", "Creamy Texture"],
    image: "/products/banana-puree.jpg"
  },
  {
    id: "red-papaya-concentrate",
    category: "purees-concentrates",
    title: "Red Papaya Concentrate",
    description: "Concentrated red papaya for intense flavor and color.",
    specs: ["Natural Red Color", "Aseptic", "High Nutrient"],
    image: "/products/red-papaya-concentrate.jpg"
  },
  {
    id: "red-papaya-puree",
    category: "purees-concentrates",
    title: "Red Papaya Puree",
    description: "Fresh red papaya puree suitable for juices and blends.",
    specs: ["14° Min Brix", "Aseptic", "Smooth"],
    image: "/products/red-papaya-puree.jpg"
  },
  {
    id: "white-guava-concentrate",
    category: "purees-concentrates",
    title: "White Guava Concentrate",
    description: "Concentrated white guava flavor for industrial use.",
    specs: ["High Acidity", "Aseptic", "Clear Color"],
    image: "/products/white-guava-concentrate.jpg"
  },
  {
    id: "white-guava-puree",
    category: "purees-concentrates",
    title: "White Guava Puree",
    description: "Classic white guava puree with a balanced sweet-tart profile.",
    specs: ["9° Min Brix", "Aseptic", "Versatile"],
    image: "/products/white-guava-puree.jpg"
  },
  {
    id: "totapuri-mango-puree",
    category: "purees-concentrates",
    title: "Totapuri Mango Puree",
    description: "Tangy and vibrant Totapuri mango puree.",
    specs: ["14° Min Brix", "Aseptic", "High Yield"],
    image: "/products/totapuri-mango-puree.jpg"
  },
  {
    id: "totapuri-mango-concentrate",
    category: "purees-concentrates",
    title: "Totapuri Mango Concentrate",
    description: "Concentrated form of Totapuri mango for beverage manufacturing.",
    specs: ["28° Min Brix", "Aseptic", "Consistent"],
    image: "/products/totapuri-mango-concentrate.jpg"
  },
  {
    id: "alphonso-mango-puree",
    category: "purees-concentrates",
    title: "Alphonso Mango Puree",
    description: "The King of Mangoes in a smooth, aromatic puree.",
    specs: ["16° Min Brix", "Aseptic / Canned", "GI Tagged Origin"],
    image: "/products/alphonso-mango-puree.jpg"
  },
  {
    id: "jamun-pulp",
    category: "purees-concentrates",
    title: "Jamun Pulp",
    description: "Rich, purple Jamun (Black Plum) pulp with unique astringency.",
    specs: ["Natural Color", "Aseptic", "Health Benefits"],
    image: "/products/jamun-pulp.jpg"
  },
  {
    id: "strawberry-pulp",
    category: "purees-concentrates",
    title: "Strawberry Pulp",
    description: "Vibrant red strawberry pulp for ice creams and toppings.",
    specs: ["Seedless Options", "Frozen / Aseptic", "Sweet & Tart"],
    image: "/products/strawberry-pulp.jpg"
  },
  {
    id: "lime-pulp",
    category: "purees-concentrates",
    title: "Lime Pulp",
    description: "Zesty lime pulp for beverages and culinary use.",
    specs: ["High Acidity", "Frozen", "Fresh Aroma"],
    image: "/products/lime-pulp.jpg"
  },
  {
    id: "red-chilli-paste",
    category: "purees-concentrates",
    title: "Red Chilli Paste",
    description: "Spicy red chilli paste for adding heat and color.",
    specs: ["Hot", "Consistent Texture", "Vibrant Red"],
    image: "/products/red-chilli-paste.jpg"
  },

  // CHOW
  {
    id: "green-peas-chow",
    category: "chow",
    title: "Green Peas Chow",
    description: "Savory chow made from fresh green peas.",
    specs: ["Ready to Eat", "Savory", "Unique Blend"],
    image: "/products/green-peas-chow.jpg"
  },
  {
    id: "mango-chow",
    category: "chow",
    title: "Mango Chow",
    description: "Tangy and spicy mango chow.",
    specs: ["Traditional Recipe", "Tangy", "Spicy"],
    image: "/products/mango-chow.jpg"
  },
  {
    id: "strawberry-banana-chow",
    category: "chow",
    title: "Strawberry & Banana Chow",
    description: "A delightful mix of strawberry and banana flavors.",
    specs: ["Sweet", "Fruity", "Dessert Topping"],
    image: "/products/strawberry-banana-chow.jpg"
  },
  {
    id: "strawberry-chow",
    category: "chow",
    title: "Strawberry Chow",
    description: "Pure strawberry goodness in a chow format.",
    specs: ["Sweet", "Red", "Berry Flavor"],
    image: "/products/strawberry-chow.jpg"
  },
  {
    id: "sweet-corn-chow",
    category: "chow",
    title: "Sweet Corn Chow",
    description: "Creamy and sweet corn chow.",
    specs: ["Sweet", "Creamy", "Corn Base"],
    image: "/products/sweet-corn-chow.jpg"
  },
  {
    id: "pineapple-papaya-chow",
    category: "chow",
    title: "Pineapple & Papaya Chow",
    description: "Tropical blend of pineapple and papaya.",
    specs: ["Tropical", "Sweet & Tangy", "Refreshing"],
    image: "/products/pineapple-papaya-chow.jpg"
  },

  // FREEZE DRIED
  {
    id: "fd-strawberry-whole",
    category: "freeze-dried",
    title: "Strawberry (Whole)",
    description: "Whole freeze-dried strawberries retaining shape and flavor.",
    specs: ["Whole Fruit", "Crunchy", "100% Natural"],
    image: "/products/fd-strawberry-whole.jpg"
  },
  {
    id: "fd-alphonso-mango",
    category: "freeze-dried",
    title: "Alphonso Mango (Slice & Powder)",
    description: "Premium Alphonso mango available in slices or powder.",
    specs: ["Slice / Powder", "Intense Aroma", "No Sugar Added"],
    image: "/products/fd-alphonso-mango.jpg"
  },
  {
    id: "fd-banana-slice",
    category: "freeze-dried",
    title: "Banana (Slice)",
    description: "Crunchy freeze-dried banana slices.",
    specs: ["Sliced", "Sweet", "Snack Ready"],
    image: "/products/fd-banana-slice.jpg"
  },
  {
    id: "fd-pineapple-dice",
    category: "freeze-dried",
    title: "Pineapple (Dice)",
    description: "Tangy pineapple dices, freeze-dried to perfection.",
    specs: ["Diced", "Tropical", "Rehydratable"],
    image: "/products/fd-pineapple-dice.jpg"
  },
  {
    id: "fd-pumpkin-dice",
    category: "freeze-dried",
    title: "Pumpkin (Dice)",
    description: "Versatile pumpkin dices for soups and baking.",
    specs: ["Diced", "Nutritious", "Long Shelf Life"],
    image: "/products/fd-pumpkin-dice.jpg"
  },
  {
    id: "fd-yam-dice",
    category: "freeze-dried",
    title: "Yam (Dice)",
    description: "Freeze-dried yam dices for convenient cooking.",
    specs: ["Diced", "Starchy", "Quick Cook"],
    image: "/products/fd-yam-dice.jpg"
  },
  {
    id: "fd-okra-ring",
    category: "freeze-dried",
    title: "Okra Ring",
    description: "Crispy okra rings, perfect for snacking or curries.",
    specs: ["Ring Cut", "Crispy", "Green"],
    image: "/products/fd-okra-ring.jpg"
  },
  {
    id: "fd-sweetcorn-kernel",
    category: "freeze-dried",
    title: "Sweet Corn Kernel",
    description: "Sweet corn kernels that rehydrate instantly.",
    specs: ["Whole Kernel", "Sweet", "Yellow"],
    image: "/products/fd-sweetcorn-kernel.jpg"
  },
  {
    id: "fd-mushroom",
    category: "freeze-dried",
    title: "Mushroom",
    description: "Earthy mushrooms preserved via freeze-drying.",
    specs: ["Sliced / Whole", "Umami", "Versatile"],
    image: "/products/fd-mushroom.jpg"
  },
  {
    id: "fd-sweet-potato",
    category: "freeze-dried",
    title: "Sweet Potato",
    description: "Sweet potato pieces for various applications.",
    specs: ["Diced / Sliced", "Sweet", "Nutritious"],
    image: "/products/fd-sweet-potato.jpg"
  },
  {
    id: "fd-tomato-dice",
    category: "freeze-dried",
    title: "Tomato (Dice)",
    description: "Diced tomatoes perfect for instant mixes.",
    specs: ["Diced", "Tangy", "Red"],
    image: "/products/fd-tomato-dice.jpg"
  },
  {
    id: "fd-basil",
    category: "freeze-dried",
    title: "Basil",
    description: "Aromatic basil leaves freeze-dried to keep fresh flavor.",
    specs: ["Leaves", "Aromatic", "Herb"],
    image: "/products/fd-basil.jpg"
  },
  {
    id: "fd-ginger",
    category: "freeze-dried",
    title: "Ginger",
    description: "Pungent ginger pieces or powder.",
    specs: ["Pieces / Powder", "Spicy", "Medicinal"],
    image: "/products/fd-ginger.jpg"
  },
  {
    id: "fd-broccoli",
    category: "freeze-dried",
    title: "Broccoli",
    description: "Nutrient-rich broccoli florets.",
    specs: ["Florets", "Green", "Healthy"],
    image: "/products/fd-broccoli.jpg"
  },
  {
    id: "fd-carrot",
    category: "freeze-dried",
    title: "Carrot",
    description: "Sweet carrot pieces for instant foods.",
    specs: ["Diced", "Orange", "Sweet"],
    image: "/products/fd-carrot.jpg"
  },
  {
    id: "fd-beetroot",
    category: "freeze-dried",
    title: "Beetroot",
    description: "Earthy beetroot pieces with deep color.",
    specs: ["Diced", "Deep Red", "Natural Colorant"],
    image: "/products/fd-beetroot.jpg"
  },
  {
    id: "fd-lemon-grass",
    category: "freeze-dried",
    title: "Lemon Grass",
    description: "Citrusy lemon grass for teas and asian cuisine.",
    specs: ["Cut", "Citrus Aroma", "Herbal"],
    image: "/products/fd-lemon-grass.jpg"
  },
  {
    id: "fd-asparagus",
    category: "freeze-dried",
    title: "Asparagus",
    description: "Premium asparagus spears.",
    specs: ["Cut / Whole", "Gourmet", "Green"],
    image: "/products/fd-asparagus.jpg"
  },
  {
    id: "fd-leek-spring-onion",
    category: "freeze-dried",
    title: "Leek Spring Onion",
    description: "A blend or choice of leeks and spring onions.",
    specs: ["Chopped", "Onion Flavor", "Garnish"],
    image: "/products/fd-leek-spring-onion.jpg"
  },
  {
    id: "fd-coriander",
    category: "freeze-dried",
    title: "Coriander",
    description: "Fresh coriander leaves preserved perfectly.",
    specs: ["Leaves", "Aromatic", "Garnish"],
    image: "/products/fd-coriander.jpg"
  },
  {
    id: "fd-mint",
    category: "freeze-dried",
    title: "Mint",
    description: "Refreshing mint leaves.",
    specs: ["Leaves", "Cooling", "Aromatic"],
    image: "/products/fd-mint.jpg"
  },

  // FROZEN FRUITS & VEGETABLES
  {
    id: "frozen-mango-dice",
    category: "frozen-fruits-vegetables",
    title: "Mango (Dice)",
    description: "IQF mango dices, ready to use.",
    specs: ["IQF", "Diced", "Sweet"],
    image: "/products/frozen-mango-dice.jpg"
  },
  {
    id: "frozen-strawberry",
    category: "frozen-fruits-vegetables",
    title: "Strawberry",
    description: "Whole or sliced IQF strawberries.",
    specs: ["IQF", "Red", "Sweet"],
    image: "/products/frozen-strawberry.jpg"
  },
  {
    id: "frozen-pomegranate-arils",
    category: "frozen-fruits-vegetables",
    title: "Pomegranate Arils",
    description: "Fresh frozen pomegranate arils.",
    specs: ["IQF", "Ruby Red", "Juicy"],
    image: "/products/frozen-pomegranate-arils.jpg"
  },
  {
    id: "frozen-papaya-dice",
    category: "frozen-fruits-vegetables",
    title: "Papaya (Dice)",
    description: "IQF papaya dices.",
    specs: ["IQF", "Orange", "Sweet"],
    image: "/products/frozen-papaya-dice.jpg"
  },
  {
    id: "frozen-muskmelon-dice-balls",
    category: "frozen-fruits-vegetables",
    title: "Muskmelon (Dice/Balls)",
    description: "Sweet muskmelon available in dices or balls.",
    specs: ["IQF", "Dice / Ball", "Aromatic"],
    image: "/products/frozen-muskmelon.jpg"
  },
  {
    id: "frozen-pineapple-dice",
    category: "frozen-fruits-vegetables",
    title: "Pineapple (Dice)",
    description: "IQF pineapple dices.",
    specs: ["IQF", "Yellow", "Tangy"],
    image: "/products/frozen-pineapple-dice.jpg"
  },
  {
    id: "frozen-sweet-corn-kernels",
    category: "frozen-fruits-vegetables",
    title: "Sweet Corn Kernels",
    description: "IQF sweet corn kernels.",
    specs: ["IQF", "Sweet", "Yellow"],
    image: "/products/frozen-sweet-corn-kernels.jpg"
  },
  {
    id: "frozen-tomato-dice",
    category: "frozen-fruits-vegetables",
    title: "Tomato (Dice)",
    description: "IQF tomato dices.",
    specs: ["IQF", "Red", "Convenient"],
    image: "/products/frozen-tomato-dice.jpg"
  },
  {
    id: "frozen-sweet-potato",
    category: "frozen-fruits-vegetables",
    title: "Sweet Potato",
    description: "IQF sweet potato.",
    specs: ["IQF", "Nutritious", "Versatile"],
    image: "/products/frozen-sweet-potato.jpg"
  },
  {
    id: "frozen-radish",
    category: "frozen-fruits-vegetables",
    title: "Radish",
    description: "IQF radish pieces.",
    specs: ["IQF", "White", "Crisp"],
    image: "/products/frozen-radish.jpg"
  },
  {
    id: "frozen-pumpkin",
    category: "frozen-fruits-vegetables",
    title: "Pumpkin",
    description: "IQF pumpkin pieces.",
    specs: ["IQF", "Orange", "Cooking Ready"],
    image: "/products/frozen-pumpkin.jpg"
  },
  {
    id: "frozen-green-pepper",
    category: "frozen-fruits-vegetables",
    title: "Green Pepper",
    description: "IQF green pepper (capsicum).",
    specs: ["IQF", "Diced / Strip", "Green"],
    image: "/products/frozen-green-pepper.jpg"
  },
  {
    id: "frozen-baby-corn",
    category: "frozen-fruits-vegetables",
    title: "Baby Corn",
    description: "IQF baby corn.",
    specs: ["IQF", "Whole / Cut", "Crunchy"],
    image: "/products/frozen-baby-corn.jpg"
  },
  {
    id: "frozen-edamame",
    category: "frozen-fruits-vegetables",
    title: "Edamame",
    description: "IQF edamame beans.",
    specs: ["IQF", "Green", "Protein Rich"],
    image: "/products/frozen-edamame.jpg"
  },
  {
    id: "frozen-cabbage",
    category: "frozen-fruits-vegetables",
    title: "Cabbage",
    description: "IQF cabbage shreds.",
    specs: ["IQF", "Shredded", "Fresh"],
    image: "/products/frozen-cabbage.jpg"
  },
  {
    id: "frozen-ginger",
    category: "frozen-fruits-vegetables",
    title: "Ginger",
    description: "IQF ginger pieces.",
    specs: ["IQF", "Pungent", "Root"],
    image: "/products/frozen-ginger.jpg"
  },
  {
    id: "frozen-green-chilli",
    category: "frozen-fruits-vegetables",
    title: "Green Chilli",
    description: "IQF green chillies.",
    specs: ["IQF", "Spicy", "Whole / Cut"],
    image: "/products/frozen-green-chilli.jpg"
  },
  {
    id: "frozen-asparagus",
    category: "frozen-fruits-vegetables",
    title: "Asparagus",
    description: "IQF asparagus.",
    specs: ["IQF", "Premium", "Green"],
    image: "/products/frozen-asparagus.jpg"
  },
  {
    id: "frozen-sweet-corn-cob",
    category: "frozen-fruits-vegetables",
    title: "Sweet Corn & Cob",
    description: "IQF sweet corn on the cob or kernels.",
    specs: ["IQF", "Cob / Kernel", "Sweet"],
    image: "/products/frozen-sweet-corn-cob.jpg"
  },
  {
    id: "frozen-onion-dice",
    category: "frozen-fruits-vegetables",
    title: "Onion (Dice)",
    description: "IQF onion dices.",
    specs: ["IQF", "Diced", "Pungent"],
    image: "/products/frozen-onion-dice.jpg"
  },
  {
    id: "frozen-green-peas",
    category: "frozen-fruits-vegetables",
    title: "Green Peas",
    description: "IQF green peas.",
    specs: ["IQF", "Sweet", "Green"],
    image: "/products/frozen-green-peas.jpg"
  },
  {
    id: "frozen-scotch-bonnet",
    category: "frozen-fruits-vegetables",
    title: "Scotch Bonnet Pepper",
    description: "IQF Scotch Bonnet peppers.",
    specs: ["IQF", "Very Hot", "Distinctive Flavor"],
    image: "/products/frozen-scotch-bonnet.jpg"
  },
  {
    id: "frozen-cauliflower",
    category: "frozen-fruits-vegetables",
    title: "Cauliflower",
    description: "IQF cauliflower florets.",
    specs: ["IQF", "Florets", "White"],
    image: "/products/frozen-cauliflower.jpg"
  },
  {
    id: "frozen-carrot",
    category: "frozen-fruits-vegetables",
    title: "Carrot",
    description: "IQF carrot pieces.",
    specs: ["IQF", "Diced / Sliced", "Orange"],
    image: "/products/frozen-carrot.jpg"
  },
  {
    id: "frozen-bitter-gourd",
    category: "frozen-fruits-vegetables",
    title: "Bitter Gourd",
    description: "IQF bitter gourd slices.",
    specs: ["IQF", "Sliced", "Bitter"],
    image: "/products/frozen-bitter-gourd.jpg"
  },
  {
    id: "frozen-broccoli",
    category: "frozen-fruits-vegetables",
    title: "Broccoli",
    description: "IQF broccoli florets.",
    specs: ["IQF", "Florets", "Green"],
    image: "/products/frozen-broccoli.jpg"
  },

  // GRO
  {
    id: "gro-ketchup-1kg",
    category: "gro",
    title: "Gro Tomato Ketchup (1KG)",
    description: "Large family pack of Gro Tomato Ketchup.",
    specs: ["1KG", "Pouch", "Rich Tomato"],
    image: "/products/gro-ketchup-1kg.jpg"
  },
  {
    id: "gro-ketchup-200g",
    category: "gro",
    title: "Gro Tomato Ketchup (200g)",
    description: "Convenient 200g pack of Gro Tomato Ketchup.",
    specs: ["200g", "Pouch", "Rich Tomato"],
    image: "/products/gro-ketchup-200g.jpg"
  },
  {
    id: "gro-ketchup-950g",
    category: "gro",
    title: "Gro Tomato Ketchup (950g)",
    description: "Value pack of Gro Tomato Ketchup.",
    specs: ["950g", "Bottle / Pouch", "Rich Tomato"],
    image: "/products/gro-ketchup-950g.jpg"
  },
  {
    id: "gro-ketchup-8g",
    category: "gro",
    title: "Gro Tomato Ketchup (8g)",
    description: "Single serve sachet of Gro Tomato Ketchup.",
    specs: ["8g", "Sachet", "Travel Friendly"],
    image: "/products/gro-ketchup-8g.jpg"
  },

  // ZINGAT
  {
    id: "zingat-ketchup-950g",
    category: "zingat",
    title: "Tomato Ketchup (950g)",
    description: "Zingat brand tomato ketchup, tangy and sweet.",
    specs: ["950g", "Bottle", "Zingat Brand"],
    image: "/products/zingat-ketchup-950g.jpg"
  },
  {
    id: "zingat-vinegar",
    category: "zingat",
    title: "Zingat Vinegar",
    description: "High quality vinegar for cooking and preservation.",
    specs: ["Synthetic / Natural", "Acidic", "Clear"],
    image: "/products/zingat-vinegar.jpg"
  },
  {
    id: "zingat-gg-paste-450g",
    category: "zingat",
    title: "Ginger Garlic Paste (450g)",
    description: "Aromatic ginger garlic paste in a medium pack.",
    specs: ["450g", "Paste", "Convenient"],
    image: "/products/zingat-gg-paste-450g.jpg"
  },
  {
    id: "zingat-ketchup-130g",
    category: "zingat",
    title: "Tomato Ketchup (130g)",
    description: "Small pack of Zingat tomato ketchup.",
    specs: ["130g", "Pouch", "Tangy"],
    image: "/products/zingat-ketchup-130g.jpg"
  },
  {
    id: "zingat-gg-paste-200g",
    category: "zingat",
    title: "Ginger Garlic Paste (200g)",
    description: "Small pack of aromatic ginger garlic paste.",
    specs: ["200g", "Paste", "Convenient"],
    image: "/products/zingat-gg-paste-200g.jpg"
  },

  // ICE FARM
  {
    id: "ice-farm-peas",
    category: "ice-farm",
    title: "Frozen Green Peas",
    description: "Ice Farm brand frozen green peas.",
    specs: ["Frozen", "Sweet", "Ice Farm Brand"],
    image: "/products/ice-farm-peas.jpg"
  },
  {
    id: "ice-farm-corn",
    category: "ice-farm",
    title: "Frozen Sweet Corn",
    description: "Ice Farm brand frozen sweet corn.",
    specs: ["Frozen", "Sweet", "Ice Farm Brand"],
    image: "/products/ice-farm-corn.jpg"
  },
  {
    id: "ice-farm-mixed-veg",
    category: "ice-farm",
    title: "Frozen Mixed Vegetables",
    description: "Ice Farm brand frozen mixed vegetables.",
    specs: ["Frozen", "Mixed", "Ice Farm Brand"],
    image: "/products/ice-farm-mixed-veg.jpg"
  },
];

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;
  const containerRef = useRef(null);
  const lenis = useLenis();

  // Filter products
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      
      const scrollToProductTop = () => {
        const heroSection = document.querySelector('.products-hero');
        if (heroSection) {
          // Calculate the document position of the bottom of the hero
          const targetY = heroSection.getBoundingClientRect().bottom + window.scrollY;
          
          if (lenis) {
            // Smooth scroll with custom duration and easing for a premium feel
            lenis.scrollTo(targetY, { 
              duration: 1.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
            });
          } else {
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      };

      // Small timeout to allow state to propagate if needed, though usually not required for 'hero' position which is static.
      // But let's call it immediately as the hero position is stable.
      scrollToProductTop();
    }
  };

  useGSAP(() => {
    // Animate grid items when category or page changes
    gsap.fromTo(".product-card", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }
    );
  }, { scope: containerRef, dependencies: [activeCategory, currentPage] });

  return (
    <>
      <Nav />
      <div className="products-page" ref={containerRef}>
        
        {/* HERO */}
        <section className="products-hero">
          <Copy>
            <h1>Our Products</h1>
            <p>
              From the heart of the farm to your facility. Explore our range of premium, 
              sustainably processed ingredients designed for global food industries.
            </p>
          </Copy>
        </section>

        {/* FILTER BAR */}
        <div className="category-filter">
          <div className="filter-container">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-btn ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <section className="products-grid-section">
          <div className="products-grid">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    {/* Placeholder for now - eventually use Next/Image with actual assets */}
                    <div style={{
                      width: '100%', 
                      height: '100%', 
                      background: 'linear-gradient(45deg, var(--base-450), var(--base-500))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--base-300)',
                      fontSize: '3rem'
                    }}>
                      {/* Simple visual placeholder if image fails or is missing */}
                      ●
                    </div>
                  </div>
                  <div className="product-info">
                    <div className="product-header">
                      <span className="product-category">
                        {categories.find(c => c.id === product.category)?.label}
                      </span>
                      <h3>{product.title}</h3>
                    </div>
                    <p className="product-desc">{product.description}</p>
                    <div className="product-specs">
                      {product.specs.map((spec, index) => (
                        <span key={index} className="spec-tag">{spec}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                <p>No products found in this category.</p>
              </div>
            )}
          </div>

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="pagination-controls">
              <button 
                className="pagination-btn" 
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              
              <button 
                className="pagination-btn" 
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </section>

      </div>
      <ConditionalFooter />
    </>
  );
};

export default ProductsPage;
