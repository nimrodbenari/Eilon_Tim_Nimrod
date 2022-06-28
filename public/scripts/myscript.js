

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
// ------------loads section--------------------------------
    function loadCreers(){
      fetch("/careerpage.html")
      .then(function(response){
          return response.text()
      })
      .then(function(html){
          document.getElementById("renderPage").innerHTML=html;
      });
    
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

    // ------------------orders section--------
    function createOrderDiv(){ 
      if (sessionStorage.getItem('cart')==null) {
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
      } else {
        var ourTable=document.getElementById("orderdisplay");
data=cartlist();
 theHTML="<tr><th>name</th><th>price</th><th>img</th></tr>"
    data.forEach(prod => {
    newHtml=`<tr>
    <td>${prod[0]}</td>
    <td>${prod[1]}</td>
    <td><img id="imgcart" src="${prod[2]}"</td>
  </tr>`   
    theHTML+=newHtml
 });   
 ourTable.innerHTML=theHTML
      }
    
    }
 // ------------------product div section--------
    function createDiv(data,category)
    { 
     var ourDiv=document.getElementById("theDiv");
     theHtml=`<div></div>`
        data.forEach(product => {if ((product.category==category || category==null )&& product.quantity!= 0 ) {
        
        newHtml=`<div class="w3-col l3 s6" style="background-color: white;">
                <div class="w3-display-container">
                  <img id="boards" src="${product.img}">
                  <div class="w3-display-middle w3-display-hover">
                <button class="w3-button w3-black" onclick="NewOrder('${product.price}|${product.model}|${product.img}')" >Buy now <i class="fa fa-shopping-cart" ></i></button>
                <button class="w3-button w3-black" onclick="AddToCart('${product.price}|${product.model}|${product.img}')" >add to cart <i class="fa fa-shopping-cart" ></i></button>
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
function getOrders()// fetch GET mathod all orders in DB
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
function createOrdersTable(data)// table for manager
{ 
 var ourTable=document.getElementById("orderTable");
 theHTML="<tr><th>Order ID</th><th>Productmodel</th><th>Quantity</th><th>Customer name</th><th>shiping addres</th><th>phone number</th><th>Email</th><th>Status</th><th>order date</th><th>delivery date</th></tr>"
    data.forEach(order => {
    newHtml=`<tr>
    <td>${order._id}</td>
    <td>${order.productmodel}</td>
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

function NewOrder(data){// takes user to new order form 
  if (sessionStorage.getItem('cart')==null) {
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
  else{
    fetch("/neworder.html")
    .then(function(response){
        return response.text()
    })
    .then(function(html){
        document.getElementById("renderPage").innerHTML=html;
    })
  }
}
function orderDetails() { //order form to JSON and to DB
  var order;
 if (sessionStorage.getItem('cart')!=null) {
  var customername = document.getElementById("customername").value;
  var shipingaddres = document.getElementById("shipingaddres").value;
  var phonenumber = document.getElementById("phonenumber").value;
  var email = document.getElementById("email").value;
  var cardnumber = document.getElementById("cardnumber").value;
  var cvv = document.getElementById("cvv").value;
  var expire = document.getElementById("expire").value;
  var status = 'on-process';
  var date = new Date(Date.now()).toLocaleString().split(',')[0];
  var ordercart = sessionStorage.getItem('cart');

   order = {
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
    'deliverDate': ' ',
    'ordercart': ordercart

  };
 } else {
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
  var date = new Date(Date.now()).toLocaleString().split(',')[0];

  order = {
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
async function searchCategory() {
  var category = document.getElementById("category").value;
  category = category.toLowerCase();
  await getProducts(category)

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



// -------------------------cart section---------------------------
 function  AddToCart(data) {
  let dataArray = data.split('|');
  if (sessionStorage.getItem('prodNum')!=null) {
    let num = sessionStorage.getItem('prodNum')
  
    sessionStorage.setItem(`price${parseInt(num)+1}`,dataArray[0])
    sessionStorage.setItem(`model${parseInt(num)+1}`,dataArray[1])
    sessionStorage.setItem(`img${parseInt(num)+1}`,dataArray[2])
    sessionStorage.setItem(`prodNum`,parseInt(num)+1)
  } else {
    sessionStorage.setItem('price',dataArray[0])
  sessionStorage.setItem('model',dataArray[1])
  sessionStorage.setItem('img',dataArray[2])
  sessionStorage.setItem('prodNum',0)
  }
}

function cartlist() {
  let arry = []
  let prod = []
prod=[sessionStorage.getItem(`model`),sessionStorage.getItem(`price`),sessionStorage.getItem(`img`)]
arry[0] = prod
for (let i = 0; i < sessionStorage.getItem(`prodNum`); i++) {
  prod=[sessionStorage.getItem(`model${i+1}`),sessionStorage.getItem(`price${i+1}`),sessionStorage.getItem(`img${i+1}`)]
 arry[i+1]=prod
}
sessionStorage.setItem('cart',arry)
return arry
}
function cartTable() {
  
var ourTable=document.getElementById("cartable");
data=cartlist();
 theHTML="<tr><th>name</th><th>price</th><th>img</th></tr>"
    data.forEach(prod => {
    newHtml=`<tr>
    <td>${prod[0]}</td>
    <td>${prod[1]}</td>
    <td><img id="imgcart" src="${prod[2]}"</td>
  </tr>`   
    theHTML+=newHtml
 });   
 ourTable.innerHTML=theHTML
}



