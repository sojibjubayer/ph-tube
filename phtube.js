
// feth category
const handleCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();

  const tabContainer = document.getElementById("tab-container");

  const categories = data.data

  categories.forEach((category) => {

    const div = document.createElement("div");
    div.innerHTML = `
          
          <button onclick="handleLoadVideos('${category.category_id}'
          )" class="bg-gray-200 rounded py-2 px-3 text-base">${category.category}</button>
          `;
    tabContainer.appendChild(div);
  });
};


let sortVar = null

//handle card container
const handleLoadVideos = async (categoryId) => {
  
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();
  const cardData = data.data
  loadData(cardData)


  cardData.sort((a, b) => {
    const viewsA = parseInt(a.others.views, 10) * (a.others.views.endsWith('k') ? 1000 : 1);
    const viewsB = parseInt(b.others.views, 10) * (b.others.views.endsWith('k') ? 1000 : 1);
    return viewsB - viewsA;
  });

  sortVar=cardData
  

}


// SORTING FETCHING

function sortingVideo(){

loadData(sortVar)
    
  }
  
 

function loadData(cardData) {
  

  //Empty data part
  const emptyData = document.getElementById('empty-data')
  emptyData.innerHTML = ''
  const emptydata = () => {
    const div = document.createElement("div");
    div.innerHTML = `<div>
                        <img src='./images/icon.png'>
                        <h2 class="text-center mt-4 text-red-500">AWE! There is no data available! </h2>
                      </div>`;
    emptyData.appendChild(div)
  }
  if (cardData.length === 0) {
    emptydata()
  }

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  cardData.forEach((videos) => {
    // console.log(videos.others.views)
    const totalSeconds = videos.others.posted_date
    //Method to Time conversion
    function secondsToHoursMinutes(seconds) {
      const hours = Math.floor(seconds / 3600); //  seconds to hour
      const minutes = Math.floor((seconds % 3600) / 60); // rest seconds to minute

      return { hours, minutes };
    }
    const { hours, minutes } = secondsToHoursMinutes(totalSeconds);


    const div = document.createElement("div");
    div.innerHTML = `
          <div class="card  bg-gray-100 ">
          <div class="relative">
            <img
              src=${videos?.thumbnail} class="w-full h-[200px] rounded-xl relative" />
            <p class=""> ${totalSeconds ? `<p class="-mt-10 end-px absolute text-xs text-white bg-black p-2 rounded">${hours}hrs ${minutes} min ago</p>` : ''}   </p>
          </div>

          <!-- Card body -->
          <div class="my-6">
            <div class="flex gap-4">
            <img src=${videos.authors[0].profile_picture} class="w-[50px] h-[50px] rounded-full "  />
            
            <div>
            <h2 class="card-title text-base font-bold ">
             ${videos.title}
            </h2>
            <div class="flex gap-2">
              <p class="text-sm mt-3"> ${videos.authors[0].profile_name}   </p>
              <p class="text-sm mt-3"> ${videos.authors[0].verified ? `<img src="./images/verified.svg">` : ''}   </p>
              </div>
              <p class="text-sm mt-3"> ${videos.others.views}   </p>
            </div>
            </div>

           
          </div>
        </div>
          
          `;

    cardContainer.appendChild(div);
  });
};


handleCategory()
handleLoadVideos(1000)
