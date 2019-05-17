// pages/my/my.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    basicInfo: ''
  },
  clickBasicHander: function(e) {
    wx.navigateTo({
      url: '../myMessage/myMessage'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //var basicInfo = ''
    var user = app.globalData.userModel
    // if (user.sf == 'ROLE_USER') {
    //   basicInfo = user.parentName
    // }
    // if (user.sf == 'ROLE_USHER') {
    //   basicInfo = user.parentName + '-引导员'
    // }
    // if (user.sf == 'ROLE_WBLJHSZ') {
    //   basicInfo = user.parentName + '-回收站'
    // }
    this.setData({
      userInfo: app.globalData.userInfo,
      basicInfo: user.parentName
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