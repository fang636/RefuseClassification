// pages/bigThing/bigThing.js

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '',
    explain: ''
  },
  /**
   * 联系方式改变事件
   */
  pnChangeHander: function(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
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
    var phone = this.data.phoneNumber
    if ((/(?:^1[3456789]|^9[28])\d{9}$/.test(phone))) {
      wx.showModal({
        title: '提示',
        content: '是否确认提交大物件申请？',
        success: function(res) {
          if (res.confirm) {
            wx.request({
              header: {
                'content-type': 'application/x-www-form-urlencoded',
              },
              method: 'POST',
              url: app.globalData.url + 'weixin/sqdjlj',
              data: {
                djlj: _this.data.explain,
                phone: _this.data.phoneNumber,
                useropenId: app.globalData.openId
              },
              success: function(result) {
                if (result.data) {
                  wx.switchTab({
                    url: '../index/index'
                  })
                  wx.showToast({
                    title: '操作成功',
                    duration: 2000,
                    icon: 'success'
                  })
                } else {
                  wx.showModal({
                    title: '操作失败',
                    content: '请检查是否已经存在一个大物件请求',
                    showCancel: false
                  })
                }
                console.log(result)
              },
              fail: function() {

              }
            })
          } else {
            return
          }
        }
      })


    } else {
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      phoneNumber: app.globalData.userModel.phone
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