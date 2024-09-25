// pages/yourPage/yourPage.js  
Page({  
  data: {  
    books: []  // 用于存储书籍信息的数组  
  },  

  onLoad: function () {  
    this.fetchBooks();  // 页面加载时获取书籍数据  
  },  

  fetchBooks: function () {  
    wx.request({  
      url: 'http://localhost:3000/api/data', 
      method: 'GET',  
      success: (res) => {  
        // 在获取书籍信息时初始化显示状态  
        const booksWithVisibleState = res.data.map(book => ({  
          ...book,  
          isDetailsVisible: false  // 添加状态控制详细信息的显示  
        }));  
        this.setData({ books: booksWithVisibleState });  // 存储数据  
      },  
      fail: (error) => {  
        console.error(error);  // 输出错误信息  
      }  
    });  
  },  

  toggleDetails: function (event) {  
    const index = event.currentTarget.dataset.index; // 获取点击的书籍索引  
    const books = this.data.books;  
    books[index].isDetailsVisible = !books[index].isDetailsVisible; // 切换状态  
    this.setData({ books }); // 更新数据  
  }  
});