// pages/bigThing/bigThing.js

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    explain: '',
    id: '',
    select: ['清洗', '维修'],
    selectText: null
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
   * 选择类型
   */
  selectChangeHander: function(e) {
    var select = this.data.select
    this.setData({
      selectText: '当前-' + select[e.detail.value]
    })
  },
  /**
   *提交事件
   */
  submitHander: function(e) {
    const _this = this
    var id = this.data.id
    var explain = this.data.explain
    var select = this.data.select
    var text = this.data.selectText
    if (text == null) {
      wx.showToast({
        title: '请先选择操作类型',
        icon: 'none'
      })
      return false
    }
    var flag = text.slice(3, text.length)
    var url = ''
    var data = {}
    //清洗
    if (flag == select[0]) {
      url = app.globalData.url + 'weixin/ydyqxjl'
      data = {
        ljtid: id,
        id: app.globalData.userModel.id,
        qxjl: explain
      }
      //修理
    } else if (flag == select[1]) {
      url = app.globalData.url + 'weixin/ydywxjl'
      data = {
        ljtid: id,
        id: app.globalData.userModel.id,
        wxjl: explain
      }
    }
    app.myRequest2(url, data, null, function(result) {
      if (result.statusCode == 200) {
        if (result.data) {
          wx.showToast({
            title: '操作成功'
          })
          wx.navigateBack({
            delta: 2
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '操作失败，请重试',
            showCancel: false
          })
        }
      } else {
        wx.showModal({
          title: '提示',
          content: '操作失败，请重试',
          showCancel: false
        })
      }
    }, function(result) {
      wx.showModal({
        title: '提示',
        content: '连接失败，请重试',
        showCancel: false
      })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('id=' + options.id)
    this.setData({
      id: options.id
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