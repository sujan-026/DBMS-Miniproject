
document.addEventListener('DOMContentLoaded', function() {
    const addCountryForm = document.getElementById('addCountryForm');
    const countryTableBody = document.getElementById('countryTableBody');
    const addProductForm = document.getElementById('addProductForm');
    const productTableBody = document.getElementById('productTableBody');
    const addAmountForm = document.getElementById('addAmountForm');
  
    let countries = [];
    let products = [];
  
    // Function to render countries in the table
    function renderCountries() {
      countryTableBody.innerHTML = '';
      countries.forEach(country => {
        const tr = document.createElement('tr');
        tr.innerHTML = 
          `<td>${country.name}</td>
          <td><img src="${country.flag}" alt="${country.name} flag" class="country-flag"></td>
          <td><button onclick="deleteCountry(${country.id})">Delete</button></td>`;
        countryTableBody.appendChild(tr);
      });
    }
  
    // Function to render products in the table
    function renderProducts() {
      productTableBody.innerHTML = '';
      products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = 
          `<td>${product.name}</td>
          <td><button onclick="deleteProduct(${product.id})">Delete</button></td>`
        ;
        productTableBody.appendChild(tr);
      });
    }
  
    // Function to add a new country
    addCountryForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const countryName = document.getElementById('countryName').value.trim();
      const countryFlag = document.getElementById('countryFlag').value.trim();
      if (countryName && countryFlag) {
        const newCountry = {
          id: countries.length + 1,
          name: countryName,
          flag: countryFlag
        };
        countries.push(newCountry);
        renderCountries();
        addCountryForm.reset();
      } else {
        alert('Please enter country name and flag URL');
      }
    });
  
    // Function to add a new product
    addProductForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const productName = document.getElementById('productName').value.trim();
      if (productName) {
        const newProduct = {
          id: products.length + 1,
          name: productName
        };
        products.push(newProduct);
        renderProducts();
        addProductForm.reset();
      } else {
        alert('Please enter product name');
      }
    });
  
    // Function to add import/export amounts
    addAmountForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const amountCountry = document.getElementById('amountCountry').value.trim();
      const importAmount = document.getElementById('importAmount').value.trim();
      const exportAmount = document.getElementById('exportAmount').value.trim();
      if (amountCountry && importAmount && exportAmount) {
        // Perform actions with amounts (not implemented in this basic example)
        alert("Import amount for ${amountCountry}: ${importAmount}\nExport amount for ${amountCountry}: ${exportAmount}");
        addAmountForm.reset();
      } else {
        alert('Please fill in all fields');
      }
    });
  
    // Function to delete a country
    window.deleteCountry = function(id) {
      countries = countries.filter(country => country.id !== id);
      renderCountries();
    };
  
    // Function to delete a product
    window.deleteProduct = function(id) {
      products = products.filter(product => product.id !== id);
      renderProducts();
    };
  });
