
$(function(){

  /**
   * $function click my cart
   */
  $(".cart-btn").on("click",function(){
    $(".cart").toggle();
    if($(".cart").is(":visible")){
      changeToBlackCart();
    }else{
      changeToGreyCart();
    }
  });

  /**
   * $function for click detector
   */
  $(document).on("click",function(event){
    let $target = $(event.target);
    let $cart = $(".cart");
    let $cartBtn = $(".cart-btn");
    if(!$target.closest($cart).length && !$target.closest($cartBtn).length){
      $(".cart").hide();
      changeToGreyCart();
    }
  })

})

/**
 * function
 */
function changeToGreyCart(){
  $("#cart-icon").removeClass("black-cart").addClass("grey-cart");
}

/**
 * function
 */
function changeToBlackCart(){
  $("#cart-icon").removeClass("grey-cart").addClass("black-cart");
}

/**
 * function
 * @param screenWidth
 */
function updateCartIcon(screenWidth) {
  if(screenWidth <= mobileScreenWidth){
    $("#cart-txt").hide();
    $("#cart-icon").show();
  }else{
    $("#cart-txt").show();
    $("#cart-icon").hide();
  }
}


/**
 * function
 */
function loadShoppingCart(){
  let total = getFromPersist(keyTotal);
  setTotal(total);

  $("#cart").empty();
  let items = JSON.parse(getFromPersist(keyItems));
  if(items != null){
    let template = $("#item-list-template").html();
    let content = Mustache.render(template, {items:items});
    $("#cart").append(content);
  }else{
    $("#cart").append(emptyCart);
  }
}

/**
 * function
 */
function addItem(){
  let items = JSON.parse(getFromPersist(keyItems));
  let newItem = new Item($(".p-image img").prop("src"),$("#name").text(),$("#price").text(),$("#selected-size").text(),1);

  if(items == null){
    items = new Array (newItem);
  }else{
    let isNew = false;
    $.each(items,function(i,item){
      if(newItem.size === item.size){
        item.amount++;
        isNew = false;
        return false;
      }else{
        isNew = true;
      }
    });

    if(isNew){
      items.push(newItem);
    }
  }
  persist(keyItems,JSON.stringify(items));

  let total = parseInt($("#c-total").text());
  persist(keyTotal,total+1);

  loadShoppingCart();
}


/**
 * function
 * @param total
 */
function setTotal(total){
  if(total == null || isNaN(total)){
    total = 0;
  }
  $("#c-total").text(total);
}


/**
 * function
 */
function clearCart(){
  $.localStorage.clear();
  loadShoppingCart();
  $(".cart-btn").click();
}


/**
 * item Object
 * @param thumbnail
 * @param name
 * @param price
 * @param size
 * @param amount
 */
function Item(thumbnail,name,price,size,amount) {
  this.imgUrl = thumbnail;
  this.name = name;
  this.price = price;
  this.size = size;
  this.amount = amount;
}
