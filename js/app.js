// load phone from api
const loadPhones = () => {
    const inputField = document.getElementById("input-field");
    const searchText = inputField.value;
    
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data))

    inputField.value = '';
}

// display phone from api
const displayPhones = phones => {
    
    const phoneContainer = document.getElementById("phone");
    phoneContainer.textContent = '';
    const showTwentyPhone = phones.slice(0,20);
        
    if(showTwentyPhone == ''){
        alert("Phone not found");
    }
    else{
        showTwentyPhone.forEach(phone => {
            const div = document.createElement("div");
            div.classList.add("col-lg-4");
            div.classList.add("gy-5");
            div.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${phone.image}" class="card-img-top h-50" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Name: ${phone.phone_name}</h5>
                        <h6 class="card-title">Brand: ${phone.brand}</h6>
                        <button onclick="loadDetails('${phone.slug}')" class="btn btn-primary">Details</button>
                    </div>
                </div>
            `;
            phoneContainer.appendChild(div);
       })
    }
    
}

// load phone details
const loadDetails = phoneId => {
    
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.data))
}
