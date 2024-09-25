const express = require('express');  // 引入express  
const mysql = require('mysql2/promise');  
  
const app = express();  
const port = 3000;  
  
const dbConfig = {  
    host: 'localhost',  
    user: 'root',  
    database: 'px_cloudlibrary',  
    password: '2021304358',  
};  
  
// 中间件，用于解析JSON格式的请求体  
app.use(express.json());  
  
// 获取图书列表  
app.get('/api/data', async (req, res) => {  
    let connection;  
    try {  
        connection = await mysql.createConnection(dbConfig);  
        const [rows] = await connection.execute('SELECT * FROM book');  
        res.json(rows);  
    } catch (error) {  
        console.error('Error connecting to the database:', error);  
        res.status(500).send('Error connecting to the database');  
    } finally {  
        if (connection) {  
            await connection.end();  // 确保连接关闭  
        }  
    }  
});  
  
// 添加图书  
app.post('/api/addbook', async (req, res) => {  
    let connection;  
    try {  
        const {  
            book_name,  
            book_isbn,  
            book_press,  
            book_author,  
            book_pagination,  
            book_price,  
            book_uploadtime,  
            book_status,  
            book_borrower,  
            book_borrowtime,  
            book_returntime,
            book_category,
        } = req.body;  
  
        // 检查必填字段  
        if (!book_name || !book_author) {  
            return res.status(400).send('Book name and author are required.');  
        }  
  
        // 将未定义的字段设置为 null  
        const params = [  
            book_name,  
            book_isbn || null,  
            book_press || null,  
            book_author,  
            book_pagination || null,  
            book_price || null,  
            book_uploadtime || null,  
            book_status || null,  
            book_borrower || null,
            book_category || null,  
            book_borrowtime ? new Date(book_borrowtime) : null, // 假设是时间戳或日期字符串，可能需要转换  
            book_returntime ? new Date(book_returntime) : null  // 同上  
        ];  
  
        connection = await mysql.createConnection(dbConfig);  
        const [result] = await connection.execute(  
            'INSERT INTO book (book_name, book_category, book_isbn, book_press, book_author, book_pagination, book_price, book_uploadtime, book_status, book_borrower, book_borrowtime, book_returntime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',  
            params  
        );  
  
        res.status(201).json({  
            message: 'Book added successfully.',  
            bookId: result.insertId  
        });  
    } catch (error) {  
        console.error('Error adding book to the database:', error);  
        res.status(500).send('Error adding book to the database');  
    } finally {  
        if (connection) {  
            await connection.end();  
        }  
    }  
});

// 根据名称搜索图书  
app.get('/api/searchbook', async (req, res) => {  
    let connection;  
    try {  
        const { name } = req.query; // 从查询参数中获取名称  
  
        if (!name) {  
            return res.status(400).send('Book name is required.');  
        }  
  
        connection = await mysql.createConnection(dbConfig);  
        // 假设你有一个字段叫`book_name`用于存储书名  
        // 使用LIKE操作符进行模糊匹配，%表示任意字符出现任意次数  
        const [rows] = await connection.execute('SELECT * FROM book WHERE book_name LIKE ?', [`%${name}%`]);  
  
        if (rows.length === 0) {  
            return res.status(404).send('No books found with the given name.');  
        }  
  
        res.json(rows); // 返回匹配到的图书列表  
    } catch (error) {  
        console.error('Error searching books in the database:', error);  
        res.status(500).send('Error searching books in the database');  
    } finally {  
        if (connection) {  
            await connection.end();  
        }  
    }  
});  

//根据类别搜索图书
app.get('/api/searchbookbycategory', async (req, res) => {    
    let connection;    
    try {    
        const { category } = req.query; // 从查询参数中获取类别    
    
        if (!category) {    
            return res.status(400).send('Category is required.');    
        }    
    
        connection = await mysql.createConnection(dbConfig);    
        // 使用=操作符进行完全匹配，不使用%作为通配符    
        const [rows] = await connection.execute('SELECT * FROM book WHERE book_category = ?', [category]);    
    
        if (rows.length === 0) {    
            return res.status(404).send('No books found with the given category.');    
        }    
    
        res.json(rows); // 返回匹配到的图书列表    
    } catch (error) {    
        console.error('Error searching books by category in the database:', error);    
        res.status(500).send('Error searching books by category in the database');    
    } finally {    
        if (connection) {    
            await connection.end();    
        }    
    }    
});



// 用户登录  
app.post('/api/login', async (req, res) => {  
    let connection;  
    try {  
        const { username, password } = req.body;  
  
        if (!username || !password) {  
            return res.status(400).send('Username and password are required.');  
        }  
  
        connection = await mysql.createConnection(dbConfig);  
        // 注意：这里为了简化示例，我们假设密码是明文存储的。  
        // 在实际应用中，你应该使用bcrypt的compare函数来比较密码。  
        const [rows] = await connection.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);  
  
        if (rows.length === 0) {  
            return res.status(401).send('Invalid username or password.');  
        }  
  
        // 登录成功，你可以在这里返回用户信息或仅返回一个成功消息  
        // 注意：出于安全考虑，不应该在响应中返回密码  
        const user = rows[0];  
        delete user.password; // 移除密码字段  
  
        res.json({  
            message: 'Login successful.',  
            user: user  ,
            success:true
        });  
    } catch (error) {  
        console.error('Error logging in user:', error);  
        res.status(500).send('Error logging in user');  
    } finally {  
        if (connection) {  
            await connection.end();  
        }  
    }  
});  



 
// 添加用户  
app.post('/api/adduser', async (req, res) => {  
    let connection;  
    try {  
        const {  
            username,  
            password,  
            role  
        } = req.body;  


        const params = [  
            username ||'px',  
            password || null,  
            role || 'user'
        ];  
  
        
        connection = await mysql.createConnection(dbConfig);   
        const [result] = await connection.execute(  
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',  
            params 
        );  
  
        res.status(201).json({  
            message: 'User added successfully.',   
            userId: result.insertId 
        });  
    } catch (error) {  
        console.error('Error adding user to the database:', error);  
        res.status(500).send('Error adding user to the database');  
    } finally {  
        if (connection) {  
            await connection.end();  
        }  
    }  
});



  
app.listen(port, () => {  
    console.log(`Server is running at httP://localhost:${port}`);  
});