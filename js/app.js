const loadFetch = () => {
    loader(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayTools(data.data.tools));
};



const displayTools = (tools) => {
    // console.log(tools);

    
    const allCardContainer = document.getElementById('allCardContainer');
    allCardContainer.innerHTML = '';
    const SeeMoreBtn = document.getElementById('SeeMoreBtn');
    if(tools.length > 6){
        SeeMoreBtn.classList.remove('d-none');
        tools = tools.slice(0, 6);
    }
    else{
        SeeMoreBtn.classList.add('d-none');
    }
    ;
    

    tools.forEach(tool => {
        // console.log(tool);
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-lg-4', 'col-sm-12');
        colDiv.innerHTML = `
        
        <div class="card p-2 mt-4">
            <img src="${tool.image}" class="card-img-top img-fluid rounded responsive_mb" style="height: 210px;  " alt="...">
            <div class="card-body">
                <h4 class="card-title">Features</h4>
                <ol>
                <li>${tool.features[0]}</li>
                <li>${tool.features[1]}</li>
                <li>${tool.features[2]}</li>
                </ol>
                <hr>
                <div class="btn-ftr d-flex align-items-center justify-content-between">
                <div class="card_name">
                    <h3>${tool.name}</h3>
                    <p><i class="fa-solid fa-calendar-days text-danger"></i> <span id="sortDate">${tool.published_in}</span></p>
                    </div>
                    <div class="card_btn">
                    <button onclick="ModalDetailsFetch('${tool.id}', '${tool.features}')" class="btn border-0" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-right-long text-danger fs-5"></i></button>
                    </div>
                </div>
            </div>
        </div>
        `
        allCardContainer.appendChild(colDiv);
    });
    loader(false);

};

const ModalDetailsFetch = (id, features) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayModalDetails(data.data, features));
};

const displayModalDetails = (toolDetails, features) => {
    // console.log(toolDetails.image_link[0]);
    document.getElementById('AiDescription').innerHTML = toolDetails.description;
    document.getElementById('accurancy').innerText = toolDetails.accuracy.score;
    const aiModalImgBody = document.getElementById('aiModalImgBody');
    aiModalImgBody.innerHTML = `<img src="${toolDetails.image_link[0]}" class="card-img-top img-fluid rounded" alt="...">`
    // input_output_examples array 
    toolDetails.input_output_examples.forEach(input_output => {
        document.getElementById('modalAiTitle').innerHTML = input_output.input ? input_output.input : 'No data found';
        document.getElementById('modalAiDescription').innerHTML = input_output.output ? input_output.output : 'No data found';
    });
    // console.log(toolDetails.features);
    // Features
    
    const total =  Object.entries(toolDetails.features)
    
    const FeaturesContainer = document.getElementById('FeaturesContainer');
    FeaturesContainer.innerHTML = '';
      total.forEach(toolDetail => {
        // console.log(toolDetail[1].feature_name);
        const ftrLi = document.createElement('li')
        ftrLi.innerHTML = `
        <li>${toolDetail[1].feature_name}</li>
        `;
        FeaturesContainer.appendChild(ftrLi);
      });



    /* FeaturesContainer.innerHTML = `
    <li>${features}</li>
    <li>${features}</li>
    <li>${features}</li>
    `; */

    const IntegrationsContainer = document.getElementById('IntegrationsContainer');
    IntegrationsContainer.innerHTML = '';
    // integration array 
    toolDetails.integrations.forEach(integration => {
        // console.log(integration);
        const intLi = document.createElement('li')
        intLi.innerHTML = `
        <li>${integration}</li>
        `;
        IntegrationsContainer.appendChild(intLi);
    });

    const pricingContainer = document.getElementById('pricingContainer');
    pricingContainer.innerHTML = '';
    // Pricing array 
    toolDetails.pricing.forEach(pricePlan => {
        const colPDiv = document.createElement('div');
        colPDiv.classList.add('col-lg-3', 'bg-white', 'py-5', 'm-3', 'rounded');
        colPDiv.innerHTML = `<h5 class="text-center text-danger">${pricePlan.plan ? pricePlan.plan : 'no data'}<br><span>${pricePlan.price ? pricePlan.price : 'no data'}</span></h5>`;
        pricingContainer.appendChild(colPDiv);
    })

};

document.getElementById('SeeMoreBtn').addEventListener('click', function(){
    loader(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayShowAll(data.data.tools));
})

const displayShowAll = (tol) => {
    const allCardContainer = document.getElementById('allCardContainer');
    tol = tol.slice(6, 12);

    // console.log(tol);
    tol.forEach(toe => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-lg-4', 'col-sm-12');
        colDiv.innerHTML = `
        
        <div class="card p-2 mt-4">
            <img src="${toe.image}" class="card-img-top img-fluid rounded responsive_mb" style="height: 210px;  " alt="...">
            <div class="card-body">
                <h4 class="card-title">Features</h4>
                <ol>
                <li>${toe.features[0]}</li>
                <li>${toe.features[1]}</li>
                <li>${toe.features[2]}</li>
                </ol>
                <hr>
                <div class="btn-ftr d-flex align-items-center justify-content-between">
                <div class="card_name">
                    <h3>${toe.name}</h3>
                    <p><i class="fa-solid fa-calendar-days text-danger"></i> ${toe.published_in}</p>
                    </div>
                    <div class="card_btn">
                    <button onclick="ModalDetailsFetch('${toe.id}', '${toe.features}')" class="btn border-0" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-right-long text-danger fs-5"></i></button>
                    </div>
                </div>
            </div>
        </div>
        `
        allCardContainer.appendChild(colDiv);
    })
    loader(false);
}


// spinner 
const loader = (isLoad) =>{
    const loader = document.getElementById('loader');
    if(isLoad){
        loader.classList.remove('displayNone');
    }
    else{
        loader.classList.add('displayNone');
    }
}


// sortDate
const sortDate = () => {
    const sortDate = document.getElementById('sortDate');
    sortDate.innerText = '1/11/2022';
}


loadFetch()