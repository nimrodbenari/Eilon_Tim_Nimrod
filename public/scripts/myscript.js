
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
      fetch("/homepage.html")
      .then(function(response){
          return response.text()
      })
      .then(function(html){
          document.getElementById("renderPage").innerHTML=html;
      });
  }
  
  function loadLogin(){
      fetch("/login.html")
      .then(function(response){
          return response.text()
      })
      .then(function(html){
          document.getElementById("renderPage").innerHTML=html;
      });

    }
    
    function loadRegister(){
      fetch("/register.html")
      .then(function(response){
          return response.text()
      })
      .then(function(html){
          document.getElementById("renderPage").innerHTML=html;
      });

    }

    function loadmangerpage(){
      fetch("/mangerpage.html")
      .then(function(response){
          return response.text()
      })
      .then(function(html){
          document.getElementById("renderPage").innerHTML=html;
      });

    }

    function loadOrders(){
      fetch("/orderspage.html")
      .then(function(response){
          return response.text()
      })
      .then(function(html){
          document.getElementById("renderPage").innerHTML=html;
      }).then(getOrders());

    }

    function createOrderDiv(){ 
    var img = sessionStorage.getItem('img');
    var price = sessionStorage.getItem('price');
    var model = sessionStorage.getItem('model');
    var ourDiv=document.getElementById("orderdisplay");
     newHtml=`<div class="w3-col l3 s6" style="background-color: white;">
     <div class="w3-display-container">
       <img id="boards" src="${img}">
       <div class="w3-display-middle w3-display-hover">
        </div>
        </div>
        <p 
        >${model}<br><b>${price}</b></p>
        </div>`   
     ourDiv.innerHTML=newHtml;
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
                <button class="w3-button w3-black" onclick="NewOrder('${product.price}|${product.model}|${product.img}')" >Buy now <i class="fa fa-shopping-cart" ></i></button>
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
      newHtml=`<tr>
      <td>${product.product_name}</td>
      <td>${product.product_price}</td>
      <td>${product.Quantity}</td>
      <td>${product.Category}</td></tr>`   
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
 theHTML="<tr><th>Order ID</th><th>Productmodel</th><th>Quantity</th><th>Customer name</th><th>shiping addres</th><th>phone number</th><th>Email</th><th>Status</th><th>order date</th><th>delivery date</th></tr>"
    data.forEach(order => {
    newHtml=`<tr><td>${order._id}</td><td>${order.productmodel}</td>
    <td>${order.quantity}</td>
    <td>${order.customername}</td>
    <td>${order.shipingaddres}</td>
    <td>${order.phone_number}</td>
    <td>${order.email}</td>
    <td>${order.status}</td> 
    <td>${order.orderdate}</td>  
    <td>${order.deliverDate}</td></tr>`   
    theHTML+=newHtml

 });   
 ourTable.innerHTML=theHTML
}


function NewOrder(data){
  let array = data.split('|')
  fetch("/neworder.html")
  .then(function(response){
      return response.text()
  })
  .then(function(html){
      document.getElementById("renderPage").innerHTML=html;
  }).then(
    sessionStorage.setItem('price',array[0]),
    sessionStorage.setItem('model',array[1]),
    sessionStorage.setItem('img',array[2])
    );
    
}
function orderDetails() {
  var customername = document.getElementById("customername").value;
  var quantity = document.getElementById("quantity").value;
  var shipingaddres = document.getElementById("shipingaddres").value;
  var phonenumber = document.getElementById("phonenumber").value;
  var email = document.getElementById("email").value;
  var cardnumber = document.getElementById("cardnumber").value;
  var cvv = document.getElementById("cvv").value;
  var expire = document.getElementById("expire").value;
  var productmodel = sessionStorage.getItem('model');
  var status = 'on-process'
  var date = Date(Date.now()).toString()
  

  const order = {
    'customername':customername,
    'quantity':quantity,
    'shipingaddres':shipingaddres,
    'email':email,
    'phonenumber':phonenumber,
    'cardnumber':cardnumber,
    'cvv':cvv,
    'expire':expire,
    'cvv':cvv,
    'status':status,
    'productmodel':productmodel,
    'status': status,
    'orderdate': date,
    'deliverDate': ' '

  };
  
  fetch("/neworder",{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(order)
})
.then(function(res){ console.log(res) })
.catch(function(res){ console.log(res) });

sendMessage();
sessionStorage.clear();
alert('Your order has been successfully saved');

}

function userDetails() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value;
  var rolle = 'customer'

  const user = {
    'username':username,
    'password':password,
    'email':email,
    'rolle':rolle,
  };
  
  fetch("/register",{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(user)
})
.then(function(res){ console.log(res) })
.catch(function(res){ console.log(res) })

}

async function  loginUser() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  const user = {'username':username,'password':password};
  const response = await fetch("/login",{
                                headers: {
                                  'Content-Type': 'application/json'
                                },
                                redirect: 'follow',
                                method: "POST",
                                body: JSON.stringify(user)
                            });

console.log('script got the res');
console.log(response);
let url = response.url
let urlArray = url.split('/')
if (urlArray[3] == 'orderspage.html') {
  alert('Sending you to manager page');
  loadOrders();
  sessionStorage.setItem('userloged','true')
}else{
  alert('Try Again');
  loadLogin();
}


}

  function sendMessage(){
    fetch("/sendMessage");
}

function newemailtonews() {
  var email = document.getElementById("email").value;
  const useremail = {Email:email}
  
  fetch("/newsletter",{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(useremail)
})
.then(function(res){ console.log(res) })
.catch(function(res){ console.log(res) })

}

function loadCreers(){
  fetch("/careerpage.html")
  .then(function(response){
      return response.text()
  })
  .then(function(html){
      document.getElementById("renderPage").innerHTML=html;
  });

}

