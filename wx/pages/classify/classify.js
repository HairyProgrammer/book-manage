// pages/classify/classify.js
let books = require('../../utils/categoryData.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchBook:undefined,
    book: [],
    show: 'false',
    showRes:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      book: books
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 搜索框
  search() {
    this.setData({
      show: 'true'
    })
  },
  // 点击取消
  hide() {
    this.setData({
      show: 'false',
      searchBook:[],
    })
  },
  // 二维码
  scanning() {
    wx.scanCode({
      scanType: 'qrCode',
      success(res) {
        console.log(res.result);
      }
    })
  },
  // 详情
  details(e) {
    console.log(e);
    let category = e.currentTarget.dataset.str
    wx.navigateTo({
      url: '../classify-details/classify-details?cate=' + category,
    })
  },
  // 输入框输入内容


  Input(event) {  
    const searchValue = event.detail.value.trim();  
    if (!searchValue) {  
      this.setData({  
        searchBook: [],  
        showRes: false  
      });  
      return;  
    }  
  
    wx.request({  
      url: 'http://localhost:3000/api/searchbook',   
      method: 'GET',  
      data: {  
        name: searchValue  
      },  
      success: (res) => {  
        if (res.statusCode === 200 && res.data && Array.isArray(res.data)) {  
          this.setData({  
            searchBook: res.data,  
            showRes: res.data.length > 0  
          });  
        } else {  
          wx.showToast({  
            title: '未找到相关图书',  
            icon: 'none'  
          });  
          this.setData({  
            searchBook: [],  
            showRes: false  
          });  
        }  
      },  
      fail: (err) => {  
        console.error('请求失败:', err);  
        wx.showToast({  
          title: '请求失败',  
          icon: 'none'  
        });  
        this.setData({  
          searchBook: [],  
          showRes: false  
        });  
      }  
    });  
  },  


})