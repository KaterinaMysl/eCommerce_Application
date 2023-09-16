import bicycle from '../../../assets/icons/bicycle.webp';
import post from '../../../assets/icons/post.webp';
import compass from '../../../assets/icons/compass.webp';
import sailboat from '../../../assets/icons/sailboat.webp';
import { Attribute, ProductProjection } from '@commercetools/platform-sdk';
import { navigateTo } from '../../app/Router';

export default class CatalogProductPage {
  draw(product: ProductProjection) {
    const offerGrid = document.querySelector('.offers_grid') as HTMLElement;
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
      <div class="offers_item rating_4">
        <div class="row">
          <div class="col-lg-1 temp_col"></div>
            <div class="col-lg-3 col-1680-4">
              <div class="offers_image_container">
                <div class="offers_image_background" style="background-image:url(${
                  product.masterVariant.images?.[0]?.url
                })"></div>
                <div class="offer_name" prod-name="${product.key}">${
      product.name.en
    }</div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="offers_content">
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
                <p class="offers_text">${product.description?.en}</p>
                <div class="offers_icons">
                  <ul class="offers_icons_list">
                    <li class="offers_icons_item"><img src="${post}" alt></li>
                    <li class="offers_icons_item"><img src="${compass}" alt></li>
                    <li class="offers_icons_item"><img src="${bicycle}" alt></li>
                    <li class="offers_icons_item"><img src="${sailboat}" alt></li>
                  </ul>
                </div>
                <div class="button book_button" prod-name="${
                  product.key
                }">view more<span></span><span></span><span></span></div>
                <div class="button book_button add-product-to-cart" prod-key="${
                  product.id
                }">Add to cart</div>
                <div class="offer_reviews">
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
          </div>
        </div>
      </div>`;
    offerGrid.insertAdjacentHTML('afterbegin', content);
    const offerItemBtns = document.querySelectorAll('.book_button');
    offerItemBtns.forEach(item => {
      item.addEventListener('click', e => {
        const targetEl = e.target as HTMLElement;
        const productName = targetEl.getAttribute('prod-name');
        if (productName) {
          navigateTo(`/catalog?name=${productName}`);
        }
      });
    });
  }
}
