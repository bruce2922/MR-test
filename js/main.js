var keyItems = "key-cart-items";
var keyTotal = "key-total-items";
var emptyCart = "Cart is empty";
var mobileScreenWidth = 500;

$(function(){

  //TODO loading icon

  updateCartIcon($(window).width());

  /**
   * loading products
   */
  $.ajax({
    type:"get",
    async:true,
    url:"https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product",
    //url:"./data/jData.json",
    dataType:"json",
    error: function(e){
      console.log("product data loading error" + e);
    },
    success: function(jData){
      let prod = jData;

      $(".product .p-image img").prop("src",prod.imageURL);
      $("#name").text(prod.title);

      let formattedPrice = OSREC.CurrencyFormatter.format(prod.price, { currency: 'NZD', symbol: '$' });
      $("#price").text(formattedPrice);
      $("#desc").text(prod.description);

      let sizeList = "";
      $.each(prod.sizeOptions,function(i,p){
        sizeList += "<div class='unselect'>"+p.label+"</div>"
      })
      $("#size-list").append(sizeList);

      /**
       * $function for size selection
       */
      $("#size-list div").on("click",function(){
        $(this).addClass("selected").siblings().removeClass("selected");
        $("#selected-size").text($(this).text());
      });

    }
  })

  /**
   * loading shopping cart
   */
  loadShoppingCart();

  /**
   * $function for add button
   */
  $(".add-btn").on("click",function(){
    if(!getSelectedSize()){
      dialog("","Please pickup a size","info");
      return;
    }
    addItem();
  });


  /**
   * $function for screen width changing
   */
  $(window).resize(function(){
    updateCartIcon($(window).width());
  })


});

/**
 * function
 */
function getSelectedSize(){
  return $("#selected-size").text();
}

/**
 * function
 * @param title
 * @param content
 * @param type
 */
function dialog(title,content,type){
  Swal.fire({
    title:title,
    text:content,
    icon:type,
    confirmButtonColor: '#222222',
  });
}

/**
 * function
 * @param key
 * @param value
 */
function persist(key,value){
  $.localStorage.setItem(key,value);
}

/**
 * function
 * @param key
 */
function getFromPersist(key){
  return $.localStorage.getItem(key);
}

