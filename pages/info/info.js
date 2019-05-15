// pages/info/info.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: null,
    info: []
  },
  /**
   * 点击卡片事件(进入详情)
   */
  getDetailHander: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id
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
    const _this = this
    var url = ''
    var data = {}
    //普通用户查询自己记录
    if (app.globalData.userModel.sf == 'ROLE_USER') {
      url = app.globalData.url + 'weixin/getAll'
      this.setData({
        state: 'USER'
      })
    }
    //引导员查询所有大物件
    if (app.globalData.userModel.sf == 'ROLE_USHER') {
      url = app.globalData.url + 'weixin/czdjlj'
      this.setData({
        state: 'USHER'
      })
    }
    //回收站，查找自己接到的大物件记录
    if (app.globalData.userModel.sf == 'ROLE_WBLJHSZ') {
      url = app.globalData.url + 'weixin/getdwj'
      this.setData({
        state: 'WBLJHSZ'
      })
    }
    //发送请求获取记录数据
    app.myRequest2(url, {
      openId: app.globalData.openId
    }, null, function(result) {
      //console.log(result)
      var res_info
      if (result.statusCode == 200) {
        if (result.data.length > 0) {
          res_info = result.data
        } else {
          res_info = null
        }
      } else {
        res_info = {}
      }
      _this.setData({
        info: res_info
      })
    }, function(result) {
      wx.showModal({
        title: '提示',
        content: '连接服务器失败',
        confirmText: '重新连接',
        success: function(res) {
          if (res.confirm) {
            _this.onShow()
          }
        }
      })
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