/* 
    Mock API simulating a service that fetches products from a server
*/
const PRODUCTS = [
    {
        id: 100,
        name: "Laptop",
        price: 1499.99,
        image: require("../assets/products/laptop.jpg"),
        description:
            "A laptop, laptop computer, or notebook computer is a small, portable personal computer (PC) with a screen and alphanumeric keyboard. Laptops are folded shut for transportation, and thus are suitable for mobile use.",
    },
    {
        id: 101,
        name: "Camera",
        price: 599.99,
        image: require("../assets/products/camera.jpg"),
        description:
            "A camera is an optical instrument used to capture an image. At their most basic, cameras are sealed boxes (the camera body) with a small hole (the aperture) that allow light in to capture an image on a light-sensitive surface (usually photographic film or a digital sensor).",
    },
    {
        id: 102,
        name: "Smartwatch",
        price: 349.99,
        image: require("../assets/products/smartwatch.jpg"),
        description:
            "A smartwatch is a wearable computing device that closely resembles a wristwatch or other time-keeping device. In addition to telling time, many smartwatches are Bluetooth-capable.",
    },
];
export function getProducts() {
    return PRODUCTS;
}
export function getProduct(id: number) {
    return PRODUCTS.find((product) => product.id == id);
}
