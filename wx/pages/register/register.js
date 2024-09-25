Page({  
  data: {  
    roleOptions: ['admin', 'user'],  
    selectedRole: '',
  },  

  // 处理角色选择变化  
  bindRoleChange: function (e) {  
    const selectedIndex = e.detail.value; // 获取选中的索引  
    this.setData({  
      selectedRole: this.data.roleOptions[selectedIndex] // 更新选中的角色状态  
    });  
  },  

  // 提交表单  
  submitForm: function(e) {  
    let formData = e.detail.value;  
    // 将选中的角色也添加到表单数据中  
    formData.role = this.data.selectedRole;  

    wx.request({  
      url: 'http://localhost:3000/api/adduser',   
      method: 'POST',  
      headers: {   
        'content-type': 'application/json'  
      },  
      data: JSON.stringify(formData), // 将表单数据序列化为 JSON 字符串  
      success: (res) => {  
        if (res.statusCode === 201) {   
          wx.showToast({  
            title: '注册成功',   
            icon: 'success',  
            duration: 2000  
          });  
        } else if (res.statusCode >= 400 && res.statusCode < 600) {   
          wx.showToast({  
            title: '注册失败: ' + (res.data && res.data.message ? res.data.message : '未知错误'),  
            icon: 'none',  
            duration: 2000  
          });  
        } else {  
          wx.showToast({  
            title: '未知的网络响应',  
            icon: 'none',  
            duration: 2000  
          });  
        }  
      },  
      fail: () => {  
        wx.showToast({  
          title: '网络请求失败',  
          icon: 'none',  
          duration: 2000  
        });  
      }  
    });  
  }  
});