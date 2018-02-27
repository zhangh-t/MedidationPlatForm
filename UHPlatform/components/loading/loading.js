// components/loading.js
Component({
  _timer : null,
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false,
      observer(isShow) {
        if (isShow) {
          if (!getApp().globalData) {
            Object.assign(getApp(), { globalData: {} });
          }
          let globalData = getApp().globalData;
          let zIndex = (globalData._zIndex || 1000) + 1;
          globalData._zIndex = zIndex;
          this.setData({
            zIndex: zIndex
          });
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    zIndex: 1000,
    curIndex: 1
  },
  attached() {
    this.init();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    init :function () {
      this._timer = setInterval(() => {
        let nextIndex = this.data.curIndex + 1;
        if (nextIndex > 6) {
          nextIndex = 1;
        }
        this.setData({curIndex : nextIndex});
      }
      , 500);
    },

    destroy : function () {
      clearInterval(this._timer);
      this.setData({curIndex:1});
    },

    show : function () {
      this.setData({isShow:true});
    },
    
    hide : function () {
      this.setData({ isShow: false });
    }

  }
})
