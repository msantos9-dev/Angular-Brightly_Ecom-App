import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem, CartItemDetailed } from '../models/cart';

export const CART_KEY = 'cart';
@Injectable({
    providedIn: 'root'
})
export class CartService {
    cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

    constructor() {} // eslint-disable-line @typescript-eslint/no-empty-function

    initCartLocalStorage() {
        const cart: Cart = this.getCart();
        if (!cart) {
            const intialCart = {
                items: []
            };
            const intialCartJson = JSON.stringify(intialCart);
            localStorage.setItem(CART_KEY, intialCartJson);
        }
    }

    emptyCart() {
        const intialCart = {
            items: []
        };
        const intialCartJson = JSON.stringify(intialCart);
        localStorage.setItem(CART_KEY, intialCartJson);
        this.cart$.next(intialCart);
    }

    //Getting the cart details from the localStorage
    getCart(): Cart {
        const cartJsonString: string | any = localStorage.getItem(CART_KEY); // eslint-disable-line @typescript-eslint/no-explicit-any
        const cart: Cart | never = JSON.parse(cartJsonString); //Its important to parse an objectValue to something that is JSON so that it can be used easily
        return cart; //This will return the cart details as as JSON
    }

    setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart { //overload the item to be set, if the item exist then update, to the Cart Object
        const cart = this.getCart(); //get the cartJSON from the getCart function
        const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId); //check if the item exists in the cart then return boolean value
        if (cartItemExist) { 
            cart.items?.map((item) => { //collect the cart items then map each item
                if (item.productId === cartItem.productId) { 
                    if (updateCartItem) { //If you swap the current quantity with the new quantity
                        item.quantity = cartItem.quantity;
                    } else { //Else update the quantity by adding the new quantity
                        if (item.quantity && cartItem.quantity) {
                            item.quantity = item.quantity + cartItem.quantity;
                        }
                    }
                    return item;
                }
            });
        } else { //if th item is not in the cart then add it as new item 
            cart.items?.push(cartItem);
        }
        const cartJson = JSON.stringify(cart); //this is just to set the cart item to the localStorage to be use later for persisting cart.user state
        localStorage.setItem(CART_KEY, cartJson);
        this.cart$.next(cart);
        return cart;
    }

    deleteCartItem(productId: string) {
        const cart = this.getCart();
        const newCart = cart.items?.filter((item) => item.productId !== productId);

        cart.items = newCart;

        const cartJsonString = JSON.stringify(cart);
        localStorage.setItem(CART_KEY, cartJsonString);

        this.cart$.next(cart);
    }
}
