var timer = null;
emp();
function emp() {
    timer = setInterval(function () {
        auto();
    },800)
}
$("img.gb").click(function () {
    $("#Tz_gray").show(); //显示
    $("#Music").get(0).play();

});
//点击颜色时，显示和隐藏
$("span.col").click(function () {
    $(".Con ul").toggle("slow");
});
//点击颜色时，更换颜色
$(".Con ul li").click(function () {
    var col = $(this).data("color");
    $("span.col font").css("background-color", col);
    $(this).addClass("xz").siblings().removeClass("xz"); //指定的加上 class="xz" 其它的移除
    $(".Con ul").toggle("slow"); //隐藏
});
//当我们抬起键盘时
var arr = [];
$('p.txt').blur(function () {
    emp();
})
$("p.txt").keyup(function (e) {
    clearInterval(timer);
    var col = $(".Con ul li.xz").data("color");
    var txt = "<span style='color:" + col + "'>" + $(this).text() + "</span>"; //获取输入框内容
    $(".Text").html(arr.join("").toString() + txt); //保证输入的内容同步
    //判断有没有按回车键
    //keyCode 的值为 13时，说明是回车键
    if (e.keyCode == 13) {
        //清空输入框内容
        $("p.txt").empty(); //清空
        arr.push("<P>" + txt + "</p>");
        var html = "";
        for (var i = 0; i < arr.length; i++) {
            html += arr[i];
        }
        $(".Text").html(html);
    }
    $('.but').click(function () {
        auto();
    })
    function auto(){
        $(".Text span").animate({
            opacity: 0.1
        }, 500, function () {
            $('.Text').find('span').empty()
            $('.Text').find('p').remove();
        })
        $("p.txt").empty();
    }
});
$(document).snowfall({
    flakeCount: 50
})

// 浪漫爱情主题交互功能增强

// 页面加载完成后执行
// 移动端照片主题爱情纪念网站交互功能

// 等待DOM加载完成
$(document).ready(function() {
    // 显示主容器并添加淡入动画
    $('#Tz_gray').css('display', 'flex').hide().fadeIn(2000);
    
    // 初始化照片轮播
    initPhotoCarousel();
    
    // 启动爱情计时器
    initLoveTimer();
    
    // 初始化背景音乐控制
    initMusicControl();
    
    // 初始化歌词滚动
    initLyricsScroll();
    
    // 初始化雪花效果
    initSnowfall();
    
    // 窗口大小改变时重新布局
    $(window).resize(function() {
        updateResponsiveLayout();
    });
    
    // 初始化时调用一次布局更新
    updateResponsiveLayout();
});

// 照片轮播功能
function initPhotoCarousel() {
    const slides = $('.carousel-slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let slideInterval;
    
    // 显示当前幻灯片
    function showSlide(index) {
        slides.removeClass('active');
        slides.eq(index).addClass('active');
        currentSlide = index;
    }
    
    // 下一张幻灯片
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= totalSlides) next = 0;
        showSlide(next);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) prev = totalSlides - 1;
        showSlide(prev);
    }
    
    // 自动播放
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000); // 5秒切换一次
    }
    
    // 停止自动播放
    function stopSlideshow() {
        clearInterval(slideInterval);
    }
    
    // 绑定控制按钮事件
    $('#next-btn').on('click', function() {
        stopSlideshow();
        nextSlide();
        startSlideshow();
    });
    
    $('#prev-btn').on('click', function() {
        stopSlideshow();
        prevSlide();
        startSlideshow();
    });
    
    // 触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    $('.photo-carousel').on('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    $('.photo-carousel').on('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // 向左滑动
            stopSlideshow();
            nextSlide();
            startSlideshow();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // 向右滑动
            stopSlideshow();
            prevSlide();
            startSlideshow();
        }
    }
    
    // 开始自动播放
    startSlideshow();
}

