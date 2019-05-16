// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    info: {},
    startBtnState: false,
    startBtnText: '指派人员处理',
    startHanderView: '' //处理方法(方法名)
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
   * 引导员处理大物件
   */
  ydy_startHander: function(e) {
    var id = this.data.info.id
    wx.navigateTo({
      url: '../ydy_assign/ydy_assign?id=' + id
    })

  },
  /**
   * 回收站开始处理大物件
   */
  hsz_startHander: function(e) {
    const self = this
    var id = this.data.info.id
    wx.showModal({
      title: '操作提示',
      content: '是否开始处理该大物件？',
      success: function(res) {
        if (res.confirm) {
          qpp.myRequest2(app.globalData.url + 'weixin/seekdwj', {
            id: id
          }, null, function(result) {
            if (result.statusCode == 200) {
              if (result) {
                wx.switchTab({
                  url: '../info/info'
                })
                wx.showToast({
                  title: '完成',
                  duration: 2000
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: '操作失败，请刷新后重试',
                  showCancel: false
                })
              }
            } else {
              wx.showModal({
                title: '提示',
                content: '连接失败，请刷新后重试',
                showCancel: false
              })
            }

          }, function(result) {
            wx.showModal({
              title: '提示',
              content: '连接失败，请检查网络后重试',
              showCancel: false
            })
          })
        }
      }
    })
  },
  /**
   * 回收站确认完成大物件
   */
  hsz_completeHander: function(e) {
    const self = this
    var id = this.data.info.id
    wx.showModal({
      title: '操作提示',
      content: '是否确认已完成？',
      success: function(res) {
        if (res.confirm) {
          qpp.myRequest2(app.globalData.url + 'weixin/confirmdwj', {
            id: id
          }, null, function(result) {
            if (result.statusCode == 200) {
              if (result) {
                wx.switchTab({
                  url: '../info/info'
                })
                wx.showToast({
                  title: '完成',
                  duration: 2000
                })

              } else {
                wx.showModal({
                  title: '提示',
                  content: '操作失败，请刷新后重试',
                  showCancel: false
                })
              }
            } else {
              wx.showModal({
                title: '提示',
                content: '连接失败，请刷新后重试',
                showCancel: false
              })
            }

          }, function(result) {
            wx.showModal({
              title: '提示',
              content: '连接失败，请检查网络后重试',
              showCancel: false
            })
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.id = options.id
    const _this = this

    var user = app.globalData.userModel
    var success = null
    if (user.sf == 'ROLE_USHER') {
      success = function(result) {
        //console.log(result.data)
        var res_info
        if (result.statusCode == 200) {
          res_info = result.data
        } else {
          res_info = {}
        }
        _this.setData({
          info: res_info,
          startHanderView: 'ydy_startHander'
        })
        //console.log(_this.data.info)
        if (_this.data.info.status == '已审核') {
          var startBtnText = '已指派' + _this.data.info.wbljhsz.name + '处理中';
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
      }
    }


    if (user.sf == 'ROLE_WBLJHSZ') {
      success = function(result) {
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
        if (_this.data.info.status == '已审核') {
          _this.setData({
            startBtnText: '开始处理',
            startHanderView: 'hsz_startHander'
          })
        } else if (_this.data.info.status == '已出发') {
          _this.setData({
            startBtnText: '处理完成',
            startHanderView: 'hsz_completeHander'
          })
        } else if (_this.data.info.status == '已完成') {
          _this.setData({
            startBtnState: true,
            startBtnText: '已完成'
          })
        }
      }
    }



    app.myRequest2(app.globalData.url + 'weixin/czdjljid', {
      id: _this.data.id
    }, null, success, function(result) {
      wx.showModal({
        title: '提示',
        content: '连接失败，请检查网络后重试',
        confirmText: '重新连接',
        success: function(res) {
          if (res.confirm) {
            _this.onLoad()
          }
          if (res.cancel) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
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