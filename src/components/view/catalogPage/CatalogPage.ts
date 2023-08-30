import './catalogPage.css';
import bus from '../../../assets/icons/bus.webp';
import cruise from '../../../assets/icons/cruise.webp';
import departure from '../../../assets/icons/departure.webp';
import diving from '../../../assets/icons/diving.webp';
import island from '../../../assets/icons/island.webp';
import suitcase from '../../../assets/icons/suitcase.webp';
import ProductController from '../../controller/ProductsController';
export default class CatalogPage {
  private catalogController: ProductController;
  constructor() {
    this.catalogController = new ProductController();
  }
  draw() {
    const bodyContainer = document.querySelector('.main') as HTMLElement;
    const content = `
          <div class="container-offers">
            
            <div class="offers-home">
              <div class="offers-home_background"></div>
              <div class="offers-home_content">
                <div class="offers-home_title">our offers</div>
              </div>
            </div>
            
            <div class="offers"> 

              <div class="search">
                <div class="search_inner">
                  <div class="container fill_height no-padding">
                    <div class="row fill_height no-margin">
                      <div class="col fill_height no-padding">
                        <div class="search_tabs_container">
                          <div class="search_tabs d-flex flex-lg-row flex-column align-items-lg-center align-items-start">
                            <div class="search_tab active d-flex flex-row align-items-center justify-content-lg-center"><img src="${suitcase}" alt><span>hotels</span></div>
                            <div class="search_tab d-flex flex-row align-items-center justify-content-lg-center"><img src="${bus}" alt>car rentals</div>
                            <div class="search_tab d-flex flex-row align-items-center justify-content-lg-center"><img src="${departure}" alt>flights</div>
                            <div class="search_tab d-flex flex-row align-items-center justify-content-lg-center"><img src="${island}" alt>trips</div>
                            <div class="search_tab d-flex flex-row align-items-center justify-content-lg-center"><img src="${cruise}" alt>cruises</div>
                            <div class="search_tab d-flex flex-row align-items-center justify-content-lg-center"><img src="${diving}" alt>activities</div>
                          </div>
                        </div>
                        
                        <div class="search_panel active">
                          <form action="#" id="search_form_1" class="search_panel_content d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-lg-between">
                            <div class="search_item">
                              <div>search text</div>
                              <input type="text" class="search_input" required="required">
                            </div>
                            <div class="search_item">
                              <button class="button search_button">search<span></span><span></span><span></span></button>
                            </div>
                          </form>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="container-products">
                <div class="row">
                  <div class="col-lg-1 temp_col"></div>
                  <div class="col-lg-11">
                    <div class="offers_sorting_container">
                      <h5>Sort by</h5>
                      <select>
                        <option value="price asc">Total price: Lowest first</option>
                        <option value="price desc">Total price: Highest first</option>
                        <option value="name.en asc">abc</option>
                        <option value="name.en desc">cba</option>
                      </select>
                    </div>
                  </div>
                  
                  <div class="col-lg-12">
                    <div class="offers_grid">
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>            

          </div>
        </div> 
    `;
    bodyContainer.innerHTML = content;
    this.catalogController.getProducts();
    this.initEventCatalog();
  }
  initEventCatalog() {
    const sortSelect = document.querySelector(
      '.offers_sorting_container select',
    ) as HTMLSelectElement;
    const searchButton = document.querySelector(
      '.search_button',
    ) as HTMLButtonElement;
    searchButton.addEventListener('click', (event: Event) => {
      event.preventDefault();
      const searchInput = document.querySelector(
        '.search_input',
      ) as HTMLInputElement;
      const searchText = searchInput.value ? searchInput.value : undefined;
      if (searchText) {
        this.catalogController.searchProducts(searchText);
      }
    });
    sortSelect.addEventListener('change', (event: Event) => {
      const targetElement = event.target as HTMLSelectElement;
      this.catalogController.sortProducts(targetElement.value);
    });
  }
}
