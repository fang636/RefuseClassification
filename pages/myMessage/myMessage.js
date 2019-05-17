// pages/myMessage/myMessage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userModel: null,
    userType: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var userType = ''
    var user = app.globalData.userModel
    if (user.sf == 'ROLE_USER') {
      userType = '普通用户'
    }
    if (user.sf == 'ROLE_USHER') {
      userType = '引导员'
    }
    if (user.sf == 'ROLE_WBLJHSZ') {
      userType = '回收站'
    }
    this.setData({
      userModel: user,
      userType: userType
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