// adding spinner
const toggleSpinner = displayStyle => {
    document.getElementById("spinner").style.display = displayStyle;
}
// load phone from api
const loadPhones = () => {
    const inputField = document.getElementById("input-field");
    const searchText = inputField.value;

    toggleSpinner("block");
    
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
                        <button onclick="loadDetails('${phone.slug}')" class="btn btn-info text-white">Details</button>
                    </div>
                </div>
            `;
            phoneContainer.appendChild(div);
       })
    }
    toggleSpinner("none");
    
}

// load phone details
const loadDetails = phoneId => {
    
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}

// display phone details
const displayDetails = details => {
    const phoneDetails = document.getElementById("phone-details");
    phoneDetails.textContent = '';

    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card mx-auto" style="width: 28rem;">
                <img src="${details.image}" class="card-img-top h-25" alt="..."> 
            <div class="card-body">
                <h5 class="card-title">Name: ${details.name}</h5>
                <h6 class="card-title">Release-Date: ${details.releaseDate == '' ? "Coming Soon" : details.releaseDate}</h6>
                <br>
                <h5>Main Features</h5>
                <p>ChipSet: ${details.mainFeatures.chipSet}</p>
                <p>Display: ${details.mainFeatures.displaySize}</p>
                <p>Memory: ${details.mainFeatures.memory}</p>
                <p>Storage: ${details.mainFeatures.storage}</p>
                <p>Sensors: ${details.mainFeatures.sensors}</p>
                <h5>Others Features</h5>
                <p>Wlan: ${details?.others?.WLAN == undefined ? "No data found" : details.others.WLAN}</p>
                <p>Bluetooth: ${details?.others?.Bluetooth == undefined ? "No data found" : details.others.Bluetooth}</p>
                <p>Radio: ${details?.others?.Radio == undefined ? "No data found" : details.others.Radio}</p>
                <p>GPS: ${details?.others?.GPS == undefined ? "No data found" : details.others.GPS}</p>
                <p>USB: ${details?.others?.USB == undefined ? "No data found" : details.others.USB}</p>
            </div>
        </div>
    `;
    phoneDetails.appendChild(div);
}
