(function(){
	document.documentElement.style.overflowX = 'hidden';
	document.documentElement.style.overflowY = 'hidden';
	$('img').load(function() {
		$("#loading").fadeOut(500, function(){
			$(this).remove();
			document.documentElement.style.overflowY = 'visible';
		});

	})

	function WaterFall(){
		var _this = this;
		this.margin = 10;
		this.items = $('.imgShow');
		this.container = $('.container');
		this.singleItemWidth = this.items[0].offsetWidth + this.margin;

		var dataInt={
			'data':[{'src':'8.jpg'},{'src':'18.jpeg'},{'src':'19.jpg'}, {'src':'12.jpg'},{'src':'11.jpg'},{'src':'10.jpg'}]
		};


		$("img").load(function(){
			_this.init();

			$(window).resize(function(event) {
				setTimeout(function(){
					_this.init();
				}, 300);

			});

			$(document).scroll(function(event) {
				if(_this.checkscrollside()){
				 //		后续加入ajax异步加载数据
				 //		 var remoteUrl = '';
				 //     $.ajax({
				 //        type:"get",
				 //        cache:false,
				 //        url: remoteUrl,
				 //        dataType:"json",
				 //        beforeSend:function(){
				 //           $("#loading").append('<img src="loading.gif"/>');
				 //        },
				 //        success:function(data){
				 //           $("#loading").html(data.info);//添加下拉框的option
				 //        },
				 //        complete: function() {$("#vvv").remove();
				 //        }
				 //     });

					//	执行数据加载
					for(var i = 0; i < dataInt.data.length; i++){
						var imgShow = document.createElement('div');
						imgShow.className = 'imgShow';
						var aEl = document.createElement('a');
						imgShow.appendChild(aEl);
						var img = document.createElement('img');
						img.src = './images/' + dataInt.data[i].src;
						aEl.appendChild(img);
						_this.container[0].appendChild(imgShow);

						$(imgShow).css('opacity', "0");
						$(imgShow).stop().animate({
							"opacity":"1"
						}, 300);
					}

					//	更新元素数量
					_this.items = $('.imgShow');
					_this.init();
				}
			});
	});

	}
	WaterFall.prototype = {
		init : function(){
			var itemHeightArray = [];
			var colMaxNumber = Math.floor($(window).width() / this.singleItemWidth);
			//	将包裹层居中显示
			if($(window).width() > this.singleItemWidth){
				this.container.css('left', ($(window).width() - (colMaxNumber * this.singleItemWidth)) / 2);
			}
			for(var i = 0; i < this.items.length; i++){
				if(i < colMaxNumber){
					itemHeightArray[i] = this.items[i].offsetHeight + this.margin;
					this.items[i].style.top = 0;
					this.items[i].style.left = i * this.singleItemWidth + 'px';
				}else{
					var minHeight = Math.min.apply(null, itemHeightArray);
					var minHeightIndex = $.inArray(minHeight, itemHeightArray);

					this.items[i].style.top = minHeight + 'px';
					this.items[i].style.left = minHeightIndex * this.singleItemWidth + 'px';
					itemHeightArray[minHeightIndex] += this.items[i].offsetHeight + this.margin;

				//	另一种方法
				// var innsertColumn = this.min(itemHeightArray);
				// //	当前要放置的元素的高度加上边距
				// var imgHeight = this.items[i].offsetHeight + this.margin;

				// this.items[i].style.top = itemHeightArray[innsertColumn] + 'px';
				// this.items[i].style.left = innsertColumn * this.singleItemWidth + 'px';
				// itemHeightArray[innsertColumn] += imgHeight;
				}	

				}
		},
		min : function(heightAarry){
			var minColumn = 0;
			var minHeight = heightAarry[minColumn];
			for (var i = 1,len=heightAarry.length; i < len; i++) {
				var temp = heightAarry[i];
				if (temp < minHeight) {
					minColumn = i;
					minHeight = temp;
				};
			};
			return minColumn;
		},
		checkscrollside : function(){
		//	视口高度
		var widnowHeight = document.documentElement.clientHeight;
		//	滚动条距离文档顶部的高度
		var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
		var lastElement = $(this.items[this.items.length - 1]);
		return (widnowHeight + scrollHeight) > (lastElement.offset().top + lastElement.height() / 2);
		}
	};

new WaterFall();

})();



