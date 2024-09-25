Page({  
  data: {  
    books: [] // 用于存储从后端获取的书籍数据  
  },  
  
  // 搜索书籍的函数，接受一个category参数  
  searchBooksByCategory: function(category) {  
    wx.request({  
      url: 'http://localhost:3000/api/searchbookbycategory', 
      method: 'GET',  
      data: {  
        category: category  
      },  
      success: (res) => { 
        if (res.statusCode === 200) {  
          this.setData({  
            books: res.data 
          });  
          wx.showToast({  
            title: '加载成功',  
            icon: 'success'  
          });  
        } else {  
          console.error('请求失败', res.statusCode);  
          wx.showToast({  
            title: '请求失败',  
            icon: 'none'  
          });  
        }  
      },  
      fail: (err) => { 
        console.error('请求失败：', err);  
        wx.showToast({  
          title: '请求失败，请稍后再试',  
          icon: 'none'  
        });  
      }  
    });  
  },  
  
  onButtonClick: function(e) {  
    const category = e.currentTarget.dataset.category; // 从按钮的data-category属性中获取类别  
    this.searchBooksByCategory(category); // 调用搜索函数  
  }  
});