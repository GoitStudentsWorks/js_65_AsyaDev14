import { FoodBoutiqueAPI } from './foodBoutiqueApi';
import refs from './refs';
import { renderPopularProducts } from './popularProduct';
import { renderProductsCards } from './productsList';
import { renderDiscountCards } from './discountProducts';
import { updateCartOnHeader } from './header';
import { onAddBtnClick } from './addProduct.js';
import throttle from 'lodash/throttle';
import { manageUpBtn, scrollUp } from './scrollUp';

const foodBoutiqueApi = new FoodBoutiqueAPI();

window.addEventListener(`DOMContentLoaded`, onDOMContentLoaded);

async function onDOMContentLoaded() {
  try {
    updateCartOnHeader();
    try {
      let allProducts = await foodBoutiqueApi.fetchProductsByQuery();
      renderProductsCards(allProducts.results, refs.productsListEl);
    } catch (err) {
      console.log(err);
    }

    try {
      let popularProducts = await foodBoutiqueApi.fetchPopular();
      refs.popularListElement.innerHTML = renderPopularProducts(popularProducts);
    } catch (err) {
      console.log(err);
    }

    try {
      let discountProducts = await foodBoutiqueApi.fetchDiscount();
      renderDiscountCards(discountProducts, refs.discountProductsEl);
    } catch (err) {
      console.log(err);
    }

    try{
      document.onscroll = throttle(manageUpBtn, 300);
      refs.btnUpEl.onclick = scrollUp;
    } catch (err) {
      console.log(err);
    }

    refs.allProductsWrapperEl.addEventListener('click', onAddBtnClick);
  } catch (err) {
    console.log(err);
  }
}
