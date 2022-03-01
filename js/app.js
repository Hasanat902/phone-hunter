const loadPhones = () => {
    const searchText = document.getElementById("input-field").value;
    
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.data))
}