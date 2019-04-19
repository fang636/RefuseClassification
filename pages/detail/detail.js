// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    startBtnState: false,
    startBtnText: '开始处理'
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
    const _this = this
    var title = '提示'
    var content = '是否接受申请？'
    var url = app.globalData.url + 'weixin/hwcldwj'
    var data = {
      id: this.data.info.id,
      hwopenId: app.globalData.openId
    }

    //以上为开始处理的参数


    if (_this.data.info.hw.openId == app.globalData.openId) { //确认是否为本人操作中
      content = '是否完成服务？'
      url = app.globalData.url + 'weixin/wccldwj',
        data = {
          id: this.data.info.id,
        }
    }
    wx.showModal({
      title: '提示',
      content: content,
      success: function(result) {
        if (result.confirm) {
          app.myRequest(url, data, null, function(result) {
            if (result) {
              wx.switchTab({
                url: '../info/info'
              })
              wx.showToast({
                title: '操作完成',
                image: '../../images/okay.png',
                duration: 2000
              })
            }
          })
        }
      }
    })

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
      console.log(_this.data.info)
      if (_this.data.info.status == '处理中') {
        var startBtnText = '已由' + _this.data.info.hw.nickName + '处理中';
        var startBtnState = true
        if (_this.data.info.hw.openId == app.globalData.openId) { //确认是否为本人操作中
          startBtnText = '完成服务'
          startBtnState = false
        }
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