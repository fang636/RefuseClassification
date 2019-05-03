// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    id: null,
    btnText: '',
    hwg: null,
    ydy: null
  },
  //环卫工处理垃圾桶
  hwgBtnHander: function(e) {
    var id = this.data.id
    wx.showModal({
      title: '提示',
      content: '是否认已清空该垃圾桶？',
      success: function(res) {
        if (res.confirm) {
          _this.confirmClean()
        }
      }
    })
  },
  //环卫工处理垃圾桶,为防止网络不通时做出处理
  confirmClean: function() {
    const _this = this
    app.myRequest2(app.globalData.url + 'weixin/', {
      id: id,
      openId: app.globalData.openId
    }, null, function(result) {
      if (result.statusCode == '200') {
        console.log(result.data)
      } else {
        wx.showModal({
          title: '提示',
          content: '连接出现问题，请重试',
          confirmText: '重新发送',
          success: function(res) {
            if (res.confirm) {
              _this.confirmClean()
            }
          }
        })
      }
    }, function(result) {
      wx.showModal({
        title: '提示',
        content: '网络出现问题，请重试',
        confirmText: '重新发送',
        success: function(res) {
          if (res.confirm) {
            _this.confirmClean()
          }
        }
      })
    })
  },
  //引导员处理垃圾桶
  ydyBtnHander: function(e) {
    var id = this.data.id
    wx.navigateTo({
      url: '../ydy_report_wh/ydy_report_wh?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _this = this
    this.setData({
      id: options.id
    })
    app.myRequest(app.globalData.url + 'weixin/refuseId', {
      id: options.id
    }, null, function(result) {
      var res_info
      if (result.statusCode == 200) {
        res_info = result.data
        if (app.globalData.userModel.sf == 'ROLE_HWGR') {
          _this.setData({
            btnText: '已清空',
            hwg: true,
            ydy: false
          })
        } else if (app.globalData.userModel.sf == 'ROLE_USHER') {
          _this.setData({
            btnText: '上报操作记录',
            hwg: false,
            ydy: true
          })
        }

      } else {
        res_info = {}
      }
      _this.setData({
        info: res_info
      })


    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})