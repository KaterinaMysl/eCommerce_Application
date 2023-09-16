import './catalogPage.css';
import bus from '../../../assets/icons/bus.webp';
import cruise from '../../../assets/icons/cruise.webp';
import departure from '../../../assets/icons/departure.webp';
import diving from '../../../assets/icons/diving.webp';
import island from '../../../assets/icons/island.webp';
import suitcase from '../../../assets/icons/suitcase.webp';
import PriceSlider from './PriceSlider';
import FilterSelection from './FilterSelection';
import CatalogController from '../../controller/CatalogController';

export default class CatalogPage {
  private catalogController: CatalogController;
  private priceSlider: PriceSlider | null;
  private daysSlider: PriceSlider | null;
  private starsSlider: PriceSlider | null;
  private ratingSlider: PriceSlider | null;
  private filtersSelection: FilterSelection | null;

  constructor(catalogController: CatalogController) {
    this.catalogController = catalogController;
    this.priceSlider = null;
    this.daysSlider = null;
    this.starsSlider = null;
    this.ratingSlider = null;
    this.filtersSelection = null;
  }

  async draw() {
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
                    <div class="fill_height no-margin search-container_box">
                      <div class="col fill_height no-padding">
                        <div class="search_tabs_container">
                          <div class="search_tabs d-flex flex-lg-row align-items-lg-center align-items-start">
                            <a class="search_tab" data-category="Hotels"><div><img src="${suitcase}" alt><span>hotels</span></div></a>
                            <a class="search_tab" data-category="Rentals"><div><img src="${bus}" alt>car rentals</div></a>
                            <a class="search_tab" data-category="Flights"><div><img src="${departure}" alt>flights</div></a>
                            <a class="search_tab" data-category="Trips"><div><img src="${island}" alt>trips</div></a>
                            <a class="search_tab" data-category="Cruises"><div><img src="${cruise}" alt>cruises</div></a>
                            <a class="search_tab" data-category="Activities"><div><img src="${diving}" alt>activities</div></a>
                          </div>
                          <details class="details_category">
                          <summary style="display: none"></summary>
                          <div class="details-container">
                          </div>
                          </details>
                        </div>
                        
                        <div class="search_panel active">
                          <form action="#" id="search_form_1" class="search_panel_content">
                            <div class="search_item">
                              <div>search text</div>
                              <input type="text" class="search_input" required="required">
                            </div>
                            <div class="search_item">
                              <button class="button search_button">search<span></span><span></span><span></span></button>
                            </div>
                            
                          </form>
                          <details>
                          <summary>filters</summary>
                          <div class="filters">
                      <div>

                        <div class="filters-item filters-price">
                          <h5>Price</h5>
                          <div class="filters-price_slider" id="range-slider_price"></div>
                          <div class="filters-price_inputs">
                              <input type="number" min="100"  max="50000" placeholder="100" id="input-price_0"  class="filters-price_input">
                              <span class="filters-price_text">-</span>
                              <input type="number" min="100" max="50000"  placeholder="50000" id="input-price_1" class="filters-price_input">
                              <button id="filters-price_btn" class="filters-price_btn">ok</button>
                          </div>
                        </div>
                        <div class="filters-item filters-days">
                          <h5>Days</h5>
                          <div class="filters-days_slider" id="range-slider_days"></div>
                          <div class="filters-days_inputs">
                              <input type="number" min="1"  max="30" placeholder="1" id="input-days_0"  class="filters-days_input">
                              <span class="filters-days_text">-</span>
                              <input type="number" min="1" max="30"  placeholder="30" id="input-days_1" class="filters-days_input">
                              <button id="filters-days_btn" class="filters-days_btn">ok</button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="filters-item filters-stars">
                          <h5>Stars</h5>
                          <div class="filters-stars_slider" id="range-slider_stars"></div>
                          <div class="filters-stars_inputs">
                              <input type="number" min="1"  max="5" placeholder="1" id="input-stars_0"  class="filters-stars_input">
                              <span class="filters-stars_text">-</span>
                              <input type="number" min="1" max="5"  placeholder="5" id="input-stars_1" class="filters-stars_input">
                              <button id="filters-stars_btn" class="filters-stars_btn">ok</button>
                          </div>
                        </div>

                        <div class="filters-item filters-rating">
                          <h5>Rating</h5>
                          <div class="filters-rating_slider" id="range-slider_rating"></div>
                          <div class="filters-rating_inputs">
                              <input type="number" min="1"  max="10" placeholder="1" id="input-rating_0"  class="filters-rating_input">
                              <span class="filters-stars_text">-</span>
                              <input type="number" min="1" max="10"  placeholder="5" id="input-rating_1" class="filters-rating_input">
                              <button id="filters-rating_btn" class="filters-rating_btn">ok</button>
                          </div>
                        </div>
                      </div>
                    </div>
                        </div>
                        </details>
                        
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="container-products">
                <div class="row">
                  <div class="col-lg-1 temp_col"></div>
                  <div class="col-lg-11"></div>
                  <div class="col-lg-12">
                    <details class="catalog-navigation">
                      <summary style="display:none"></summary>
                      <div class="catalog-navigator_container">
                        <div class="navigator-container_box">
                          <div class="navigator_catalog">
                            <a href="/catalog" class="navigator_link" data-navigator="catalog">Catalog</a>
                          </div>
                          <div class="navigator_category">
                            <a class="navigator_link" data-navigator="Cruises">Cruises</a>
                          </div>
                        </div>
                        <div class="navigator_subcategory">
                          <a class="navigator_link last" data-navigator="Polar cruises">Polar cruises</a>
                        </div>
                      </div>
                    </details>
                    <div class="catalog-settings">
                      <div class="catalog-settings_selection">
                        <div class="catalog-settings_none">
                          <p class="catalog-setting_label">Обрано <span class="search-count"></span> товари</p>
                          <div>
                            <button class="catalog-selection_reset">Reset</button>
                          </div>
                       
                          <div class="catalog-selection_filters">
                            
                          </div>
                        </div>
                      </div>
                      <div class="catalog-settings_sorting">
                        <select>
                          <option value="price asc">Total price: Lowest first</option>
                          <option value="price desc">Total price: Highest first</option>
                          <option value="name.en asc">abc</option>
                          <option value="name.en desc">cba</option>
                        </select>
                      </div>
                    </div>
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
    await this.catalogController.getProducts();
    this.initEventCatalog();
  }

