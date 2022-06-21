
    // Accordion 
    function myAccFunc() {
      var x = document.getElementById("demoAcc");
      if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
      } else {
        x.className = x.className.replace(" w3-show", "");
      }
    }
    function myAccFunc() {
      var x = document.getElementById("demoAcc_2");
      if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
      } else {
        x.className = x.className.replace(" w3-show", "");
      }
    }

    // Click on the "Jeans" link on page load to open the accordion for demo purposes
  
    
    
    // Open and close sidebar
    function func_open() {
      document.getElementById("mySidebar").style.display = "block";
      document.getElementById("myOverlay").style.display = "block";
    }
     
    function func_close() {
      document.getElementById("mySidebar").style.display = "none";
      document.getElementById("myOverlay").style.display = "none";
    }

    function loadHome(){
      fetch("http://localhost:3000/homepage.html")
      .then(function(response){
          return response.text()
      })
      .then(function(html){
          document.getElementById("renderPage").innerHTML=html;
      });
  }
  
  function loadLogin(){
      fetch("http://localhost:3000/login.html")
      .then(function(response){
          return response.text()
      })
      .then(function(html){
          document.getElementById("renderPage").innerHTML=html;
      });

    }
    
    function loadRegister(){
      fetch("http://localhost:3000/register.html")
      .then(function(response){
          return response.text()
      })
      .then(function(html){
          document.getElementById("renderPage").innerHTML=html;
      });

    }

    function loadmangerpage(){
      fetch("http://localhost:3000/mangerpage.html")
      .then(function(response){
          return response.text()
      })
      .then(function(html){
          document.getElementById("renderPage").innerHTML=html;
      });

    }

    function loadOrders(){
      fetch("http://localhost:3000/orderspage.html")
      .then(function(response){
          return response.text()
      })
      .then(function(html){
          document.getElementById("renderPage").innerHTML=html;
      });

    }

  
    function createDiv(data,category)
    { 
     var ourDiv=document.getElementById("theDiv");
     theHtml=`<div></div>`
        data.forEach(product => {if ((product.category==category || category==null )&& product.quantity!= 0 ) {
        
        newHtml=`<div class="w3-col l3 s6" style="background-color: white;">
        <div class="w3-display-container">
          <img id="boards" src="${product.img}">
          <span class="w3-tag w3-display-topleft">New</span>
          <div class="w3-display-middle w3-display-hover">
          <button class="w3-button w3-black" onclick="NewOrder('${product.model}')" >Buy now <i class="fa fa-shopping-cart" ></i></button>
          </div>
        </div>
        <p>${product.model}<br><b>${product.price}</b><b><br><lable>Unit in stock: </lable>${product.quantity}</b></p>
      </div>`   
      theHtml+=newHtml

        } else {
          newHtml=`<div class="w3-col l3 s6" style="background-color: white;">
        <div class="w3-display-container">
          <img id="boards" src="${product.img}">
          <span class="w3-tag w3-display-topleft">New</span>
          <div class="w3-display-middle w3-display-hover">
          </div>
        </div>
        <p>${product.model}<br><b>${product.price}</b><b><br><lable>Unit in stock: </lable>${product.quantity}</b></p>
      </div>`   
      theHtml+=newHtml
        }
     });   
     ourDiv.innerHTML=theHtml
    }
//--------------------- products div
  function createTable(data)
  { 
   var ourTable=document.getElementById("theTable");
   theHTML="<tr><th>שם מוצר </th><th>מחיר</th><th>כמות</th><th>קטגוריה</th></tr>"
      data.forEach(product => {
      newHtml=`<tr><td>${product.product_name}</td><td>${product.product_price}</td><td>${product.Quantity}</td><td>${product.Category}</td></tr>`   
      theHTML+=newHtml
 
   });   
   ourTable.innerHTML=theHTML
  }
function getProducts(category)
{
  fetch(`/getproducts`, {
  method: 'GET',   
  })
  .then(response =>response.json())
  .then(data => {
  createDiv(data,category);
  })
  .catch((error) => {
  console.error('Error:', error);
  });

}
//---------------- orders table
function getOrders()
{
  fetch(`/getorders`, {
  method: 'GET',   
  })
  .then(response =>response.json())
  .then(data => {
    createOrdersTable(data);
  })
  .catch((error) => {
  console.error('Error:', error);
  });

}


function createOrdersTable(data)
{ 
 var ourTable=document.getElementById("orderTable");
 theHTML="<tr><th>Order ID</th><th>Productmodel</th><th>Customer_name</th><th>shiping_addres</th><th>phone_number</th><th>Email</th><th>card_number</th><th>Cvv</th><th>Expire</th><th>Status</th><th>Button</th></tr>"
    data.forEach(order => {
    newHtml=`<tr><td>${order._id}</td><td>${order.Productmodel}
    </td><td>${order.Customer_name}</td>
    <td>${order.shiping_addres}</td><td>${order.phone_number}</td>
    <td>${order.Email}</td><td>${order.card_number}</td>
    <td>${order.Cvv}</td><td>${order.Expire}</td><td>${order.Status}</td><td><button type="button" onclick= "updateStatus('${order._id}')">Supplied </button></td></tr>`   
    theHTML+=newHtml

 });   
 ourTable.innerHTML=theHTML
}


function NewOrder(model){
  fetch("http://localhost:3000/neworder.html")
  .then(function(response){
      return response.text()
  })
  .then(function(html){
      document.getElementById("renderPage").innerHTML=html;
      document.getElementById("productmodel").innerHTML=model;
  });
}


function updateStatus(_id){
  console.log('step 1:  '+_id)
  fetch(`/updateStatus`, {
    method: 'POST',
    body: JSON.stringify("HEllo world!")
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

// function updateStatus(_id){
//   console.log('step 1:  '+_id) 
//   fetch(`/updateStatus`)
//                 .then(response => response.text())
//                 .then(data => {
//                     var pizzaTypes = JSON.parse(data);
//                     var myTables = "";
//                     pizzaTypes.forEach(element => {
