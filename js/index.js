$(function(){
	// 音乐播放器管理类
	class MusicPlayer {
		constructor(songs) {
			this.songs = songs;
			this.currentIndex = 0;
			this.audio = new Audio();
			this.hasPlayed = false;
			this.setupAudio();
		}

		setupAudio() {
			this.audio.src = this.songs[this.currentIndex];
			this.audio.addEventListener('ended', () => this.playNext());
		}

		play() {
			if(!this.hasPlayed) {
				this.audio.play().catch(e => console.log('播放失败:', e));
				this.hasPlayed = true;
			}
		}

		playNext() {
			this.currentIndex = (this.currentIndex + 1) % this.songs.length;
			this.audio.src = this.songs[this.currentIndex];
			this.audio.play().catch(e => console.log('播放失败:', e));
		}
	}

	// 初始化音乐播放器
	// 暂时使用一个音乐列表实现
	//TODO 动态获取音乐列表|增加音乐管理功能|增加音乐播放控制|半透明显示歌词
	var bgMusic = new MusicPlayer([
		'source/lover.mp3',
		'source/lullaboy - shortcut to heaven (V0).mp3',
		'source/only for you.mp3'
	]);
// 确保樱花特效canvas的z-index高于大图预览层
document.getElementById('canvas_sakura').style.zIndex = '10000';
	//添加17个img
	addImg(50);
	var imgLen = $("img").length;
	var index = Math.floor(imgLen/2);//放置在中间的图片的index
	var imgLeft = [];
	
	for(var i=0;i<imgLen;i++){
		if(i<index){
			$("img").eq(i).addClass("front");
		}else if(i>index){
			$("img").eq(i).addClass("back");
		}else{
			$("img").eq(i).addClass("now");
		}
	}

	mid();
	
	function addImg(n){
		for(var i=1;i<=n;i++){
			var img="<img src='img/photo"+i+".jpg'>";
			$(".pic").append(img);
		}
	}
	
	function mid(){
		var midIndex = $(".now").index();
		var winWid = $(window).width();//当前屏幕的宽度
		$(".now").css("left",winWid/2-150+"px");
		for(var i=0;i<imgLen;i++){
			$("img").eq(i).css("left",winWid/2-150-100*(midIndex-i)+"px");
			imgLeft[i] = parseInt($("img").eq(i).css("left"));//保存每个img的left值
		};

	};
	
	// 轮播控制变量
var isSliding = false;
var slideTimer = null;

// 开始轮播函数
function startSlide() {
	if(isSliding) return;
	isSliding = true;
	slideTimer = setInterval(function() {
		var nextIndex = (index + 1) % imgLen;
		$("img").eq(nextIndex).trigger("click");
	}, 3000);
}

// 停止轮播函数
function stopSlide() {
	clearInterval(slideTimer);
	isSliding = false;
}

// 创建大图预览层
var previewLayer = $('<div class="preview-layer"><div class="preview-content"><img src="" alt=""></div></div>').hide().appendTo('body');

$("img").click(function(){
	if(!hasPlayed) {
	    bgMusic.play().catch(e => console.log('播放失败:', e));
	    hasPlayed = true;
	}
	var nowIndex = $(this).index();
	for(var i=0;i<imgLen;i++){
		imgLeft[i] -= 100*(nowIndex-index);//将点击的照片放到最中间
		$("img").eq(i).css("left",imgLeft[i]);
	};
	for(var i=0;i<imgLen;i++){
		if(i<nowIndex){
			$("img").eq(i).removeClass().addClass("front");
		}else if(i>nowIndex){
			$("img").eq(i).removeClass().addClass("back");
		};
	};
	index = nowIndex;
	$(this).removeClass().addClass("now").siblings().removeClass("now");
	
	// 显示大图预览
	var imgSrc = $(this).attr('src');
	var img = new Image();
	img.onload = function() {
		var imgElement = previewLayer.find('img').attr('src', imgSrc);
		var winWidth = $(window).width();
		var winHeight = $(window).height();
		var imgWidth = this.width;
		var imgHeight = this.height;
		
		// 计算缩放比例
		// bug尚未解决|该死的显示问题
		var scale = Math.min(
			(winWidth * 0.9) / imgWidth,
			(winHeight * 0.9) / imgHeight,
			1 // 不超过原始尺寸
		);
		
		imgElement.css({
			'width': imgWidth * scale,
			'height': imgHeight * scale,
			'max-width': 'none',
			'max-height': 'none'
		});
		previewLayer.fadeIn();
	};
	img.src = imgSrc;
	
	// 点击后开始轮播
	stopSlide();
	startSlide();
});

// 点击预览层关闭
previewLayer.click(function(){
	$(this).fadeOut();
	stopSlide();
});
})