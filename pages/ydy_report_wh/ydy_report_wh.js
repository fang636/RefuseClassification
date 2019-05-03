// pages/bigThing/bigThing.js

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    explain: '',
    id: ''
  },

  /**
   * 说明文本改变事件
   */
  explainChangeHander: function(e) {
    this.setData({
      explain: e.detail.value
    })
  },
  /**
   *提交事件
   */
  submitHander: function(e) {
    const _this = this
    var id = this.data.id
    app.myRequest(app.globalData.url + 'weixin/', {
      id: id
    }, null, function(result) {

    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
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