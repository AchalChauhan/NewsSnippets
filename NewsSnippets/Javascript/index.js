const categories = ['sports', 'sharemarket', 'business', 'politics', 'India', 'IT', 'computers', 'Banking', 'economics', 'entrepreneurship', 'innovation', 'currentaffairs', 'medicine', 'food', 'lifestye', 'athletics', 'football', 'cricket', 'trade', 'tourism'];

async function getDatafromAPI(keyword){
    try {
      // 7c3824a021874f1cae10d6f4f5d880de api key
        const rawAPIData = await fetch(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=21a9cd7ccddd427abb71f29db04ea7a1`);
        const formatedAPIData = (await rawAPIData).json();
        return formatedAPIData;
    } catch (error) {
       await alert('Free API');
        await alert('Limit Exeded');
        await console.error(error, "---------------------");
        console.log("Error!, couldn't find the data");
    }
}

const createTopheading = async ()=>{
    const topnewsContainer = document.getElementById('topnewsContainer');
    topnewsContainer.innerHTML = `
    <div id="carouselTopNew" class="carousel slide" >
  <div class="carousel-indicators" id="carousel-indicators-topNews">
  </div>
  <div class="carousel-inner" id="topNewsCarousel">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselTopNew" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselTopNew" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
`;
    
    const keyword = 'India';
    const data = await getDatafromAPI('India');
    for(let i=1; i<6; i++){
        createCarouselforTopNews(data.articles[i], i);
    }
    setInterval(() => {
        nextSlide();
    }, 3000);
}

const createCarouselforTopNews= (paramData, index)=>{
    const carouslIndicators = document.getElementById('carousel-indicators-topNews');
    const carouselInner = document.getElementById('topNewsCarousel');

    // Adding carousl-Indicators of topnews;
    carouslIndicators.innerHTML += `
    <button type="button" data-bs-target="#carouselTopNew" data-bs-slide-to="${index}" aria-label="Slide ${index}"  ${index === 2 ? 'class="active"' : ''} ></button>
    `;

    //adding carousl-inner items of topnews
    carouselInner.innerHTML += `
    <div class="carousel-item ${index === 2 ? 'active' : ''}">
    <div class="card" id="cardElement" width: 18rem">
    <div id="imageContainer">
    <a href="${paramData.url}" target="_blank">
    <img src="${paramData.urlToImage}" class="d-block w-100 card-img-top" id ="userImage" alt="${index}">
    </a>
            </div>
            <div class="card-body topcardbody">
              <h5 class="card-title">${paramData.title}</h5>
              <p class="cardtext">
                ${paramData.description}
              </p>
              <div id="tabs">
              <span id="newsSource">newsSource: ${paramData.source.name}</span>
              <span id="author">author: ${paramData.author}</span>
              </div>
            </div>
        </div>
    </div>
          `;
} 

//auto play carousel;
let currentSlide =0;
const nextSlide = async () => {
    const carousel = await document.getElementById('carouselTopNew');
    const totalSlides = await carousel.querySelectorAll('.carousel-item').length;
    currentSlide = (currentSlide + 1) % totalSlides;
    carousel.querySelector('.active').classList.remove('active');
    carousel.querySelector(`.carousel-item:nth-child(${currentSlide + 1})`).classList.add('active');
};


const createAccordiansTemplate = async()=>{
    const accordianContainer = document.getElementById('accordianContainer');
    accordianContainer.innerHTML =  `
    <div class="accordion accordion-flush" id="accordionFlushExample">
    </div>
    `;
    for(let i=0; i<categories.length; i++){
      const data = await getDatafromAPI(categories[i]);
      document.getElementById('accordionFlushExample').innerHTML += `
      <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapse${i}">
        ${categories[i].toUpperCase()}
        </button>
      </h2>
      <div id="flush-collapse${i}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body" id="accoridn-${i}">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
      </div>
    </div>
      `;
      createCarousel(data.articles, i);
    }

}

const createCarousel = (paramData, paramID)=>{
  const accordionBody = document.getElementById(`accoridn-${paramID}`);
  accordionBody.innerHTML = `
<div id="carouselExampleIndicators${paramID}" class="carousel slide">
<div class="carousel-indicators" id="carousel-indicators${paramID}">
</div>
<div class="carousel-inner" id="carouselInner${paramID}">
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators${paramID}" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators${paramID}" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>`;
  createCarouselInnerElements(paramData, paramID)
}
const createCarouselInnerElements =(paramData, paramID)=>{
  const carouselInnerElement =document.getElementById('carouselInner' + paramID);
  const carouselIndicators = document.getElementById(`carousel-indicators${paramID}`);
  for(let i=0; i<paramData.length; i++){
      const imageDiv = document.createElement('div');
      imageDiv.className = 'carousel-item';
      if (i === 0) {
        imageDiv.className += ' active';
        carouselIndicators.innerHTML += `
        <button type="button" data-bs-target="#carouselExampleIndicators${paramID}" data-bs-slide-to="${0}" class="active" aria-current="true" aria-label="Slide 1"></button>
        `;
      }
      carouselIndicators.innerHTML += `
      <button type="button" data-bs-target="#carouselExampleIndicators${paramID}" data-bs-slide-to="${i}" aria-label="Slide ${i}"></button>
      `;
      
      imageDiv.innerHTML = `
      <div class="card">
      <img src="${paramData[i].urlToImage}" ${paramData[i].urlToImage ? 'style="none"' : ''}class="card-img-top " alt="Card Image">
      <div class="card-body" style="margin-bottom:2rem">
      <h5 class="card-title cardHeading">${paramData[i].title}</h5>
        <a href="${paramData[i].source}" style="text-decoration: none">Go to the artical</a>
        <div class="author" ${paramData[i].author ? 'style="none"' : ''} >${paramData[i].author}</div>
        <p class="card-text" ${paramData[i].description ? 'style="none"' : ''} >${paramData[i].description}</p>
      </div>
      `;
      carouselInnerElement.append(imageDiv)
  }
}









// const createCarouselCards = ()=>{

// }



const init = ()=>{
    createTopheading();
    createAccordiansTemplate();
}
init();