Page({  
  data: {  
    statusOptions: ['0', '1'], 
    selectedStatus: '',  
  },  
  
  
  submitForm: function(e) {  
    let formData = e.detail.value;  
    let role = getApp().globalData.role;
  
    // 根据role值判断是否允许发布  
    if (role !== 'admin' ) { 
      wx.showToast({  
        title: '您没有权限发布图书',  
        icon: 'none',  
        duration: 2000  
      });  
      return; // 如果没有权限，则不执行后续的发布操作  
    }  


    // 格式化时间）  
    formData.book_uploadtime = formData.book_uploadtime.replace(/-/g, '/');  
  
    // 使用wx.request调用服务器API  
    wx.request({  
      url: 'http://localhost:3000/api/addbook', 
      method: 'POST',  
      header: {  
        'content-type': 'application/json' // 设置请求头为JSON  
      },  
      data: JSON.stringify(formData), // 将formData转换为JSON字符串  
      success: function(res) {  
        if (res.statusCode === 201) { // 检查HTTP状态码  
          wx.showToast({  
            title: '发布成功',  
            icon: 'success',  
            duration: 2000  
          });  
        } else {  
          wx.showToast({  
            title: '发布失败: ' + res.data.message, // 显示具体的错误信息  
            icon: 'none',  
            duration: 2000  
          });  
        }  
      },  
      fail: function() {  
        wx.showToast({  
          title: '网络请求失败',  
          icon: 'none',  
          duration: 2000  
        });  
      }  
    });  
  }  
});