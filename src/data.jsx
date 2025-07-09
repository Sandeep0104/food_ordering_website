import pizza from "../src/assets/pizza.jpg"
import burger from "./assets/burger.jpg"
import butterchicken from './assets/butterchicken.jpg'
import paneer from './assets/paneer.jpg'
import biryani from './assets/biryani.webp'
import dosa from './assets/dosa.jpg'
import tikka from './assets/tikka.webp'
import friedmanchuri from './assets/friedmanchuri.jpg'
import gulabjamun from './assets/gulabjamun.jpg'
import cake from './assets/cake.jpg'
import brownie from './assets/brownie.jpg'
import coldcoffee from './assets/coldcoffee.jpg'


export const products = [
  {
    id: 1,
    title: "Margherita Pizza",
    price: 199,
    description: "Classic Italian pizza with tomato sauce, mozzarella, and fresh basil.",
    category: "Pizza",
    image: pizza
  },
  {
    id: 2,
    title: "Veggie Burger",
    price: 79,
    description: "Grilled veggie patty with lettuce, tomato, onion, and special sauce.",
    category: "Burger",
    image: burger
  },
  {
    id: 3,
    title: "Butter Chicken",
    price: 249,
    description: "Tender chicken cooked in creamy tomato gravy with Indian spices.",
    category: "Indian",
    image: butterchicken
  },
  {
    id: 4,
    title: "Paneer Butter Masala",
    price: 209,
    description: "Cottage cheese cubes in creamy butter-tomato gravy, served hot.",
    category: "Indian",
    image: paneer,
    rating: { rate: 4.6, count: 180 }
  },
  {
    id: 5,
    title: "Chicken Biryani",
    price: 239,
    description: "Aromatic basmati rice cooked with spiced chicken and herbs.",
    category: "Indian",
    image: biryani
  },
  {
    id: 6,
    title: "Masala Dosa",
    price: 119,
    description: "South Indian crispy dosa stuffed with spiced potato filling.",
    category: "South Indian",
    image: dosa
  },
  {
    id: 7,
    title: "Tandoori Paneer Tikka",
    price: 189,
    description: "Grilled paneer cubes marinated in yogurt and spices.",
    category: "Indian",
    image: tikka  
  },
  {
    id: 8,
    title: "Fried Rice with Manchurian",
    price: 159,
    description: "Chinese-style fried rice served with spicy vegetable Manchurian.",
    category: "Chinese",
    image: friedmanchuri
  },
  {
    id: 9,
    title: "Cold Coffee with Ice Cream",
    price: 129,
    description: "Chilled coffee blended with vanilla ice cream and topped with whipped cream.",
    category: "Beverage",
    image: coldcoffee  },
  {
    id: 10,
    title: "Cheesecake Slice",
    price: 99,
    description: "Rich and creamy cheesecake with a graham cracker crust.",
    category: "Dessert",
    image: cake  
  },
  {
    id: 11,
    title: "Chocolate Brownie",
    price: 89,
    description: "Gooey and rich chocolate brownie with a fudgy center.",
    category: "Dessert",
    image: brownie  
  },
  {
    id: 12,
    title: "Gulab Jamun",
    price: 69,
    description: "Soft milk-solid balls soaked in rose-flavored sugar syrup.",
    category: "Dessert",
    image: gulabjamun
  }
];
