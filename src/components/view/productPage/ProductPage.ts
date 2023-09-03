import { ProductProjection } from '@commercetools/platform-sdk';
import bicycle from '../../../assets/icons/bicycle.webp';
import post from '../../../assets/icons/post.webp';
import compass from '../../../assets/icons/compass.webp';
import sailboat from '../../../assets/icons/sailboat.webp';

export default class ProductItemPage {
  draw(product: ProductProjection) {
    const pageContainer = document.querySelector(
      '.container-products',
    ) as HTMLElement;
    const normalPrice =
      (product.masterVariant.prices?.[0].value.centAmount as number) / 100;
    const discountPrice =
      (product.masterVariant.prices?.[0].discounted?.value
        .centAmount as number) / 100;
    const content = `
      <div class="offers_item rating_4">
        <div class="row">
          <div class="col-lg-1 temp_col"></div>
            <div class="col-lg-3 col-1680-4">
              <div class="offers_image_container">
                <div class="offers_image_background" style="background-image:url(${
                  product.masterVariant.images?.[0]?.url
                })"></div>
                <div class="offer_name"><a href="#">${product.name.en}</a></div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="offers_content">
                <div class="offers_price ${
                  discountPrice ? 'discount' : ''
                }"><span class="normal_price">$${normalPrice}</span><span class="discount_price">$${discountPrice}</span></div>
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
                <div class="button book_button" prod-id="${
                  product.id
                }">view tour<span></span><span></span><span></span></a></div>
            </div>
          </div>
        </div>
      </div>`;

    pageContainer.innerHTML = content;
  }
}