// 爱情计时器功能
function initLoveTimer() {
    // 设置恋爱开始日期 - 2024年5月30Night
    const loveStartDate = new Date('2024-05-30T20:00:00');
    
    function updateTimer() {
        const now = new Date();
        const timeDiff = now - loveStartDate;
        
        // 计算天、时、分、秒
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        // 更新显示
        $('#timer-display').text(`${days}天${hours}时${minutes}分${seconds}秒`);
    }
    
    // 立即更新一次
    updateTimer();
    
    // 每秒更新一次
    setInterval(updateTimer, 1000);
}

// 背景音乐控制功能
function initMusicControl() {
    const audio = document.getElementById('music');
    const toggleBtn = $('#audio-toggle');
    const playIcon = $('.play-icon');
    const pauseIcon = $('.pause-icon');
    let isPlaying = false;
    
    function togglePlay() {
        if (audio.paused) {
            audio.play().then(() => {
                isPlaying = true;
                playIcon.hide();
                pauseIcon.show();
            }).catch(error => {
                console.log('播放失败:', error);
            });
        } else {
            audio.pause();
            isPlaying = false;
            playIcon.show();
            pauseIcon.hide();
        }
    }
    
    // 点击控制按钮
    toggleBtn.on('click', togglePlay);
    
    // 立即尝试自动播放（不等待用户交互）
    function tryAutoPlay() {
        // 设置音量
        audio.volume = 0.3;
        // 设置循环播放
        audio.loop = true;
        
        audio.play().then(() => {
            isPlaying = true;
            playIcon.hide();
            pauseIcon.show();
            console.log('音乐自动播放成功');
        }).catch(error => {
            console.log('自动播放失败，等待用户交互:', error);
            // 失败后依然尝试在用户交互时播放
            setupUserInteractionPlay();
        });
    }
    
    // 设置用户交互时播放
    function setupUserInteractionPlay() {
        function playOnInteraction() {
            audio.play().then(() => {
                isPlaying = true;
                playIcon.hide();
                pauseIcon.show();
                console.log('通过用户交互播放成功');
            }).catch(err => {
                console.log('用户交互播放失败:', err);
            });
            // 移除事件监听器，避免重复触发
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
            document.removeEventListener('keydown', playOnInteraction);
        }
        
        // 添加多种用户交互事件监听器
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
        document.addEventListener('keydown', playOnInteraction);
    }
    
    // 监听音频播放事件
    audio.addEventListener('play', function() {
        isPlaying = true;
        playIcon.hide();
        pauseIcon.show();
    });
    
    audio.addEventListener('pause', function() {
        isPlaying = false;
        playIcon.show();
        pauseIcon.hide();
    });
    
    // 页面加载后立即尝试自动播放
    tryAutoPlay();
}

