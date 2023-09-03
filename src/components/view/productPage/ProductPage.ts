import './ProductPage.css';
import { Attribute, ProductProjection } from '@commercetools/platform-sdk';
import bicycle from '../../../assets/icons/bicycle.webp';
import post from '../../../assets/icons/post.webp';
import compass from '../../../assets/icons/compass.webp';
import sailboat from '../../../assets/icons/sailboat.webp';

export default class ProductItemPage {
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
              <div class="offers_image_container image">
                <div class="offers_image_background" style="background-image:url(${
                  product.masterVariant.images?.[0]?.url
                })"></div>
              </div>
              <p class="offers_text">${product.description?.en}</p>
              <div class="offers_icons">
                <ul class="offers_icons_list">
                  <li class="offers_icons_item"><img src="${post}" alt></li>
                  <li class="offers_icons_item"><img src="${compass}" alt></li>
                  <li class="offers_icons_item"><img src="${bicycle}" alt></li>
                  <li class="offers_icons_item"><img src="${sailboat}" alt></li>
                </ul>
              </div>
            </div>`;

    pageContainer.innerHTML = content;
  }
}
