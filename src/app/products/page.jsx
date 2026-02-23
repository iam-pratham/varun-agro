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
    sku: "37463",
    category: "purees-concentrates",
    title: "Tomato Crush Puree",
    description: "High-quality tomato crush puree made from fresh, sun-ripened tomatoes.",
    specs: ["Aseptic / Canned", "Natural Color", "Rich Flavor"],
    image: "/products/Tomato Crush puree.png"
  },
  {
    id: "tomato-crush-concentrate",
    sku: "37471",
    category: "purees-concentrates",
    title: "Tomato Crush Concentrate",
    description: "Concentrated tomato crush for versatile culinary applications.",
    specs: ["Aseptic / Bulk", "High Brix", "Consistent Texture"],
    image: "/products/Tomato Crush Concentrate.png"
  },
  {
    id: "tomato-paste",
    sku: "37474",
    category: "purees-concentrates",
    title: "Tomato Paste",
    description: "Thick, rich tomato paste perfect for sauces and bases.",
    specs: ["28-30% Brix", "Cold Break / Hot Break", "Aseptic"],
    image: "/products/Tomato Paste.png"
  },
  {
    id: "pink-guava-puree",
    sku: "37481",
    category: "purees-concentrates",
    title: "Pink Guava Puree",
    description: "Natural pink guava puree with authentic tropical flavor.",
    specs: ["9° Min Brix", "Aseptic", "Vitamin C Rich"],
    image: "/products/Pink Guava Puree.png"
  },
  {
    id: "rajapuri-mango-puree",
    sku: "37485",
    category: "purees-concentrates",
    title: "Rajapuri Mango Puree",
    description: "Distinctive Rajapuri mango puree known for its size and sweetness.",
    specs: ["Authentic Variety", "Aseptic", "Natural Sweetness"],
    image: "/products/Rajapuri Mango Puree.png"
  },
  {
    id: "kesar-mango-puree",
    sku: "37486",
    category: "purees-concentrates",
    title: "Kesar Mango Puree",
    description: "Saffron-colored Kesar mango puree with intense aroma.",
    specs: ["16° Min Brix", "Aseptic / Canned", "Premium Quality"],
    image: "/products/Kesar Mango Puree.png"
  },
  {
    id: "banana-concentrate",
    sku: "37487",
    category: "purees-concentrates",
    title: "Banana Concentrate",
    description: "Concentrated banana goodness for beverages and baking.",
    specs: ["High Viscosity", "Aseptic", "No Additives"],
    image: "/products/Banana Concentrate.png"
  },
  {
    id: "banana-puree",
    sku: "37488",
    category: "purees-concentrates",
    title: "Banana Puree",
    description: "Smooth banana puree made from ripe Cavendish bananas.",
    specs: ["20-22° Brix", "Aseptic", "Creamy Texture"],
    image: "/products/Banana Puree.png"
  },
  {
    id: "red-papaya-concentrate",
    sku: "37492",
    category: "purees-concentrates",
    title: "Red Papaya Concentrate",
    description: "Concentrated red papaya for intense flavor and color.",
    specs: ["Natural Red Color", "Aseptic", "High Nutrient"],
    image: "/products/Red Papaya Concentrate.png"
  },
  {
    id: "red-papaya-puree",
    sku: "37496",
    category: "purees-concentrates",
    title: "Red Papaya Puree",
    description: "Fresh red papaya puree suitable for juices and blends.",
    specs: ["14° Min Brix", "Aseptic", "Smooth"],
    image: "/products/Red Papaya Puree.png"
  },
  {
    id: "white-guava-concentrate",
    sku: "37498",
    category: "purees-concentrates",
    title: "White Guava Concentrate",
    description: "Concentrated white guava flavor for industrial use.",
    specs: ["High Acidity", "Aseptic", "Clear Color"],
    image: "/products/White Guava Concentrate.png"
  },
  {
    id: "white-guava-puree",
    sku: "37500",
    category: "purees-concentrates",
    title: "White Guava Puree",
    description: "Classic white guava puree with a balanced sweet-tart profile.",
    specs: ["9° Min Brix", "Aseptic", "Versatile"],
    image: "/products/White Guava Puree.png"
  },
  {
    id: "totapuri-mango-puree",
    sku: "37501",
    category: "purees-concentrates",
    title: "Totapuri Mango Puree",
    description: "Tangy and vibrant Totapuri mango puree.",
    specs: ["14° Min Brix", "Aseptic", "High Yield"],
    image: "/products/Totapuri Mango Puree.png"
  },
  {
    id: "totapuri-mango-concentrate",
    sku: "37505",
    category: "purees-concentrates",
    title: "Totapuri Mango Concentrate",
    description: "Concentrated form of Totapuri mango for beverage manufacturing.",
    specs: ["28° Min Brix", "Aseptic", "Consistent"],
    image: "/products/Totapuri Mango Concentrate.png"
  },
  {
    id: "alphonso-mango-puree",
    sku: "37507",
    category: "purees-concentrates",
    title: "Alphonso Mango Puree",
    description: "The King of Mangoes in a smooth, aromatic puree.",
    specs: ["16° Min Brix", "Aseptic / Canned", "GI Tagged Origin"],
    image: "/products/Alphonso mango Puree (Premium Ratnagiri).png"
  },
  {
    id: "jamun-pulp",
    sku: "37513",
    category: "purees-concentrates",
    title: "Jamun Pulp",
    description: "Rich, purple Jamun (Black Plum) pulp with unique astringency.",
    specs: ["Natural Color", "Aseptic", "Health Benefits"],
    image: "/products/Jamun Pulp.png"
  },
  {
    id: "strawberry-pulp",
    sku: "37515",
    category: "purees-concentrates",
    title: "Strawberry Pulp",
    description: "Vibrant red strawberry pulp for ice creams and toppings.",
    specs: ["Seedless Options", "Frozen / Aseptic", "Sweet & Tart"],
    image: "/products/Strawberry Pulp.png"
  },
  {
    id: "red-chilli-paste",
    sku: "37518",
    category: "purees-concentrates",
    title: "Red Chilli Paste",
    description: "Spicy red chilli paste for adding heat and color.",
    specs: ["Hot", "Consistent Texture", "Vibrant Red"],
    image: "/products/Red Chilli paste.png"
  },
  {
    id: "lime-pulp",
    sku: "37521",
    category: "purees-concentrates",
    title: "Lime Pulp",
    description: "Zesty lime pulp for beverages and culinary use.",
    specs: ["High Acidity", "Frozen", "Fresh Aroma"],
    image: "/products/Lime Pulp.png"
  },

  // FREEZE DRIED
  {
    id: "fd-strawberry-whole",
    sku: "37541",
    category: "freeze-dried",
    title: "Strawberry (Whole)",
    description: "Whole freeze-dried strawberries retaining shape and flavor.",
    specs: ["Whole Fruit", "Crunchy", "100% Natural"],
    image: "/products/Strawberry (Whole).png"
  },
  {
    id: "fd-alphonso-mango",
    sku: "37570",
    category: "freeze-dried",
    title: "Alphonso Mango (Slice & Powder)",
    description: "Premium Alphonso mango available in slices or powder.",
    specs: ["Slice / Powder", "Intense Aroma", "No Sugar Added"],
    image: "/products/Alphonso Mango(Slice & Powder).png"
  },
  {
    id: "fd-banana-slice",
    sku: "37573",
    category: "freeze-dried",
    title: "Banana (Slice)",
    description: "Crunchy freeze-dried banana slices.",
    specs: ["Sliced", "Sweet", "Snack Ready"],
    image: "/products/Banana Slice.png"
  },
  {
    id: "fd-pineapple-dice",
    sku: "37576",
    category: "freeze-dried",
    title: "Pineapple (Dice)",
    description: "Tangy pineapple dices, freeze-dried to perfection.",
    specs: ["Diced", "Tropical", "Rehydratable"],
    image: "/products/Pineapple Dice.png"
  },
  {
    id: "fd-pumpkin-dice",
    sku: "37577",
    category: "freeze-dried",
    title: "Pumpkin (Dice)",
    description: "Versatile pumpkin dices for soups and baking.",
    specs: ["Diced", "Nutritious", "Long Shelf Life"],
    image: "/products/Pumpkin Dice.png"
  },
  {
    id: "fd-yam-dice",
    sku: "37579",
    category: "freeze-dried",
    title: "Yam (Dice)",
    description: "Freeze-dried yam dices for convenient cooking.",
    specs: ["Diced", "Starchy", "Quick Cook"],
    image: "/products/YAM DICE.png"
  },
  {
    id: "fd-okra-ring",
    sku: "37581",
    category: "freeze-dried",
    title: "Okra Ring",
    description: "Crispy okra rings, perfect for snacking or curries.",
    specs: ["Ring Cut", "Crispy", "Green"],
    image: "/products/Okra Ring.png"
  },
  {
    id: "fd-sweetcorn-kernel",
    sku: "37593",
    category: "freeze-dried",
    title: "Sweet Corn Kernel",
    description: "Sweet corn kernels that rehydrate instantly.",
    specs: ["Whole Kernel", "Sweet", "Yellow"],
    image: "/products/Sweetcorn Kernel.png"
  },
  {
    id: "fd-mushroom",
    sku: "37596",
    category: "freeze-dried",
    title: "Mushroom",
    description: "Earthy mushrooms preserved via freeze-drying.",
    specs: ["Sliced / Whole", "Umami", "Versatile"],
    image: "/products/Mushroom.png"
  },
  {
    id: "fd-sweet-potato",
    sku: "37616",
    category: "freeze-dried",
    title: "Sweet Potato",
    description: "Sweet potato pieces for various applications.",
    specs: ["Diced / Sliced", "Sweet", "Nutritious"],
    image: "/products/Sweet Potato.png"
  },
  {
    id: "fd-tomato-dice",
    sku: "37623",
    category: "freeze-dried",
    title: "Tomato (Dice)",
    description: "Diced tomatoes perfect for instant mixes.",
    specs: ["Diced", "Tangy", "Red"],
    image: "/products/Tomato Dice.png"
  },
  {
    id: "fd-basil",
    sku: "37698",
    category: "freeze-dried",
    title: "Basil",
    description: "Aromatic basil leaves freeze-dried to keep fresh flavor.",
    specs: ["Leaves", "Aromatic", "Herb"],
    image: "/products/Basil.png"
  },
  {
    id: "fd-ginger",
    sku: "37700",
    category: "freeze-dried",
    title: "Ginger",
    description: "Pungent ginger pieces or powder.",
    specs: ["Pieces / Powder", "Spicy", "Medicinal"],
    image: "/products/Ginger.png"
  },
  {
    id: "fd-broccoli",
    sku: "37702",
    category: "freeze-dried",
    title: "Broccoli",
    description: "Nutrient-rich broccoli florets.",
    specs: ["Florets", "Green", "Healthy"],
    image: "/products/Broccoli.png"
  },
  {
    id: "fd-carrot",
    sku: "37704",
    category: "freeze-dried",
    title: "Carrot",
    description: "Sweet carrot pieces for instant foods.",
    specs: ["Diced", "Orange", "Sweet"],
    image: "/products/carrot.png"
  },
  {
    id: "fd-beetroot",
    sku: "37707",
    category: "freeze-dried",
    title: "Beetroot",
    description: "Earthy beetroot pieces with deep color.",
    specs: ["Diced", "Deep Red", "Natural Colorant"],
    image: "/products/Beetroot.png"
  },
  {
    id: "fd-lemon-grass",
    sku: "37757",
    category: "freeze-dried",
    title: "Lemon Grass",
    description: "Citrusy lemon grass for teas and asian cuisine.",
    specs: ["Cut", "Citrus Aroma", "Herbal"],
    image: "/products/Lemon Grass.png"
  },
  {
    id: "fd-asparagus",
    sku: "37758",
    category: "freeze-dried",
    title: "Asparagus",
    description: "Premium asparagus spears.",
    specs: ["Cut / Whole", "Gourmet", "Green"],
    image: "/products/Asparagus.png"
  },
  {
    id: "fd-leek-spring-onion",
    sku: "37766",
    category: "freeze-dried",
    title: "Leek Spring Onion",
    description: "A blend or choice of leeks and spring onions.",
    specs: ["Chopped", "Onion Flavor", "Garnish"],
    image: "/products/Leek Spring Onion.png"
  },
  {
    id: "fd-coriander",
    sku: "37768",
    category: "freeze-dried",
    title: "Coriander",
    description: "Fresh coriander leaves preserved perfectly.",
    specs: ["Leaves", "Aromatic", "Garnish"],
    image: "/products/coriander'.png"
  },
  {
    id: "fd-mint",
    sku: "37770",
    category: "freeze-dried",
    title: "Mint",
    description: "Refreshing mint leaves.",
    specs: ["Leaves", "Cooling", "Aromatic"],
    image: "/products/MINT.png"
  },

  // FROZEN FRUITS & VEGETABLES
  {
    id: "frozen-mango-dice",
    sku: "37772",
    category: "frozen-fruits-vegetables",
    title: "Mango (Dice)",
    description: "IQF mango dices, ready to use.",
    specs: ["IQF", "Diced", "Sweet"],
    image: "/products/Mango Dice.jpg"
  },
  {
    id: "frozen-strawberry",
    sku: "37775",
    category: "frozen-fruits-vegetables",
    title: "Strawberry",
    description: "Whole or sliced IQF strawberries.",
    specs: ["IQF", "Red", "Sweet"],
    image: "/products/Strawberry.png"
  },
  {
    id: "frozen-pomegranate-arils",
    sku: "37777",
    category: "frozen-fruits-vegetables",
    title: "Pomegranate Arils",
    description: "Fresh frozen pomegranate arils.",
    specs: ["IQF", "Ruby Red", "Juicy"],
    image: "/products/Pomegranate Arils.png"
  },
  {
    id: "frozen-papaya-dice",
    sku: "37779",
    category: "frozen-fruits-vegetables",
    title: "Papaya (Dice)",
    description: "IQF papaya dices.",
    specs: ["IQF", "Orange", "Sweet"],
    image: "/products/Papaya Dice.png"
  },
  {
    id: "frozen-muskmelon-dice-balls",
    sku: "37781",
    category: "frozen-fruits-vegetables",
    title: "Muskmelon (Dice/Balls)",
    description: "Sweet muskmelon available in dices or balls.",
    specs: ["IQF", "Dice / Ball", "Aromatic"],
    image: "/products/Muskmelon Dice Balls.png"
  },
  {
    id: "frozen-pineapple-dice",
    sku: "37783",
    category: "frozen-fruits-vegetables",
    title: "Pineapple (Dice)",
    description: "IQF pineapple dices.",
    specs: ["IQF", "Yellow", "Tangy"],
    image: "/products/Pineapple Dice.png"
  },
  {
    id: "frozen-sweet-corn-kernels",
    sku: "37785",
    category: "frozen-fruits-vegetables",
    title: "Sweet Corn Kernels",
    description: "IQF sweet corn kernels.",
    specs: ["IQF", "Sweet", "Yellow"],
    image: "/products/Sweet Corn Kernels.png"
  },
  {
    id: "frozen-tomato-dice",
    sku: "37787",
    category: "frozen-fruits-vegetables",
    title: "Tomato (Dice)",
    description: "IQF tomato dices.",
    specs: ["IQF", "Red", "Convenient"],
    image: "/products/Tomato Dice.png"
  },
  {
    id: "frozen-sweet-potato",
    sku: "37789",
    category: "frozen-fruits-vegetables",
    title: "Sweet Potato",
    description: "IQF sweet potato.",
    specs: ["IQF", "Nutritious", "Versatile"],
    image: "/products/Sweet Potato.png"
  },
  {
    id: "frozen-radish",
    sku: "37791",
    category: "frozen-fruits-vegetables",
    title: "Radish",
    description: "IQF radish pieces.",
    specs: ["IQF", "White", "Crisp"],
    image: "/products/radish.png"
  },
  {
    id: "frozen-pumpkin",
    sku: "37793",
    category: "frozen-fruits-vegetables",
    title: "Pumpkin",
    description: "IQF pumpkin pieces.",
    specs: ["IQF", "Orange", "Cooking Ready"],
    image: "/products/pumpkin.png"
  },
  {
    id: "frozen-green-pepper",
    sku: "37795",
    category: "frozen-fruits-vegetables",
    title: "Green Pepper",
    description: "IQF green pepper (capsicum).",
    specs: ["IQF", "Diced / Strip", "Green"],
    image: "/products/Green Pepper(Capsicum).png"
  },
  {
    id: "frozen-baby-corn",
    sku: "37797",
    category: "frozen-fruits-vegetables",
    title: "Baby Corn",
    description: "IQF baby corn.",
    specs: ["IQF", "Whole / Cut", "Crunchy"],
    image: "/products/babycorn.png"
  },
  {
    id: "frozen-edamame",
    sku: "37799",
    category: "frozen-fruits-vegetables",
    title: "Edamame",
    description: "IQF edamame beans.",
    specs: ["IQF", "Green", "Protein Rich"],
    image: "/products/Edamame.png"
  },
  {
    id: "frozen-cabbage",
    sku: "37802",
    category: "frozen-fruits-vegetables",
    title: "Cabbage",
    description: "IQF cabbage shreds.",
    specs: ["IQF", "Shredded", "Fresh"],
    image: "/products/Cabbage.png"
  },
  {
    id: "frozen-ginger",
    sku: "37807",
    category: "frozen-fruits-vegetables",
    title: "Ginger",
    description: "IQF ginger pieces.",
    specs: ["IQF", "Pungent", "Root"],
    image: "/products/Ginger.png"
  },
  {
    id: "frozen-green-chilli",
    sku: "37810",
    category: "frozen-fruits-vegetables",
    title: "Green Chilli",
    description: "IQF green chillies.",
    specs: ["IQF", "Spicy", "Whole / Cut"],
    image: "/products/Green Chilly.png"
  },
  {
    id: "frozen-asparagus",
    sku: "37812",
    category: "frozen-fruits-vegetables",
    title: "Asparagus",
    description: "IQF asparagus.",
    specs: ["IQF", "Premium", "Green"],
    image: "/products/Asparagus.png"
  },
  {
    id: "frozen-sweet-corn-cob",
    sku: "37814",
    category: "frozen-fruits-vegetables",
    title: "Sweet Corn & Cob",
    description: "IQF sweet corn on the cob or kernels.",
    specs: ["IQF", "Cob / Kernel", "Sweet"],
    image: "/products/Sweet Corn & Cob.png"
  },
  {
    id: "frozen-onion-dice",
    sku: "37816",
    category: "frozen-fruits-vegetables",
    title: "Onion (Dice)",
    description: "IQF onion dices.",
    specs: ["IQF", "Diced", "Pungent"],
    image: "/products/Onion Dice.png"
  },
  {
    id: "frozen-green-peas",
    sku: "37818",
    category: "frozen-fruits-vegetables",
    title: "Green Peas",
    description: "IQF green peas.",
    specs: ["IQF", "Sweet", "Green"],
    image: "/products/Green Peas.png"
  },
  {
    id: "frozen-scotch-bonnet",
    sku: "37820",
    category: "frozen-fruits-vegetables",
    title: "Scotch Bonnet Pepper",
    description: "IQF Scotch Bonnet peppers.",
    specs: ["IQF", "Very Hot", "Distinctive Flavor"],
    image: "/products/Scotch Bonnet Pepper.png"
  },
  {
    id: "frozen-cauliflower",
    sku: "37906",
    category: "frozen-fruits-vegetables",
    title: "Cauliflower",
    description: "IQF cauliflower florets.",
    specs: ["IQF", "Florets", "White"],
    image: "/products/Cauliflower.png"
  },
  {
    id: "frozen-carrot",
    sku: "37908",
    category: "frozen-fruits-vegetables",
    title: "Carrot",
    description: "IQF carrot pieces.",
    specs: ["IQF", "Diced / Sliced", "Orange"],
    image: "/products/carrot.png"
  },
  {
    id: "frozen-beetroot",
    sku: "37910",
    category: "frozen-fruits-vegetables",
    title: "Beetroot",
    description: "IQF beetroot pieces.",
    specs: ["IQF", "Diced", "Red"],
    image: "/products/Beetroot.png"
  },
  {
    id: "frozen-bitter-gourd",
    sku: "37912",
    category: "frozen-fruits-vegetables",
    title: "Bitter Gourd",
    description: "IQF bitter gourd slices.",
    specs: ["IQF", "Sliced", "Bitter"],
    image: "/products/bitter gourd.png"
  },
  {
    id: "frozen-broccoli",
    sku: "37914",
    category: "frozen-fruits-vegetables",
    title: "Broccoli",
    description: "IQF broccoli florets.",
    specs: ["IQF", "Florets", "Green"],
    image: "/products/Broccoli.png"
  },

  // CHOW
  {
    id: "green-peas-chow",
    sku: "38614",
    category: "chow",
    title: "Green Peas Chow",
    description: "Savory chow made from fresh green peas.",
    specs: ["Ready to Eat", "Savory", "Unique Blend"],
    image: "/products/Green Peas.png"
  },
  {
    id: "mango-chow",
    sku: "38616",
    category: "chow",
    title: "Mango Chow",
    description: "Tangy and spicy mango chow.",
    specs: ["Traditional Recipe", "Tangy", "Spicy"],
    image: "/products/mango.png"
  },
  {
    id: "strawberry-banana-chow",
    sku: "38617",
    category: "chow",
    title: "Strawberry & Banana Chow",
    description: "A delightful mix of strawberry and banana flavors.",
    specs: ["Sweet", "Fruity", "Dessert Topping"],
    image: "/products/strawberry & banana.png"
  },
  {
    id: "strawberry-chow",
    sku: "38618",
    category: "chow",
    title: "Strawberry Chow",
    description: "Pure strawberry goodness in a chow format.",
    specs: ["Sweet", "Red", "Berry Flavor"],
    image: "/products/Strawberry.png"
  },
  {
    id: "sweet-corn-chow",
    sku: "38619",
    category: "chow",
    title: "Sweet Corn Chow",
    description: "Creamy and sweet corn chow.",
    specs: ["Sweet", "Creamy", "Corn Base"],
    image: "/products/sweet corn.png"
  },
  {
    id: "pineapple-papaya-chow",
    sku: "38876",
    category: "chow",
    title: "Pineapple & Papaya Chow",
    description: "Tropical blend of pineapple and papaya.",
    specs: ["Tropical", "Sweet & Tangy", "Refreshing"],
    image: "/products/pineapple & papaya.png"
  },

  // GRO
  {
    id: "gro-ketchup-1kg",
    sku: "38613",
    category: "gro",
    title: "Gro Tomato Ketchup (1KG)",
    description: "Large family pack of Gro Tomato Ketchup.",
    specs: ["1KG", "Pouch", "Rich Tomato"],
    image: "/products/GRO Tomato Ketchup(1 kg).png"
  },
  {
    id: "gro-ketchup-200g",
    sku: "38824",
    category: "gro",
    title: "Gro Tomato Ketchup (200g)",
    description: "Convenient 200g pack of Gro Tomato Ketchup.",
    specs: ["200g", "Pouch", "Rich Tomato"],
    image: "/products/GRO Tomato Ketchup (200g).png"
  },
  {
    id: "gro-ketchup-950g",
    sku: "38826",
    category: "gro",
    title: "Gro Tomato Ketchup (950g)",
    description: "Value pack of Gro Tomato Ketchup.",
    specs: ["950g", "Bottle / Pouch", "Rich Tomato"],
    image: "/products/GRO Tomato Ketchup (950g).png"
  },
  {
    id: "gro-ketchup-8g",
    sku: "38894",
    category: "gro",
    title: "Gro Tomato Ketchup (8g)",
    description: "Single serve sachet of Gro Tomato Ketchup.",
    specs: ["8g", "Sachet", "Travel Friendly"],
    image: "/products/Tomato Ketchup (8g).png"
  },

  // ZINGAT
  {
    id: "zingat-ketchup-950g",
    sku: "38857",
    category: "zingat",
    title: "Tomato Ketchup (950g)",
    description: "Zingat brand tomato ketchup, tangy and sweet.",
    specs: ["950g", "Bottle", "Zingat Brand"],
    image: "/products/Tomato Ketchup (950g).png"
  },
  {
    id: "zingat-vinegar",
    sku: "38858",
    category: "zingat",
    title: "Zingat Vinegar",
    description: "High quality vinegar for cooking and preservation.",
    specs: ["Synthetic / Natural", "Acidic", "Clear"],
    image: "/products/Zingat Vinegar.png"
  },
  {
    id: "zingat-gg-paste-450g",
    sku: "38859",
    category: "zingat",
    title: "Ginger Garlic Paste (450g)",
    description: "Aromatic ginger garlic paste in a medium pack.",
    specs: ["450g", "Paste", "Convenient"],
    image: "/products/Ginger Garlic Paste (450g).png"
  },
  {
    id: "zingat-ketchup-130g",
    sku: "38881",
    category: "zingat",
    title: "Tomato Ketchup (130g)",
    description: "Small pack of Zingat tomato ketchup.",
    specs: ["130g", "Pouch", "Tangy"],
    image: "/products/Tomato Ketchup (130g).png"
  },
  {
    id: "zingat-ketchup-misc",
    sku: "38883",
    category: "zingat",
    title: "Tomato Ketchup",
    description: "Zingat quality tomato ketchup.",
    specs: ["Condiment", "Rich Taste", "Zingat Brand"],
    image: "/products/Tomato Ketchup.png"
  },
  {
    id: "zingat-gg-paste-200g",
    sku: "38886",
    category: "zingat",
    title: "Ginger Garlic Paste (200g)",
    description: "Small pack of aromatic ginger garlic paste.",
    specs: ["200g", "Paste", "Convenient"],
    image: "/products/Ginger Garlic Paste (200g).png"
  },

  // ICE FARM
  {
    id: "ice-farm-peas",
    sku: "38887",
    category: "ice-farm",
    title: "Frozen Green Peas",
    description: "Ice Farm brand frozen green peas.",
    specs: ["Frozen", "Sweet", "Ice Farm Brand"],
    image: "/products/Frozen Green Peas.png"
  },
  {
    id: "ice-farm-corn",
    sku: "38888",
    category: "ice-farm",
    title: "Frozen Sweet Corn",
    description: "Ice Farm brand frozen sweet corn.",
    specs: ["Frozen", "Sweet", "Ice Farm Brand"],
    image: "/products/Frozen Sweet Corn.png"
  },
  {
    id: "ice-farm-mixed-veg",
    sku: "38889",
    category: "ice-farm",
    title: "Frozen Mixed Vegetables",
    description: "Ice Farm brand frozen mixed vegetables.",
    specs: ["Frozen", "Mixed", "Ice Farm Brand"],
    image: "/products/Frozen Mixed Vegetables.png"
  },
];

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
          const targetY = heroSection.getBoundingClientRect().bottom + window.scrollY;

          if (lenis) {
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

      scrollToProductTop();
    }
  };

  useGSAP(() => {
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
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => setSelectedProduct(product)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                    <div className="fallback-placeholder" style={{
                      display: 'none',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(45deg, var(--base-450), var(--base-500))',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--base-300)',
                      fontSize: '3rem'
                    }}>
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
                      {product.specs.slice(0, 3).map((spec, index) => (
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

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div className="product-modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSelectedProduct(null)}>×</button>

            <div className="modal-body">
              <div className="modal-image-section">
                <img src={selectedProduct?.image} alt={selectedProduct?.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                <div className="fallback-placeholder" style={{
                  display: 'none',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, var(--base-450), var(--base-500))',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--base-300)',
                  fontSize: '3rem'
                }}>
                  ●
                </div>
              </div>

              <div className="modal-details-section">
                <div className="modal-header">
                  <span className="modal-category">
                    {categories.find(c => c.id === selectedProduct.category)?.label}
                  </span>
                  <h2>{selectedProduct.title}</h2>
                  <div className="product-sku">Product ID: {selectedProduct.sku}</div>
                </div>

                <p className="modal-description">{selectedProduct.description}</p>

                <div className="modal-specs">
                  {selectedProduct.specs.map((spec, index) => (
                    <span key={index} className="modal-spec-tag">{spec}</span>
                  ))}
                </div>

                <div className="modal-actions">
                  <a
                    href={`mailto:info@varunagro.com?subject=Quote for ${selectedProduct.title} (ID: ${selectedProduct.sku})`}
                    className="get-quote-btn"
                  >
                    Get Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConditionalFooter />
    </>
  );
};

export default ProductsPage;
