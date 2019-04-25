// pages/violation/violation.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: '',
    array: ['垃圾乱投', '垃圾桶已满']
    
  },
  //获取编号
  QRcodeHander: function(e) {
    wx.scanCode({
      success: (res) => {
        console.log(res)
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
    })
  },
  //提交反馈
  submitHander: function(e) {
    app.myRequest('', {
      number: this.data.number,
      openId: app.globalData.openId
    }, null, function(result) {
      if (result.statusCode == '200') {
        console.log(result)
      }
    })
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