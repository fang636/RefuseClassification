// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    startBtnState: false,
    startBtnText: '指派人员处理'
  },
  /**
   * 联系用户(打电话)
   */
  callHander: function(res) {
    wx.makePhoneCall({
      phoneNumber: this.data.info.sqphone // 仅为示例，并非真实的电话号码
    })
  },
  /**
   * 处理大物件事件
   */
  startHander: function(e) {
    var id = this.data.info.id
    if (app.globalData.userModel.sf == 'ROLE_USHER') {
      wx.navigateTo({
        url: '../ydy_assign/ydy_assign?id='+id
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _this = this
    app.myRequest(app.globalData.url + 'weixin/czdjljid', {
      id: options.id
    }, null, function(result) {
      //console.log(result.data)
      var res_info
      if (result.statusCode == 200) {
        res_info = result.data
      } else {
        res_info = {}
      }
      _this.setData({
        info: res_info
      })
      //console.log(_this.data.info)
      if (_this.data.info.status == '处理中') {
        var startBtnText = '已由xxx' + '处理中';
        var startBtnState = true

        _this.setData({
          startBtnState: startBtnState,
          startBtnText: startBtnText
        })
      } else if (_this.data.info.status == '已完成') {
        _this.setData({
          startBtnState: true,
          startBtnText: '已完成'
        })
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