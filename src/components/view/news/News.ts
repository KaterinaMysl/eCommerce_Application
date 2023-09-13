import './News.css';

class News {
  draw() {
    const bodyContainer = document.querySelector('.main') as HTMLElement;
    const content = `
        <div class="news">
          <div class="title-news">About</div>
          <div class="content-news">
            <div>news</div>
            <div>news</div>
            <div>news</div>
            <div>news</div>
            <div>news</div>
            <div>news</div>
            <div>news</div>
            <div>news</div>
            <div>news</div>
            <div>news</div>
          </div>
        </div>
        
    `;
    bodyContainer.innerHTML = content;
  }
}

export default News;
