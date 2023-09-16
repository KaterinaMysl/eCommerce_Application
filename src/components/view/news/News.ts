import './News.css';
import b1 from '../../../assets/images/b1.png';
import b2 from '../../../assets/images/b2.png';
import b3 from '../../../assets/images/b3.png';
import b4 from '../../../assets/images/b4.png';
import b5 from '../../../assets/images/b5.png';
import b6 from '../../../assets/images/b6.png';
import b7 from '../../../assets/images/b7.png';
import b8 from '../../../assets/images/b8.png';
import b9 from '../../../assets/images/b9.png';
import b10 from '../../../assets/images/b10.png';
import b11 from '../../../assets/images/b11.png';
import b12 from '../../../assets/images/b12.png';
import b13 from '../../../assets/images/b13.png';

class News {
  draw() {
    const bodyContainer = document.querySelector('.main') as HTMLElement;
    const content = `
        <div class="news-container">
          <div class="news-home">
            <div class="news-home_background"></div>
            <div class="news-home_content">
              <div class="news-home_title">the blog</div>
            </div>
          </div>
        
          <div class="blog">
            <div class="blog-container">
              <div class="row-news">
        
                <div class="col-lg-88">
                  <div class="blog_post_container">
        
                    <div class="blog_post">
                      <div class="blog_post_image">
                        <img src="${b1}" alt="">
                          <div class="blog_post_date d-flex flex-column align-items-center justify-content-center">
                            <div class="blog_post_day">01</div>
                            <div class="blog_post_month">Dec, 2023</div>
                          </div>
                      </div>
                      <div class="blog_post_meta">
                        <ul>
                          <li class="blog_post_meta_item"><a href="">by Lore Papp</a></li>
                          <li class="blog_post_meta_item"><a href="">Uncategorized</a></li>
                          <li class="blog_post_meta_item"><a href="">3 Comments</a></li>
                        </ul>
                      </div>
                      <div class="blog_post_title">
                        <a href="#">Try these new dream destinations</a>
                      </div>
                      <div class="blog_post_text">
                        <p>Aenean in lacus ligula. Phasellus euismod gravida eros. Aenean nec ipsum aliquet, pharetra magna id, interdum sapien. Etiam id lorem eu nisl pellentesque semper. Nullam tincidunt metus placerat, suscipit leo ut, tempus nulla. Fusce at eleifend tellus. Ut eleifend dui nunc, non fermentum qua.</p>
                      </div>
                      <div class="blog_post_link"><a href="#">read more</a></div>
                    </div>
        
                    <div class="blog_post">
                      <div class="blog_post_image">
                        <img src="${b2}" alt="https://unsplash.com/@tschax">
                        <div class="blog_post_date d-flex flex-column align-items-center justify-content-center">
                          <div class="blog_post_day">01</div>
                          <div class="blog_post_month">Dec, 2023</div>
                        </div>
                      </div>
                      <div class="blog_post_meta">
                        <ul>
                          <li class="blog_post_meta_item"><a href="">by Lore Papp</a></li>
                          <li class="blog_post_meta_item"><a href="">Uncategorized</a></li>
                          <li class="blog_post_meta_item"><a href="">3 Comments</a></li>
                        </ul>
                      </div>
                      <div class="blog_post_title"><a href="#">Try these new dream destinations</a></div>
                      <div class="blog_post_text">
                        <p>Aenean in lacus ligula. Phasellus euismod gravida eros. Aenean nec ipsum aliquet, pharetra magna id, interdum sapien. Etiam id lorem eu nisl pellentesque semper. Nullam tincidunt metus placerat, suscipit leo ut, tempus nulla. Fusce at eleifend tellus. Ut eleifend dui nunc, non fermentum qua.</p>
                      </div>
                      <div class="blog_post_link"><a href="#">read more</a></div>
                    </div>
        
                    <div class="blog_post">
                      <div class="blog_post_image">
                        <img src="${b3}" alt="https://unsplash.com/@stilclassics">
                        <div class="blog_post_date d-flex flex-column align-items-center justify-content-center">
                          <div class="blog_post_day">01</div>
                          <div class="blog_post_month">Dec, 2023</div>
                        </div>
                      </div>
                      <div class="blog_post_meta">
                        <ul>
                          <li class="blog_post_meta_item"><a href="">by Lore Papp</a></li>
                          <li class="blog_post_meta_item"><a href="">Uncategorized</a></li>
                          <li class="blog_post_meta_item"><a href="">3 Comments</a></li>
                        </ul>
                      </div>
                      <div class="blog_post_title"><a href="#">Try these new dream destinations</a></div>
                      <div class="blog_post_text">
                        <p>Aenean in lacus ligula. Phasellus euismod gravida eros. Aenean nec ipsum aliquet, pharetra magna id, interdum sapien. Etiam id lorem eu nisl pellentesque semper. Nullam tincidunt metus placerat, suscipit leo ut, tempus nulla. Fusce at eleifend tellus. Ut eleifend dui nunc, non fermentum qua.</p>
                      </div>
                      <div class="blog_post_link"><a href="#">read more</a></div>
                    </div>
                  </div>
                  <div class="blog_navigation">
                    <ul>
                      <li class="blog_dot active"><div></div>01.</li>
                      <li class="blog_dot"><div></div>02.</li>
                      <li class="blog_dot"><div></div>03.</li>
                    </ul>
                  </div>
                </div>
        
                <div class="col-lg-44 sidebar_col">
        
                  <div class="sidebar_search">
                    <form action="#">
                      <input id="sidebar_search_input" type="search" class="sidebar_search_input" placeholder="" required="required">
                      <button id="sidebar_search_button" type="submit" class="sidebar_search_button trans_300" value="Submit">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="17px" height="17px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                          <g>
                            <g>
                              <g>
                                <path class="mag_glass" fill="#FFFFFF" d="M78.438,216.78c0,57.906,22.55,112.343,63.493,153.287c40.945,40.944,95.383,63.494,153.287,63.494
                              s112.344-22.55,153.287-63.494C489.451,329.123,512,274.686,512,216.78c0-57.904-22.549-112.342-63.494-153.286
                              C407.563,22.549,353.124,0,295.219,0c-57.904,0-112.342,22.549-153.287,63.494C100.988,104.438,78.439,158.876,78.438,216.78z
                              M119.804,216.78c0-96.725,78.69-175.416,175.415-175.416s175.418,78.691,175.418,175.416
                              c0,96.725-78.691,175.416-175.416,175.416C198.495,392.195,119.804,313.505,119.804,216.78z"></path>
                              </g>
                            </g>
                            <g>
                              <g>
                                <path class="mag_glass" fill="#FFFFFF" d="M6.057,505.942c4.038,4.039,9.332,6.058,14.625,6.058s10.587-2.019,14.625-6.058L171.268,369.98
                              c8.076-8.076,8.076-21.172,0-29.248c-8.076-8.078-21.172-8.078-29.249,0L6.057,476.693
                              C-2.019,484.77-2.019,497.865,6.057,505.942z"></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </button>
                    </form>
                  </div>

                  <div class="sidebar_archives">
                    <div class="sidebar_title">Archives</div>
                    <div class="sidebar_list">
                      <ul>
                        <li><a href="#">March 2023</a></li>
                        <li><a href="#">April 2023</a></li>
                        <li><a href="#">May 2023</a></li>
                      </ul>
                    </div>
                  </div>
        
                  <div class="sidebar_categories">
                    <div class="sidebar_title">Categories</div>
                    <div class="sidebar_list">
                      <ul>
                        <li><a href="#">Travel</a></li>
                        <li><a href="#">Exotic Destinations</a></li>
                        <li><a href="#">City Breaks</a></li>
                        <li><a href="#">Travel Tips</a></li>
                        <li><a href="#">Lifestyle &amp; Travel</a></li>
                        <li><a href="#">City Breaks</a></li>
                        <li><a href="#">Uncategorized</a></li>
                      </ul>
                    </div>
                  </div>

                  <div class="sidebar_latest_posts">
                    <div class="sidebar_title">Latest Posts</div>
                    <div class="latest_posts_container">
                      <ul>
                        <li class="latest_post clearfix">
                          <div class="latest_post_image">
                            <a href="#"><img src="${b4}" alt=""></a>
                          </div>
                          <div class="latest_post_content">
                            <div class="latest_post_title trans_200"><a href="#">A simple blog post</a></div>
                            <div class="latest_post_meta">
                              <div class="latest_post_author trans_200"><a href="#">by Jane Smith</a></div>
                              <div class="latest_post_date trans_200"><a href="#">Aug 25, 2023</a></div>
                            </div>
                          </div>
                        </li>
        
                        <li class="latest_post clearfix">
                          <div class="latest_post_image">
                            <a href="#"><img src="${b5}" alt=""></a>
                          </div>
                          <div class="latest_post_content">
                            <div class="latest_post_title trans_200"><a href="#">Dream destination for you</a></div>
                            <div class="latest_post_meta">
                              <div class="latest_post_author trans_200"><a href="#">by Jane Smith</a></div>
                              <div class="latest_post_date trans_200"><a href="#">Aug 25, 2023</a></div>
                            </div>
                          </div>
                        </li>
        
                        <li class="latest_post clearfix">
                          <div class="latest_post_image">
                            <a href="#"><img src="${b6}" alt=""></a>
                          </div>
                          <div class="latest_post_content">
                            <div class="latest_post_title trans_200"><a href="#">Tips to travel light</a></div>
                            <div class="latest_post_meta">
                              <div class="latest_post_author trans_200"><a href="#">by Jane Smith</a></div>
                              <div class="latest_post_date trans_200"><a href="#">Aug 25, 2023</a></div>
                            </div>
                          </div>
                        </li>

                        <li class="latest_post clearfix">
                          <div class="latest_post_image">
                            <a href="#"><img src="${b7}" alt=""></a>
                          </div>
                          <div class="latest_post_content">
                            <div class="latest_post_title trans_200"><a href="#">How to pick your vacation</a></div>
                            <div class="latest_post_meta">
                              <div class="latest_post_author trans_200"><a href="#">by Jane Smith</a></div>
                              <div class="latest_post_date trans_200"><a href="#">Aug 25, 2023</a></div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
        
                  <div class="sidebar_gallery">
                    <div class="sidebar_title">Instagram</div>
                    <div class="gallery_container">
                      <ul class="gallery_items d-flex flex-row align-items-start justify-content-between flex-wrap">
                        <li class="gallery_item">
                          <a class="colorbox cboxElement" href="">
                            <img src="${b8}" alt="">
                          </a>
                        </li>
                        <li class="gallery_item">
                          <a class="colorbox cboxElement" href="">
                            <img src="${b9}" alt="">
                          </a>
                        </li>
                        <li class="gallery_item">
                          <a class="colorbox cboxElement" href="">
                            <img src="${b10}" alt="">
                          </a>
                        </li>
                        <li class="gallery_item">
                          <a class="colorbox cboxElement" href="">
                            <img src="${b11}" alt="">
                          </a>
                        </li>
                        <li class="gallery_item">
                          <a class="colorbox cboxElement" href="">
                            <img src="${b12}" alt="">
                          </a>
                        </li>
                        <li class="gallery_item">
                          <a class="colorbox cboxElement" href="">
                            <img src="${b13}" alt="">
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;
    bodyContainer.innerHTML = content;
  }
}

export default News;
