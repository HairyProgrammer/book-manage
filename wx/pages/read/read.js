Page({  
  

  data: {  
    isShowUserName: false,  
    userInfo: null,  
  },  
  
  // 导航到指定页面，并处理错误  
  navigateToPage(url) {  
    wx.navigateTo({  
      url,  
    }).catch(error => {  
      console.error(`导航到 ${url} 失败:`, error);  
      this.showErrorToast('页面跳转失败');  
    });  
  },  
  
  // 显示错误提示  
  showErrorToast(message) {  
    wx.showToast({  
      title: message,  
      icon: 'none',  
    });  
  },  
  
  toManage() {  
    this.navigateToPage('./bookmanage/bookmanage');  
  },  
  
  toRelease() {  
    this.navigateToPage('./booksAdd/booksAdd');  
  },  
  
  onLoad: function (options) {  
    this.checkLoginStatus();  
  },  
  
  onShow: function (options) {  
    this.fetchUserInfo();  
  },  
  
 
  // 假设你有一个跳转到图书详情页的函数  
  bookDetail: function(e) {  
    // 这里假设你通过 data-id 传递了图书的 ID  
    let id = e.currentTarget.dataset.id;  
    wx.navigateTo({  
      url: `../classify-details/book/book?id=${id}` // 注意这里的 URL 需要根据你的项目结构来调整  
    });  
  },  


  // 检查登录状态  
  checkLoginStatus() {  
    if (!getApp().globalData.isLogin) {  
      this.navigateToPage('/pages/login/login');  
    }  
  },  
  
  // 从缓存或API获取用户信息  
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
  
  // 获取用户信息  
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
        this.showErrorToast('获取用户信息失败');  
      }  
    });  
  },  
 
});