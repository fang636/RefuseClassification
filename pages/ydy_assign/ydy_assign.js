// pages/ydy_report/ydy_report.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    remarks: '',
    selectText: '选择地区',
    recycleSelectText: '选择回收站',
    multiArray: [], //地区数据
    objectMultiArray: null, //详细地区数据
    itemMultiArray: [], //二级地区数据
    objectItemMultiArray: null, //详细二级地区数据
    index: [0, 0], //选择索引
    select1: null, //选择的第一项(区)
    select2: null, //第二项(小区)
    recycle: [], //回收站列表
    recycleObject: null, //回收站详细
    recycle_select: null //选择的回收站
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
        _this.setData({
          multiArray: multiArray,
          objectMultiArray: result.data
        })
        var objectItemMultiArray = _this.data.objectItemMultiArray
        if (objectItemMultiArray == null) {
          _this.getNextRegion(result.data[0].id)

        }

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
   * 取出下一级地区并加入到选项
   * parentId 父级id
   */
  getNextRegion: function(parentId) {
    const _this = this
    app.myRequest2(app.globalData.url + 'weixin/fjId', {
      id: parentId
    }, null, function(result) {
      if (result.statusCode == 200) {
        //console.log(result.data)
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
  /**
   * 根据地区获取对应的回收站
   */
  getRecycleBin: function(deptId) {
    const _this = this
    app.myRequest2(app.globalData.url + 'weixin/wbljdqid', {
      id: deptId
    }, null, function(result) {
      if (result.statusCode == 200) {
        //console.log(result.data)
        var flag = []
        for (var i in result.data) {
          flag.push(result.data[i].name)
        }
        _this.setData({
          recycle: flag,
          recycleObject: result.data
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '获取数据失败，请重试',
          confirmText: '重新连接',
          success: function(res) {
            if (res.confirm) {
              _this.getRecycleBin()
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
            _this.getRecycleBin()
          }
        }
      })
    })
  },
  remarksChangeHander: function(e) {
    this.setData({
      remarks: e.detail.value
    })
  },
  /**
   * 地区改变事件
   */
  bindMultiPickerChange: function(e) {
    var objectMultiArray = this.data.objectMultiArray
    var objectItemMultiArray = this.data.objectItemMultiArray
    var index = e.detail.value
    var select1 = objectMultiArray[index[0]]
    var select2 = objectItemMultiArray[index[1]]
    if ((select1 != null && select1 != undefined) && (select2 != null && select2 != undefined)) {
      this.data.select1 = select1
      this.data.select2 = select2
      this.getRecycleBin(select2.id)
    } else {
      wx.showToast({
        title: '请选择完整地点',
        icon: 'none',
        duration: 2500
      })
    }
    //处理bindMultiPickerColumnChange默认直接确认不刷新文本
    if (objectItemMultiArray != null) {
      if (objectItemMultiArray[index[1]] != undefined) {
        this.setData({
          selectText: '地区:' + objectMultiArray[index[0]].name + '-' + objectItemMultiArray[index[1]].name
        })
      } else {
        this.setData({
          selectText: '地区:' + objectMultiArray[index[0]].name + '-' + ''
        })
      }
    }


  },
  /**
   * 地区列表项改变时的联动
   */
  bindMultiPickerColumnChange: function(e) {
    //console.log('被修改的列：' + e.detail.column + '值为:' + e.detail.value)
    //修改第一列，获取第二列数据
    if (e.detail.column == 0) {
      //先置空数据
      this.setData({
        itemMultiArray: [],
        objectItemMultiArray: null
      })
      var currentData = this.data.objectMultiArray[e.detail.value] //获取当前选中的数据
      this.getNextRegion(currentData.id)
      this.data.index[0] = e.detail.value
    }
    this.data.index[1] = 0 //没有选择第二列时默认使用第一个
    //修改第二列...
    if (e.detail.column == 1) {
      // var currentData = this.data.objectItemMultiArray[e.detail.value]//获取当前选中的数据
      // this.getRecycleBin()
      this.data.index[1] = e.detail.value
      //console.log(this.data.select)
    }
    var objectMultiArray = this.data.objectMultiArray
    var objectItemMultiArray = this.data.objectItemMultiArray
    var index = this.data.index
    if (objectItemMultiArray != null) {
      if (objectItemMultiArray[index[1]] != undefined) {
        this.setData({
          selectText: '地区:' + objectMultiArray[index[0]].name + '-' + objectItemMultiArray[index[1]].name
        })
      } else {
        this.setData({
          selectText: '地区:' + objectMultiArray[index[0]].name + '-' + ''
        })
      }
    }
  },
  //改变回收站事件(确认是否选择了前置的地点)
  recyclePickerChange: function(e) {
    var index = e.detail.value
    var recycleObject = this.data.recycleObject
    if ((recycleObject != null) && (recycleObject.length > 0)) {
      this.data.recycle_select = recycleObject[index]
      this.setData({
        recycleSelectText: '回收站:' + recycleObject[index].name
      })
    }
  },

  /**
   *点击选择回收站时判断是否选择了前置地点
   */
  clickRecycleHander: function(e) {
    var recycleObject = this.data.recycleObject
    if (recycleObject == null) {
      wx.showToast({
        title: '请先选择地点后操作',
        icon: 'none'
      })
      return false
    }
  },
  submitHander: function(e) {
    var id = this.data.id
    var select1 = this.data.select1
    var select2 = this.data.select2
    if (select1 != null && select2 != null) {
      var recycle_select = this.data.recycle_select
      if (recycle_select != null && recycle_select != undefined) {
        var remarks = this.data.remarks
        //console.log(recycle)
        app.myRequest2(app.globalData.url + 'weixin/cldwj', {
          dwjid: id,
          clrid: app.globalData.userModel.id,
          beizhu: remarks,
          hszid: recycle_select.id
        }, null, function(result) {
          if (result.statusCode == 200) {
            if (result) {
              wx.switchTab({
                url: '../info/info'
              })
              wx.showToast({
                title: '成功'
              })
            }
          } else {
            wx.showModal({
              title: '提示',
              content: '连接服务器出现问题，请重试',
              showCancel: false
            })
          }
        }, function(result) {
          wx.showModal({
            title: '提示',
            content: '网络出现问题，请重试',
            showCancel: false
          })
        })
      } else {
        wx.showToast({
          title: '请选择回收站',
          icon: 'none',
          duration: 2500
        })
      }
    } else {
      wx.showToast({
        title: '请先选择地点',
        icon: 'none',
        duration: 2500
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
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