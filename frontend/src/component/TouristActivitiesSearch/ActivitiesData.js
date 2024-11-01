// Item Img
import img1 from "../../assets/img/common/biman_bangla.png";
import flightIcon from "../../assets/img/icon/right_arrow.png";
import flightIcon2 from "../../assets/img/icon/bg.png";

export const activities = [
  {
    id: 1,
    location: {
      type: "Point",
      coordinates: [29.978482, 31.134238],
      name: "Giza Beach",
    },
    name: "Beach Volleyball Tournament",
    date: "2024-12-15T00:00:00.000Z",
    time: "14:30",
    price: 300,
    category: {
      name: "Sports",
      description: "A competitive beach volleyball tournament.",
    },
    tags: [
      { name: "family-friendly", description: "Fun for all ages." },
      { name: "friends", description: "Great for groups." },
    ],
    discounts: 15,
    bookingAvailable: true,
    rating: 4.5,
    advertiser: {
      username: "swedan",
      email: "eheyyy@gmail.com",
      status: "active",
      role: "advertiser",
    },
  },
  {
    id: 2,
    location: {
      type: "Point",
      coordinates: [30.033333, 31.233334],
      name: "Cairo Stadium",
    },
    name: "Football Championship",
    date: "2024-11-20T00:00:00.000Z",
    time: "18:00",
    price: 500,
    category: {
      name: "Sports",
      description: "Annual football championship event.",
    },
    tags: [
      { name: "outdoor", description: "Held in open space." },
      { name: "crowd", description: "Massive audience expected." },
    ],
    discounts: 10,
    bookingAvailable: true,
    rating: 4.7,
    advertiser: {
      username: "youssief",
      email: "youssief23@gmail.com",
      status: "active",
      role: "advertiser",
    },
  },
  {
    id: 3,
    location: {
      type: "Point",
      coordinates: [29.859701, 31.254239],
      name: "Alexandria Beach",
    },
    name: "Sandcastle Contest",
    date: "2024-09-15T00:00:00.000Z",
    time: "09:00",
    price: 200,
    category: {
      name: "Recreation",
      description: "Creative sandcastle building contest.",
    },
    tags: [
      { name: "family", description: "Perfect for family outings." },
      { name: "beach", description: "Located right on the beach." },
    ],
    discounts: 5,
    bookingAvailable: true,
    rating: 4.2,
    advertiser: {
      username: "sammy",
      email: "sammy23@gmail.com",
      status: "active",
      role: "advertiser",
    },
  },
  {
    id: 4,
    location: {
      type: "Point",
      coordinates: [30.123456, 31.123456],
      name: "Luxor Temple",
    },
    name: "Historical Guided Tour",
    date: "2024-10-05T00:00:00.000Z",
    time: "10:00",
    price: 150,
    category: {
      name: "Education",
      description: "A guided tour of Luxor's famous sites.",
    },
    tags: [
      { name: "history", description: "Explore ancient sites." },
      { name: "educational", description: "Learning experience." },
    ],
    discounts: 0,
    bookingAvailable: true,
    rating: 4.9,
    advertiser: {
      username: "historian123",
      email: "historybuff@gmail.com",
      status: "active",
      role: "advertiser",
    },
  },
];
