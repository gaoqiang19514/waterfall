(function(){

function WaterFall(){
	var _this = this;
	this.wrapper = $('#wrapper');
	this.windowWidht = $(window).width();	//	视口宽度
	this.itemArray = this.wrapper.find('.item');	
	this.itemWidth = $(this.itemArray[0]).width() + 15;
	this.colNum = Math.floor(this.windowWidht / this.itemWidth);	// 每行能够容纳几个盒子
	this.wrapper.css('width', this.colNum * this.itemWidth);


	this.itemHeightData = Array();

	this.itemArray.each(function(index, el) {
		var itemHeight = $(_this.itemArray[index]).height() + 15;
			//	第一行的元素不需要定位，直接自然摆放
		if(index < _this.colNum){
			_this.itemHeightData[index] = itemHeight; //第一行中的num个块框pin 先添加进数组pinHArr
		}else{
			//	第二行的元素就需要开始定位了，第二行第一个元素的top为第一行最矮元素的高度，left是第一行最矮元素的left值
			//	最重要的是需要更新高度数组的值，然后每次都去itemHeightData中找到更新高度后仍然最高的那个元素
			var minHeight = Math.min.apply( null, _this.itemHeightData );//数组pinHArr中的最小值minH
            var minHeightIndex = $.inArray( minHeight, _this.itemHeightData);

            $( el ).css({
                'position': 'absolute',
                'top': minHeight,
                'left': $(_this.itemArray[minHeightIndex]).position().left
            });
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            _this.itemHeightData[ minHeightIndex ] += $(_this.itemArray[index]).height() + 15;//更新添加了块框后的列高
		}
	});


}
WaterFall.prototype = {
	init : function(){

	},
	isLoad : function(){

	},
	relized : function(){

	}
};






new WaterFall();


})();