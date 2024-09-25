// login.js  
Page({  
  data: {  
    username: '',  
    password: ''  
  },  
    
  // 绑定表单提交事件  
  formSubmit: function(e) {  
    this.setData({  
      username: e.detail.value.username,  
      password: e.detail.value.password  
    });  
    // 调用登录函数  
    this.login();  
  },  
    

  
  login: function() {  
    // 确保用户名和密码不为空  
    if (!this.data.username || !this.data.password) {  
      wx.showToast({  
        title: '用户名或密码不能为空',  
        icon: 'none'  
      });  
      return;  
    }  
      
    // 发送登录请求到服务器  
    wx.request({  
      url: 'http://localhost:3000/api/login', 
      data: {  
        username: this.data.username,  
        password: this.data.password  
      },  
      method: 'POST',  
      success: function(res) {  
        if (res.data.success) {  
          // 登录成功，更新全局登录状态  
          getApp().globalData.isLogin = true;  
          getApp().globalData.role=res.data.user.role;
          // 跳转到主页或其他页面  
          wx.switchTab({  
            url: '/pages/mine/mine'  
          });  
        } else {  
          // 登录失败处理  
          wx.showToast({  
            title: '登录失败：' + res.data.message || '未知错误',  
            icon: 'none'  
          });  
        }  
      },  
      fail: function(err) {  
        // 请求失败处理  
        wx.showToast({  
          title: '请求失败，请稍后再试',  
          icon: 'none'  
        });  
      }  
    });  
  },

  goToRegister: function() {  
    wx.navigateTo({  
      url: '/pages/register/register' 
    });  
  }  

  
})