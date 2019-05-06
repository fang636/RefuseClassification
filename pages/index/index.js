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
    aaa: ['aaa', 'bbb', 'ccc'],
    bbb: ['aaa', 'bbb', 'ccc'],
    ccc: ['aaa', 'bbb', 'ccc'],
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
    ],
    cord: null //卡片
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


    var userModel = app.globalData.userModel
    //console.log(userModel)
    if (userModel.sf == 'ROLE_HWGR') {
      console.log('环卫工人登录===')
      this.setData({
        toolBar: [{
            image: '../../images/list.png',
            text: '管理列表',
            key: 'ydy_list'
          },
          {
            image: '../../images/edit.png',
            text: '违规反馈',
            key: 'violation'
          }
        ]
      })
      return
    }
    if (userModel.sf == 'ROLE_USHER') {
      console.log('引导员登录===')
      this.setData({
        toolBar: [{
            image: '../../images/manger.png',
            text: '大物件',
            key: 'ydy_bigThingManger'
          },
          {
            image: '../../images/list.png',
            text: '管理列表',
            key: 'ydy_list'
          },
          {
            image: '../../images/report.png',
            text: '上报',
            key: 'ydy_report'
          }
        ],
        cord: [{
            key: 'ydy_deposit',
            text: '垃圾袋存放'
          },
          {
            key: 'ydy_maintain',
            text: '设备维护'
          }

        ]
      })
      return
    }
    if (userModel.sf == 'ROLE_TEST') {
      console.log('回收站登录===')
      this.setData({
        toolBar: [{
          image: '../../images/manger.png',
          text: '大物件回收',
          key: 'ydy_bigThingManger'
        }
        ]
      })
      return
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
      case 'ydy_bigThingManger':
        wx.switchTab({
          url: '../info/info'
        })
        break
      case 'violation':
        wx.navigateTo({
          url: '../violation/violation'
        })
        break
      case 'ydy_list':
        wx.navigateTo({
          url: '../ydy_list/ydy_list'
        })
        break
      case 'ydy_report':
        wx.navigateTo({
          url: '../ydy_report/ydy_report'
        })
        break
      case 'ydy_maintain':
        wx.navigateTo({
          url: '../ydy_list/ydy_list'
        })

    }
  },
  //环卫工人登录时切换工具栏
  onShow: function() {


  },
  getFormId: function(res) {
    var formId = res.detail.formId
    // if (formId == 'the formId is a mock one') {
    //   console.log(`模拟器中运行！`)
    //   return false;
    // }
    // if (formId.length == 0) {
    //   console.log(`formId不能为空`)
    //   return false;
    // }
    var url = app.globalData.url + 'weixin/saveFormId'
    var data = {
      openId: app.globalData.openId,
      formId: formId
    }
    app.myRequest(url, data, null, function(result) {
      console.log('保存formId')
    })
  }
})