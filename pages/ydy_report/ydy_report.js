// pages/ydy_report/ydy_report.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    remarks: '',
    selectText: '选择地区',
    multiArray: [], //地区数据
    objectmMultiArray: {}, //详细地区数据
    itemMultiArray: [], //二级地区数据(可能后续用到)
    objectItemMultiArray: {} //详细二级地区数据(可能后续用到)
  },


  /**
   * 备注文本改变
   */
  remarksChangeHander: function(e) {
    this.setData({
      remarks: e.detail.value
    })
  },
  /**
   * 点击地区按钮开始选择(准备数据)
   */
  stratSelect: function(e) {

  },

  /**
   * 获取最上级地区数据
   */
  getTapData: function() {
    const _this = this
    app.myRequest2(app.globalData.url + 'weixin/sysDeptXQ', {}, null, function(result) {
      if (result.statusCode == 200) {
        var multiArray = []
        var flag = []
        for (var i in result.data) {
          flag.push(result.data[i].name)
        }
        if (flag.length == 0) {
          flag.push('无数据')
        }
        multiArray.push(flag)
        multiArray.push(['--'])
        multiArray.push(['--'])
        _this.setData({
          multiArray: multiArray,
          objectmMultiArray: result.data
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '获取数据失败，请重试',
          confirmText: '重新连接',
          success: function(res) {
            if (res.confirm) {
              _this.getTapData()
            }
          }
        })
      }
    }, function(result) {
      wx.showModal({
        title: '提示',
        content: '获取数据失败，请重试',
        confirmText: '重新连接',
        success: function(res) {
          if (res.confirm) {
            _this.getTapData()
          }
        }
      })
    })

  },

  /**
   * 取出下一级地区并回写到地区数据
   * parentId 父级id
   */
  getNextRegion: function(parentId) {
    const _this = this
    app.myRequest2(app.globalData.url + 'weixin/fjId', {
      id: parentId
    }, null, function(result) {
      if (result.statusCode == 200) {
        console.log(result.data)
        var multiArray = _this.data.multiArray //取出原有数据准备进行操作
        var flag = []
        for (var i in result.data) {
          flag.push(result.data[i].name)
        }
        if (flag.length == 0) {
          flag.push('无数据')
        }
        multiArray[1] = flag //写入二级地区数据
        _this.setData({
          multiArray: multiArray,
          itemMultiArray: flag,
          objectItemMultiArray: result.data
        })

      } else {
        wx.showModal({
          title: '提示',
          content: '获取数据失败，请重试',
          confirmText: '重新连接',
          success: function(res) {
            if (res.confirm) {
              _this.getNextRegion()
            }
          }
        })
      }
    }, function(result) {
      wx.showModal({
        title: '提示',
        content: '获取数据失败，请重试',
        confirmText: '重新连接',
        success: function(res) {
          if (res.confirm) {
            _this.getNextRegion()
          }
        }
      })
    })
  },

  bindMultiPickerColumnChange: function(e) {
    console.log('被修改的列：' + e.detail.column + '值为:' + e.detail.value)
    //修改第一列，获取第二列数据
    if (e.detail.column == 0) {
      var currentData = this.data.objectmMultiArray[e.detail.value] //获取当前选中的数据
      this.getNextRegion(currentData.id)
    }
    //修改第二列，获取第三列数据
    if (e.detail.column == 1) {

    }
  },
  submitHander: function(e) {
    //app.myRequest()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getTapData()
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