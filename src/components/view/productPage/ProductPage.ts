import './ProductPage.css';

import {
  Attribute,
  Image,
  ProductProjection,
} from '@commercetools/platform-sdk';
import bicycle from '../../../assets/icons/bicycle.webp';
import post from '../../../assets/icons/post.webp';
import compass from '../../../assets/icons/compass.webp';
import sailboat from '../../../assets/icons/sailboat.webp';
import Swiper from 'swiper';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

class ProductItemPage {
  draw(product: ProductProjection) {
    const pageContainer = document.querySelector('.main') as HTMLElement;
    const normalPrice =
      (product.masterVariant.prices?.[0].value.centAmount as number) / 100;
    const discountPrice =
      (product.masterVariant.prices?.[0].discounted?.value
        .centAmount as number) / 100;
    const attributeKeys: Record<string, string | number> = {
      days: '',
      stars: '',
      rating: '',
      reviewsSubtitle: '',
      reviewsTitle: '',
    };
    const attributes = product.masterVariant.attributes as Attribute[];

    const attributeObject: Record<string, string | number> = {};
    for (const attribute of attributes) {
      const key = attribute.name;
      if (key in attributeKeys) {
        attributeObject[key] = attribute.value;
      }
    }
    const content = `
      <div class="container-offers">
        <div class="offers-home">
            <div class="offers-home_background"></div>
            <div class="offers-home_content">
            <div class="offers-home_title">our offer</div>
            </div>
        </div>
        <div class="product-container"> 
            <div class="product">
              <h2 class="product__name">${product.name.en}</h2>
              <div class="product__info">
                <div>
                    <div class="offers_price ${
                      discountPrice ? 'discount' : ''
                    }"><span class="normal_price">$${normalPrice}</span><span class="discount_price">$${discountPrice}</span></div>
                    <div class="rating_r rating_r_${
                      attributeObject.stars
                    } offers_rating" data-rating="3">
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>
                </div>
                <div class="offer_reviews reviews">
                    <div class="offer_reviews_content">
                    <div class="offer_reviews_title">${
                      attributeObject.reviewsTitle
                    }</div>
                    <div class="offer_reviews_subtitle">${
                      attributeObject.reviewsSubtitle
                    } reviews</div>
                    </div>
                    <div class="offer_reviews_rating reviews_rating_${Math.floor(
                      attributeObject.rating as number,
                    )} text-center">${attributeObject.rating}</div>
                </div>
              </div>
              <div class="box-info-product">
                <div id="slider" class="swiper">
                  <div class="swiper-wrapper">
                    ${this.createSlides(product.masterVariant.images || [])}
                  </div>
                  <div id="product-slider-pagination" class="swiper-pagination"></div>
                  <div id="product-slider-prev" class="swiper-button-prev"></div>
                  <div id="product-slider-next" class="swiper-button-next"></div>
                </div>
                <p class="offers_text">${product.description?.en}</p>
              </div>
              <div class="offers_icons">
                <ul class="offers_icons_list">
                  <li class="offers_icons_item"><img src="${post}" alt></li>
                  <li class="offers_icons_item"><img src="${compass}" alt></li>
                  <li class="offers_icons_item"><img src="${bicycle}" alt></li>
                  <li class="offers_icons_item"><img src="${sailboat}" alt></li>
                </ul>
                <div class="button book_button remove-product-from-cart" prod-key="${
                  product.id
                }">Remove from cart</div>
                <div class="button book_button add-product-to-cart" prod-key="${
                  product.id
                }">Add to cart</div>
              </div>
            </div>
        </div>
        ${this.createModal(product.masterVariant.images || [])}
    </div>`;

    pageContainer.innerHTML = content;

    this.initSlider();
    this.initProductModalSlider();
  }

  private createSlides(images: Image[]) {
    let content = '';
    images.forEach(image => {
      content += `<div class="swiper-slide"><img src="${image.url}"></div>`;
    });
    return content;
  }

  private initSlider() {
    new Swiper('#slider', {
      modules: [EffectFade, Navigation, Pagination],

      loop: true,
      effect: 'fade',
      slidesPerView: 'auto',
      centeredSlides: true,

      pagination: {
        el: '#product-slider-pagination',
        clickable: true,
        dynamicBullets: true,
      },

      navigation: {
        nextEl: '#product-slider-next',
        prevEl: '#product-slider-prev',
      },
    });
  }

  private createModal(images: Image[]) {
    const content = `
        <div id="product-modal" class="modal">
            <div class="modal-content">
                <span id="modal-close" class="close">&times;</span>
                <div id="modal-slider" class="swiper">
                    <div class="swiper-wrapper">
                        ${this.createSlides(images)}
                    </div>
                    <div id="modal-slider-prev" class="swiper-button-prev"></div>
                    <div id="modal-slider-next" class="swiper-button-next"></div>
              </div>
            </div>
        </div>
    `;
    return content;
  }

  private initProductModalSlider() {
    new Swiper('#modal-slider', {
      modules: [EffectFade, Navigation],

      loop: true,
      effect: 'fade',
      slidesPerView: 'auto',
      centeredSlides: true,

      navigation: {
        nextEl: '#modal-slider-next',
        prevEl: '#modal-slider-prev',
      },
    });
  }
}

export default ProductItemPage;
