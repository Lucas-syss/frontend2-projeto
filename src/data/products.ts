export interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    category: "hoodies" | "tees" | "jackets" | "vests" | "accessories";
    gender: "mens" | "womens" | "unisex";
}

export const allProducts: Product[] = [
    {
        id: 1,
        name: "WRAITH HOODIE",
        price: "€420",
        image: "/wraith-hoodie.webp",
        category: "hoodies",
        gender: "mens",
    },
    {
        id: 2,
        name: "DECAY TEE",
        price: "€180",
        image: "/decay-tee.webp",
        category: "tees",
        gender: "mens",
    },
    {
        id: 3,
        name: "TOMB JACKET",
        price: "€680",
        image: "/wraith-hoodie.webp",
        category: "jackets",
        gender: "mens",
    },
    {
        id: 4,
        name: "RUIN VEST",
        price: "€290",
        image: "/ruin-vest.webp",
        category: "vests",
        gender: "mens",
    },
    {
        id: 5,
        name: "SAINT BRACELET",
        price: "€110",
        image: "/bound-bracelet.webp",
        category: "accessories",
        gender: "unisex",
    },
    {
        id: 6,
        name: "RUGGED RINGS",
        price: "€50",
        image: "/rugged-rings.webp",
        category: "accessories",
        gender: "unisex",
    },
    // Women's specific items
    {
        id: 7,
        name: "PHANTOM HOODIE",
        price: "€400",
        image: "/wraith-hoodie.webp",
        category: "hoodies",
        gender: "womens",
    },
    {
        id: 8,
        name: "ECHO TEE",
        price: "€170",
        image: "/decay-tee.webp",
        category: "tees",
        gender: "womens",
    },
    {
        id: 9,
        name: "SHADE JACKET",
        price: "€650",
        image: "/ruin-vest.webp",
        category: "jackets",
        gender: "womens",
    },
    {
        id: 10,
        name: "DUSK VEST",
        price: "€280",
        image: "/ruin-vest.webp",
        category: "vests",
        gender: "womens",
    },
];

export const categoryLabels: Record<Product["category"], string> = {
    hoodies: "Hoodies & Sweaters",
    tees: "T-Shirts",
    jackets: "Jackets & Outerwear",
    vests: "Vests",
    accessories: "Accessories",
};
