
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
    document.getElementById("myBtn").click();
    
    
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
function getProducts()
{
  fetch(`/getproducts`, {
  method: 'GET',   
  })
  .then(response =>response.json())
  .then(data => {
  createTable(data);
  })
  .catch((error) => {
  console.error('Error:', error);
  });

}

    // Show div html based on rolle
 
 if (HelpCenter.user.rolle=="manager"){
  $("div.manager").show();
 }
