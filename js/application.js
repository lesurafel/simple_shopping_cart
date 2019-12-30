var updateSubPrice = function (ele) {
  var unitPrice = $(ele).children('.unitPrice').text();
  unitPrice = parseFloat(unitPrice.slice(1));
  var qty = parseFloat($(ele).find('.cost input').val());

  if (qty < 0 || !qty) {
    $(ele).find('.cost input').val('');
    qty = 0;
  }
  var subPrice = unitPrice * qty;
  if (subPrice) {
    $(ele).children('.subPrice').html('$' + subPrice + '.00');
  } else {
    $(ele).children('.subPrice').html('$--.--');
    subPrice = 0;
  }

  return subPrice;
}

var sum = function (acc, x) { return acc + x; };

var updateTotalPrice = function () {
  var totalSubPrice = [];
  $('.main .row').each(function (i, ele) {
    var subPrice = updateSubPrice(ele);
    totalSubPrice.push(subPrice);
  });
  var totalPrice = totalSubPrice.reduce(sum);
  if (totalPrice) {
    $('#totalPrice').html(totalPrice + '.00');
  } else {
    $('#totalPrice').html('--.--');
  }
}

$(document).ready(function () {
  updateTotalPrice();

  $(document).on('input', function () {
    updateTotalPrice();
  });

  // Add New Item
  $('#addItem').on('submit', function (event) {
    event.preventDefault();
    //var qty = parseFloat($(ele).find('.cost input').val());
    var itemName = $(this).find('[name=itemName]').val();
    var unitPrice = $(this).find('[name=unitPrice]').val();
    if (!unitPrice || unitPrice < 1) {
      alert("Unit price must be greater than 0");
    } else {
      $('.main').append('<div class="row">' +
        '<div class="col-xs-3 name">' + itemName + '</div>' +
        '<div class="col-xs-3 unitPrice">$' + unitPrice + '.00 </div>' +
        '<div class="col-xs-3 cost"><b>QTY </b><input type="number" value=""></div>' +
        '<div class="col-xs-1"><button class="btn btn-light btn-sm remove">Cancel</button></div>' +
        '<div class="col-xs-2 subPrice">$--.--</div>' +
      '</div>');
    }
    updateTotalPrice();
    $(this).find('[name=itemName]').val('');
    $(this).find('[name=unitPrice]').val('');
  });
});
