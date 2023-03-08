const loadphones = async(searchText,dataLimit1) =>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayphones (data.data, dataLimit1);
}

const displayphones = (phones, dataLimit1) =>{
    const phonescontainer = document.getElementById('phone-container');
    phonescontainer.textContent='';
    // display 10 phone only
    const showAll = document.getElementById('show-all');
    // console.log(dataLimit1,phones.length);
    if (dataLimit1 && phones.length>10) {
      phones=phones.slice(0,10);
      showAll.classList.remove('d-none');
    } else {
      showAll.classList.add('d-none');
    }
    // display no phone found

    const noPhone =document.getElementById('no-found -massaege');
    if (phones.length==0) 
    {
      noPhone.classList.remove('d-none')  
    } else { 
      noPhone.classList.add('d-none')
    }
   
    // display all phone
    phones.forEach(singlephone => {
      const phoneDiv = document.createElement('div');
      phoneDiv.classList.add('col');
      phoneDiv.innerHTML=
      
    `
    <div class="card p-3">
              <img src="${singlephone.image}" class="card-img-
              top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${singlephone.phone_name}
                </h5>
                <p class="card-text">${singlephone.slug}</p>
                <btn onclick 
                ="loadPhoneDetails('${singlephone.slug}')" 
                href="#" class="btn btn-primary"data-bs-toggle="modal" data-bs-target="#phoneDetailModal">show       
                Details</btn>
                </div>
                </div>
    ` 
    phonescontainer.appendChild(phoneDiv); 
    });

    //stop loading
    togglespiner(false); 
}

const processSearch = (dataLimit1)=>{

  togglespiner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadphones(searchText,dataLimit1);
  
}


// Handle search button click
document.getElementById('btn-search').addEventListener('click',function () {
  //  start loading
    processSearch(10);
   

 })

 document.getElementById('search-field'). addEventListener('keypress',function (e) {
  
  if (e.key ==='Enter') {
    processSearch(10);
  }
 })

 const togglespiner =isloading =>{
      const loaderSection =document.getElementById('loader');
      if (isloading) {
        loaderSection.classList.remove('d-none')
      } else {
        loaderSection.classList.add('d-none')
      }
 }
// not the Best way to load show all 
 document.getElementById('btn-show-all').addEventListener('click',function () {
    processSearch();  
 })

 const loadPhoneDetails = async(id) =>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);

 }
// phone Details
 const displayPhoneDetails = phones =>{
    console.log(phones);
    const 
    modalTitle=document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText=phones.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML=`
    <p>Release Date:${phones.releaseDate ? phones.releaseDate :'no Release date found'
      }</p>
    <p>storages
    :${phones.mainFeatures.memory
      ? phones.mainFeatures.memory
      :'no mainFeatures memory are found'
      }</p>`

    
 }

//  loadphones();