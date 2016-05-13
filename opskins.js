$('#sidebar').after('<div class="col-xs-12" id="sorting"></div>');
$('[form=search]').addClass('col-lg-12');
$('#sorting').append('<button class="btn btn-primary pull-left col-lg-12" id="sortDiscount">Sort By Discount</button>');
$('#sorting').append('<button class="btn btn-success pull-left col-lg-12" id="sortPrice">Sort By Price </button>');
$('#sorting').append('<button class="btn btn-warning pull-left col-lg-12" id="sortWear">Sort By Wear</button>');
$('#sorting').append('<button class="btn btn-default pull-left col-lg-12" id="loadMore">Load More</button>');
//Add Data Attributes
setInterval(function(){
	//Set Discount and Current Price
	$('.featured-item').not('[data-discount]').each(function(){
		var cp = Number($(this).find('.item-amount').html().replace(/[^0-9\.]+/ig, ""));
		$(this).attr('data-price',cp);
		var rp = Number($(this).find('.suggested-price').html().replace(/[^0-9\.]+/ig, ""));
		if (!rp){
			$(this).attr('data-discount',1);
		}else{
			var discount = String(100-((cp/rp)*100));
			$(this).attr('data-discount',Number(String(cp/rp).substr(0,10)));
			if (cp > rp){
				return;
			}
			if (!$(this).find('.item-add-wear').html()){
				$(this).find('.item-add').append('<span class="label label-success" style="position:absolute;top:10px;right:5px;font-size:15px;">'+discount.substr(0, discount.indexOf('.')+2)+'% OFF</span>');
			}else{
				$(this).find('.item-add-wear').append('<span class="label label-success" style="position:absolute;top:10px;right:5px;font-size:15px;">'+discount.substr(0, discount.indexOf('.')+2)+'% OFF</span>');
			}
			$(this).find('.good-deal-discount-pct').remove();
		}
	});
	$('.featured-item').not('[data-wear]').not('.has-wear').each(function(){
		$(this).attr('data-wear',100);
	});
	$('.featured-item.has-wear').not('[data-wear]').each(function(){
		var wear = Number($(this).find('.wear-value small').attr('title').replace(/[^0-9\.]+/ig, "").substr(0,10));
		$(this).attr('data-wear',wear);
	});
},1000);
//Sort By Discount Percent
$('#sortDiscount').click(function(e){
	e.preventDefault();
	var mainlisting = $(document).find('#scroll');
	$(document).find('[data-discount]').sort(function(a,b){
		return a.dataset.discount - b.dataset.discount;
	}).prependTo(mainlisting);
});
//Sort By Price
$('#sortPrice').click(function(e){
	e.preventDefault();
	var mainlisting = $(document).find('#scroll');
	$(document).find('[data-price]').sort(function(a,b){
		return a.dataset.price - b.dataset.price;
	}).prependTo(mainlisting);
});
//Sort By Wear
$('#sortWear').click(function(e){
	e.preventDefault();
	var mainlisting = $(document).find('#scroll');
	$(document).find('[data-wear]').sort(function(a,b){
		return a.dataset.wear - b.dataset.wear;
	}).prependTo(mainlisting);
});
//Load Next Page
$('#loadMore').click(function(e){
	window.scroll(0,99999999999);
	setTimeout(function(){window.scroll(0,0);},0);
});