//index.js
//获取应用实例
const app = getApp()

function getBag() {
  wx.request({
    url: app.globalData.url + '/fd/findbybh',
    data: {
      openId: app.globalData.openId,
      bh: '001'
    },
    method: 'POST',
    dataType: '',

    success: function(result) {

    },
    fail: function(result) {

    }
  })
}
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    test: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //轮播图
    images: [{
        url: '../../images/hb.jpg'
      },
      {
        url: '../../images/hb.jpg'
      }
    ],
    //工具栏
    toolBar: [{
        image: '../../images/scanCode.png',
        text: '取袋',
        key: 'QRcode'
      },
      {
        image: '../../images/big.png',
        text: '大件回收',
        key: 'bigThing'
      },
      {
        image: '../../images/record3.png',
        text: '记录',
        key: 'record'
      }



    ]
  },
  onLoad: function(options) {
    wx.hideLoading()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    if (options.state == 'sandCode') {
      this.setData({
        test: 'asdsasa'
      })
    } else {
      this.setData({
        test: '不是扫码'
      })
    }
  },

  /**
   * 工具栏事件处理
   */
  toolBarHander: function(e) {
    switch (e.currentTarget.dataset.key) {
      case 'QRcode':
        /* wx.scanCode({
         success: (res) => {
            console.log(res)
            var obj = null
            try {
              var obj = JSON.parse('{'+res.result+'}')
            } catch (e) {
              console.log(e)
            }
            console.log(obj)
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: (res) => {
            wx.showToast({
              title: '失败',
              icon: 'none',
              duration: 2000
            })
          },
          complete: (res) => {}
        }) */
        wx.navigateTo({
          url: '../QRcode/QRcode?state=aaa'
        })
        break
      case 'bigThing':
        wx.navigateTo({
          url: '../bigThing/bigThing'
        })
        break
        case 'record':
        wx.switchTab({
          url: '../info/info'
        })
        break
    }
  }
})