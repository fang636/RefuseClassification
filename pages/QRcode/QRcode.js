// pages/QRcode/QRcode.js
const app = getApp()
const QR = require('../../utils/weapp-qrcode.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcodeURL: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //准备数据并生成二维码
    var state = options.state
    var myData =
      '{"openId":"' +
      app.globalData.openId +
      '","state":"' +
      state +
      '"}'
    //console.log(JSON.parse(myData))
    var imgData = QR.drawImg(myData, {
      typeNumber: 4,
      errorCorrectLevel: 'M',
      size: 500
    })
    this.setData({
      qrcodeURL: imgData
    })

    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      url: app.globalData.url + 'fd/weixin/qrfd',
      method: 'POST',
      data: {
        state: state,
        bh: '233',
        openId: app.globalData.openId,
        ljdbh:'aaaaaaaaa'
      }
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