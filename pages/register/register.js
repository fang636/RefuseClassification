// pages/register/register.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    //用户输入的手机号
    phone: '',
    //用户输入的验证码
    verificationCode: '',
    //验证码按钮文字
    flag: '获取验证码',
    //验证码按钮状态(disabled)
    btnState: false

  },

  /**
   * 手机号改变事件处理
   */
  pnChangeHander: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  /**
   * 验证码改变事件处理
   */
  vftChangeHander: function(e) {
    this.setData({
      verificationCode: e.detail.value
    })
  },

  /**
   * 点击获取验证码
   */
  getVerificationHander: function() {
    var phone = this.data.phone
    if ((/(?:^1[3456789]|^9[28])\d{9}$/.test(phone))) {
      console.log('手机号通过')
      //=====================
      //发送短信请求
      //=====================
      var flag = this.data.flag
      if (flag == '获取验证码') {
        this.setData({
          btnState: true
        })
      }
      var _this = this;
      var wait = 61
      var waiting = setInterval(function() {
        _this.setData({
          flag: (--wait) + 's'
        })
        if (wait == -1) { // 清除setInterval倒计时，这里可以做很多操作，按钮变回原样等
          clearInterval(waiting)
          _this.setData({
            flag: '获取验证码',
            btnState: false
          })
        }

      }, 1000)
    } else {
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none'
      })
    }
  },

  /**
   * 点击确定的操作
   */
  startHander: function(e) {
    var _this = this
    var phone = this.data.phone
    var verificationCode = this.data.verificationCode
    // if (phoneNumber == '') {
    //   wx.showToast({
    //     title: '请先填写手机号码',
    //     icon: 'none'
    //   })
    //   return
    // }
    // if (verificationCode == '') {
    //   wx.showToast({
    //     title: '请填写验证码',
    //     icon: 'none'
    //   })
    //   return
    // }
    if (verificationCode == '1234') {
      wx.request({
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        url: app.globalData.url + 'weixin/addphone',
        data: {
          openId: app.globalData.openId,
          phone: phone
        },
        method: 'POST',
        success: function(result) {
          if (result.statusCode == 200) {
            console.log('注册手机完成')
            wx.switchTab({
              url: '../index/index',
            })
            wx.showLoading({
              title: 'loading',
              icon: 'waiting'
            })
          } else {
            wx.showModal({
              title: '网络错误',
              content: '请尝试重新连接',
              showCancel: false
            })
          }
        }
      })
    }
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    wx.hideLoading()
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