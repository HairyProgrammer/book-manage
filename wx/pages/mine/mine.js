// pages/mine/mine.js  
Page({  
  data: {  
    
  },  
  
  toManage() {  
    this.navigateToPage('./bookmanage/bookmanage');  
  },  
  
  toRelease() {  
    this.navigateToPage('./booksAdd/booksAdd');  
  },  
  
  navigateToPage(url) {  
    wx.navigateTo({  
      url,  
    }).catch(error => {  
      console.error(`导航到 ${url} 失败:`, error);  
      this.showErrorToast('页面跳转失败');  
    });  
  },  
 
  
  onLoad: function (options) {  
    
  },  
  
  onShow: function (options) {  
    
  },  
  
// 私有方法：从缓存或API获取用户信息  
fetchUserInfo() {  
  const user = wx.getStorageSync('user');  
  if (user && user.nickName) {  
    this.setData({  
      isShowUserName: true,  
      userInfo: user,  
    });  
  } else {  
    this.getUserProfile();  
  }  
},  

// 私有方法：获取用户信息  
getUserProfile() {  
  wx.getUserProfile({  
    desc: '用于完善资料',  
    success: (res) => {  
      console.log("获取用户信息成功", res);  
      let user = res.userInfo;  
      wx.setStorageSync('user', user);  
      this.setData({  
        isShowUserName: true,  
        userInfo: user,  
      });  
    },  
    fail: (res) => {  
      console.error("获取用户信息失败", res);  
      wx.showToast({  
        title: '获取用户信息失败',  
        icon: 'none'  
      });  
    }  
  });  
},  
  
  // ... 其他生命周期函数和事件处理函数 ...  
  
  // 分享功能  
  onShareAppMessage: function () {  
    return {  
      title: "图书管理系统",  
      imageUrl: '/images/img/book10.jpg', // 确保路径正确  
      path: '/pages/index/index' // 默认显示的页面路径  
    };  
  },  
  
  // ... 其他可能的事件处理函数 ...  
});