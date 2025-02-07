import { Car } from "@/types/car";

export const addtocart = (product: Car) => {
    const cart: Car[] = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingProductIndex = cart.findIndex((item: Car) => item._id === product._id);

    if (existingProductIndex > -1) {
        // Update the quantity of the existing product
        cart[existingProductIndex].quantity += 1; // Assuming 'quantity' is a field in the Car type
    } else {
        // Add the new product with initial quantity of 1
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

export const removeFromCart = (productId: string) => {
    let cart: Car[] = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter((item: Car) => item._id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const updateCartQuantity = (productId: string, quantity: number) => {
    let cart: Car[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const productIndex = cart.findIndex((item: Car) => item._id === productId);

    if (productIndex > -1 && quantity > 0) {
        // Update the quantity, ensuring it's greater than 0
        cart[productIndex].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

export const getCartItems = () => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

















// import { Car } from "@/types/car";


// export const addtocart = (product: Car) => {
//     const cart: Car[] = JSON.parse(localStorage.getItem('cart') || '[]');

//     const exixtingProductIndex= cart.findIndex((item: Car) => item._id === product._id);

//     if (exixtingProductIndex > -1) {
//         cart[exixtingProductIndex].pricePerDay1 +=1
// }
// else{
//     cart.push({ ...product, pricePerDay1: 1 });
// }

//     localStorage.setItem('cart', JSON.stringify(cart));
// }

// export const removeFromCart = (productId : string) => {
//     let cart : Car[] = JSON.parse(localStorage.getItem('cart') || '[]');
//     cart = cart.filter((item: Car) => item._id !== productId);
//     localStorage.setItem('cart', JSON.stringify(cart));
// }


// export const updateCartQuantity = (productId: string, quantity: number  ) => {
//     let cart : Car[] = JSON.parse(localStorage.getItem('cart') || '[]');
//     const ProductIndex= cart.findIndex((item: Car) => item._id === productId);

//     if (ProductIndex > -1) {
//         cart[ProductIndex].pricePerDay1 = quantity
//         localStorage.setItem('cart', JSON.stringify(cart));

//     }
// }

// export const getCartItems = () => {
//     return JSON.parse(localStorage.getItem('cart') || '[]');
// }