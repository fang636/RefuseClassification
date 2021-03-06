//app.js


App({
  onLaunch: function() {
    var self = this;

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('获取到code=' + res.code)
        wx.request({
          method: 'get',
          header: {
            "Content-Type": "applciation/json"
          },
          url: this.globalData.url + 'weixin/decodeOpenId',
          data: {
            code: res.code
          },
          success: function(result) {
            if (result.data.status == 0) {
              wx.showModal({
                title: '获取用户凭证失败',
                content: '服务器可能出问题了--请退出稍后重试'
              })
              return
            }
            self.globalData.openId = result.data.openId
            console.log('获取到openid===' + self.globalData.openId)
            // 获取用户信息
            wx.getSetting({
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res => {
                      // 可以将 res 发送给后台解码出 unionId
                      self.globalData.userInfo = res.userInfo

                      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                      // 所以此处加入 callback 以防止这种情况
                      if (self.userInfoReadyCallback) {
                        self.userInfoReadyCallback(res)
                      }
                      console.log('已经授权')
                      // console.log(this.globalData.userInfo)
                      console.log('开始请求判断后台是否存在账号')
                      self.judgeUser()
                      console.log('请求结束')
                    }
                  })
                } else {
                  console.log('没有授权')
                  wx.redirectTo({
                    url: '../getUserinfo/getUserinfo'
                  })
                }
              }
            })
          }
        })
      }
    })
  },
  globalData: {
    //url: 'http://172.16.161.116/gsm/', //服务器地址
    //url: 'http://localhost/gsm/', //服务器地址
    url: 'https://baiyao.51baiyao.com/gsm/',
    userInfo: null, //微信用户基本数据
    openId: '',
    userModel: '' //后台用户对象
  },

  /**
   * 判断用户是否存在
   * return false--不存在 moda--用户信息
   */
  judgeUser: function() {
    const _this = this

    console.log('id+++++++' + _this.globalData.openId)
    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      url: _this.globalData.url + 'weixin/findOpenId',
      data: {
        openId: _this.globalData.openId
      },
      method: 'POST',
      dataType: 'json',

      success: function(result) {
        //console.log(result)
        if (result.statusCode == 200) {
          if (result.data == null || result.data == '' || result.data == false) { //没有账号信息--执行注册
            console.log('没有账号信息--执行注册')
            wx.request({
              header: {
                'content-type': 'application/x-www-form-urlencoded',
              },
              method: 'POST',
              url: _this.globalData.url + 'weixin/zhuce',
              data: {
                openId: _this.globalData.openId,
                nickName: _this.globalData.userInfo.nickName
              },
              success: function(result) {
                if (result.statusCode == 200) {
                  console.log('注册成功')
                  _this.judgeUser()
                } else {
                  wx.showModal({
                    title: '网络错误',
                    content: '请尝试重新连接',
                    showCancel: false,
                    confirmText: '重试',
                    success: function(res) {
                      if (res.confirm) {
                        _this.judgeUser()
                      }
                    }
                  })
                }
              }
            })

          }
          //判断是否绑定手机
          _this.globalData.userModel = result.data
          // console.log(result.data)
          if (result.data.phone == null) { //跳转到绑定手机
            wx.redirectTo({
              url: '../register/register'
            })
          } else {
            console.log('已存在完整账号信息---')
            wx.switchTab({
              url: '../index/index'
            })
          }
        } else {
          wx.showModal({
            title: '连接错误',
            content: '请尝试重新连接',
            showCancel: false,
            confirmText: '重试',
            success: function(res) {
              if (res.confirm) {
                _this.judgeUser()
              }
            }
          })
        }

      },
      fail: function(result) {
        console.log('judgePhone方法发送请求失败！')
        // wx.redirectTo({
        //   url: '../loading/loading'
        // })
        wx.showModal({
          title: '连接错误',
          content: '请尝试重新连接',
          showCancel: false,
          confirmText: '重试',
          success: function(res) {
            if (res.confirm) {
              _this.judgeUser()
            }
          }
        })
      }
    })
  },
  myRequest: function(url, data, type, success) {
    if (type == '' || type == null) {
      type = 'JSON'
    }
    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      url: url,
      data: data,
      type: type,
      success: success
    })
  },
  myRequest2: function(url, data, type, success, fail) {
    if (type == '' || type == null) {
      type = 'JSON'
    }
    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      url: url,
      data: data,
      type: type,
      success: success,
      fail: fail
    })
  }
})