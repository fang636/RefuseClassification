// pages/info/info.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    const _this = this
    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      url: app.globalData.url + 'user/weixin/getAll',
      data: {
        openId: app.globalData.openId
      },
      success: function(result) {
        //console.log(result)
        var res_info
        if (result.statusCode == 200) {
          if (result.data.length > 0) {
            res_info = result.data
          } else {
            res_info = null
          }
        } else {
          res_info = []
        }
        _this.setData({
          info: res_info
        })
      }
    })

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