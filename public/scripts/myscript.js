
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
 theHTML="<tr><th>Order ID</th><th>Customer</th><th>order date</th><th>delivery date</th><th>shipp_adress</th></tr>"
    data.forEach(order => {
    newHtml=`<tr><td>${order._id}</td><td>${order.customer_id}
    </td><td>${order.order_date_time}</td><td>${order.delivery_date_time}</td><td>${order.shipp_adress}</td></tr>`   
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