// 歌词滚动功能 - 与林俊杰《第几个100天》时间序列同步
function initLyricsScroll() {
    const audio = document.getElementById('music');
    const lyricElement = $('#current-lyric');
    
    // 林俊杰《第几个100天》正确歌词及时间戳（以秒为单位）
    const lyricsWithTime = [
        { time: 0.40, text: '第几个一百天 - 林俊杰' },
        { time: 41.01, text: '我 把爱铺成蓝天' },
        { time: 47.32, text: '让不安的你 一抬头就看得见' },
        { time: 55.82, text: '我 把心烧成火焰' },
        { time: 62.07, text: '让怕黑的你 拥着温暖入眠' },
        { time: 69.88, text: '我晓得 时间如雪 有时候会覆盖一切' },
        { time: 76.94, text: '但是真爱 一如倔强会重生的绿叶' },
        { time: 84.51, text: '第几个100天 还是很有感觉' },
        { time: 91.70, text: '用眼睛去素描 你内心的世界' },
        { time: 99.40, text: '第几个100天 也像刚热恋' },
        { time: 108.71, text: '两个人手一牵 连命运都改变' },
        { time: 128.28, text: '我 把心烧成火焰' },
        { time: 134.59, text: '让怕黑的你 拥着温暖入眠' },
        { time: 142.21, text: '我晓得 时间如雪 有时候会覆盖一切' },
        { time: 149.14, text: '但是真爱 一如倔强会重生的绿叶' },
        { time: 156.90, text: '第几个100天 还是很有感觉' },
        { time: 164.15, text: '用眼睛去素描 你内心的世界' },
        { time: 171.58, text: '第几个100天 也像刚热恋' },
        { time: 179.02, text: '两个人手一牵 连命运都改变' },
        { time: 187.40, text: '曾有的敏感脆弱' },
        { time: 189.96, text: '在我的胸口 你就躺下来别说了' },
        { time: 194.90, text: '将有的固执冲动' },
        { time: 197.46, text: '我也会拥抱你安抚着体谅你心疼着Wooh ~' },
        { time: 210.72, text: '第几个100天 越来越有感觉' },
        { time: 217.96, text: '用眼睛去素描 你内心的世界' },
        { time: 225.22, text: '管过多少100天 也像刚热恋' },
        { time: 234.90, text: '两个人手一牵 连命运都改变' },
        { time: 242.34, text: '当守护变信念 连泪水都很甜' }
    ];
    
    let currentLyricIndex = 0;
    
    // 更新歌词显示的函数
    function updateLyric(index) {
        if (index >= 0 && index < lyricsWithTime.length) {
            // 淡出当前歌词
            lyricElement.removeClass('active');
            
            setTimeout(() => {
                // 更新歌词内容
                lyricElement.text(lyricsWithTime[index].text);
                // 淡入新歌词
                lyricElement.addClass('active');
                
                currentLyricIndex = index;
            }, 300);
        }
    }
    
    // 检查并更新歌词的函数
    function checkAndUpdateLyric() {
        const currentTime = audio.currentTime;
        
        // 向后查找应该显示的歌词索引
        for (let i = lyricsWithTime.length - 1; i >= 0; i--) {
            if (currentTime >= lyricsWithTime[i].time) {
                if (i !== currentLyricIndex) {
                    updateLyric(i);
                }
                break;
            }
        }
    }
    
    // 当音频播放时，监听timeupdate事件更新歌词
    audio.addEventListener('timeupdate', checkAndUpdateLyric);
    
    // 当音频开始播放时，显示第一句歌词
    audio.addEventListener('play', function() {
        if (currentLyricIndex === 0 && audio.currentTime < lyricsWithTime[0].time) {
            updateLyric(0);
        }
    });
    
    // 当音频结束时，重置歌词
    audio.addEventListener('ended', function() {
        currentLyricIndex = 0;
        updateLyric(0);
    });
    
    // 当音频跳转时，立即更新歌词
    audio.addEventListener('seeked', checkAndUpdateLyric);
    
    // 初始显示第一句歌词
    updateLyric(0);
}

// 雪花效果
function initSnowfall() {
    // 使用snowfall插件创建雪花效果
    $(document).snowfall({
        flakeCount: 30,
        maxSpeed: 3,
        minSpeed: 1,
        maxSize: 10,
        minSize: 5,
        round: true,
        shadow: false
    });
}

// 响应式布局更新
function updateResponsiveLayout() {
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    
    // 根据屏幕尺寸调整元素大小和位置
    if (windowWidth < 768) {
        // 移动设备优化
        $('.photo-carousel').css('height', '50vh');
        $('.timer-container').css('font-size', '0.7rem');
        $('.timer-container').css('padding', '8px 12px');
    } else {
        // 平板和桌面设备优化
        $('.photo-carousel').css('height', '60vh');
        $('.timer-container').css('font-size', '0.8rem');
        $('.timer-container').css('padding', '10px 15px');
    }
}

// 添加页面加载动画效果
$(window).on('load', function() {
    // 页面完全加载后的动画效果
    setTimeout(() => {
        // 可以添加额外的加载完成动画
    }, 1000);
});