  initEventCatalog() {
    this.priceSlider = new PriceSlider(
      this.catalogController,
      35,
      50000,
      'price',
    );
    this.daysSlider = new PriceSlider(this.catalogController, 1, 30, 'days');
    this.starsSlider = new PriceSlider(this.catalogController, 1, 5, 'stars');
    this.ratingSlider = new PriceSlider(
      this.catalogController,
      1,
      10,
      'rating',
    );
    const sortSelect = document.querySelector(
      '.catalog-settings_sorting select',
    ) as HTMLSelectElement;
    const searchButton = document.querySelector(
      '.search_button',
    ) as HTMLButtonElement;
    const categoryTabs = Array.from(
      document.querySelectorAll('.search_tab'),
    ) as HTMLElement[];
    searchButton.addEventListener('click', (event: Event) => {
      event.preventDefault();
      const searchInput = document.querySelector(
        '.search_input',
      ) as HTMLInputElement;
      const searchText = searchInput.value ? searchInput.value : undefined;
      searchInput.value = '';
      if (searchText) {
        this.catalogController.searchProducts(searchText);
      }
    });
    categoryTabs.forEach(tab =>
      tab.addEventListener('click', () => {
        this.categoryClick(categoryTabs, tab);
      }),
    );
    sortSelect.addEventListener('change', (event: Event) => {
      const targetElement = event.target as HTMLSelectElement;
      this.catalogController.sortProducts(targetElement.value);
    });
  }

  categoryClick(tabs: HTMLElement[], tab: HTMLElement) {
    const details = document.querySelector(
      'details.details_category',
    ) as HTMLDetailsElement;
    const form = document.querySelector('.search_panel_content') as HTMLElement;
    form.classList.add('active');
    details.open = true;
    details.classList.add('active');
    tabs.forEach(tab => tab.classList.remove('active'));
    tab.classList.add('active');
    this.catalogController.getCategory(tab.dataset.category as string);
  }
}
