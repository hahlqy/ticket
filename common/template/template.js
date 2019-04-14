//标记触摸开始x坐标点
const fnMarkTouchPoint = function(e) {
  this.setData({
    touchPointFlag: {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    }
  });
};

//判断触摸抬起x坐标点减100大于触摸开始标记的x坐标点则隐藏弹出层
const fnSlideClose = function(e) {
  let touchStartPoint = Math.floor(this.data.touchPointFlag.x),
    touchEndPoint = Math.floor(e.changedTouches[0].pageX),
    property = e.currentTarget.dataset['property'];
  if (touchEndPoint - 100 > touchStartPoint) {
    this.setData({
      [property]: false
    });
  }
};

const fnPickedDate = function(e) {
  this.setData({
    visibleDateLayer: false
  });
};

const fnPickedStation = function(e) {
  this.setData({
    visibleStationLayer: false
  });
};

module.exports = {
  fnPickedStation: fnPickedStation,
  fnPickedDate: fnPickedDate,
  fnMarkTouchPoint: fnMarkTouchPoint,
  fnSlideClose: fnSlideClose
};