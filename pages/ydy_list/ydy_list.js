// pages/ydy_list/ydy_list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: []
  },

  bindClickHander: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../list_detail/list_detail?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _this = this
    app.myRequest2(app.globalData.url + 'weixin/refuseAll', {}, null, function(result) {
      if (result.statusCode == '200') {
        if (result.data == null || result.data == '') {
          _this.setData({
            info: null
          })
          return
        }
        _this.setData({
          info: result.data
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '连接错误，请重试',
          confirmText: '重连',
          success: function(res) {
            if (res.confirm) {
              _this.onLoad(options)
            }
          }
        })
      }
    }, function(result) {
      wx.showModal({
        title: '提示',
        content: '连接错误，请重试',
        confirmText: '重连',
        success: function(res) {
          if (res.confirm) {
            _this.onLoad(options)
          }
        }
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
    this.onLoad()
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