"use strict";
// 看b站视频全屏时右上角显示时间
class Clock {
    constructor() {
        this.timer = 0;
        this.init();
        this.clock = document.getElementById('clock');
    }
    init() {
        this.addStyle();
        this.div();
        // 保存bind绑定的新回调！！remove事件回调必须指向同一个
        let showTime = this.showTime.bind(this);
        document.addEventListener('fullscreenchange', function () {
            if (document.fullscreenElement) {
                document.addEventListener('mousemove', showTime);
            }
            else {
                document.removeEventListener('mousemove', showTime);
            }
        });
    }
    showTime() {
        clearTimeout(this.timer);
        this.clock.innerHTML = this.getTime();
        this.clock.style.opacity = '1';
        this.clock.style.visibility = 'visible';
        this.timer = setTimeout(() => {
            this.clock.style.opacity = '0';
            this.clock.style.visibility = 'hidden';
        }, 2000);
    }
    createStyle() {
        return `.myClock {
      z-index: 2000;
      visibility: hidden;
      opacity: 0;
      position: absolute;
      top: 20px;
      right: 20px;
      width: 70px;
      height: 10px;
      color: #fff;
      line-height: 10px;
      text-align: center;
      font-size: 14px;
      pointer-events: none;
      -webkit-transition: all .2s ease-in-out;
      transition: all .2s ease-in-out;
      cursor: default;
    }`;
    }
    addStyle() {
        let style = document.createElement("style");
        style.innerHTML = this.createStyle();
        document.head.appendChild(style);
    }
    div() {
        let div = document.createElement('div');
        div.id = 'clock';
        div.className = 'myClock';
        div.innerHTML = this.getTime();
        if (document.querySelector('.bilibili-player-video-wrap')) {
            document.querySelector('.bilibili-player-video-wrap').appendChild(div);
        }
    }
    getTime() {
        let date = new Date();
        let h = date.getHours();
        let m = date.getMinutes();
        return `${this.format(h)} : ${this.format(m)}`;
    }
    format(time) {
        if (time.toString().length == 2) {
            return time + '';
        }
        else {
            return '0' + time;
        }
    }
}
new Clock();
