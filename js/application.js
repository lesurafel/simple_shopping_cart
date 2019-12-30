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
