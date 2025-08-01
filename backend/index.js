const express = require('express');
const app = express();
app.use(express.json())

const cors=require('cors');
app.use(cors());

require('./database/connection')
const complaints=require('./models/complaint')
const employee=require('./models/employees')
const customer=require('./models/register')


app.post("/registercomplaint", async(req,res)=> {
    let complain = new complaints(req.body);
    let result=await complain.save();
    res.send(result);
})

  
app.get('/getTasks', async (req, res) => {
  try {
    const items = await complaints.find();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

app.get('/getTasks/search', async (req, res) => {
  try {
    const { department, office } = req.query;
    const query = {};

    if (department) {
      query.problemtype = department;
    }
    
    // if (office) {
    //   query.area = office;
    // }

    console.log('Received query params:', req.query);
    console.log('Constructed query:', query);
    const items = await complaints.find(query);
    console.log('Found items:', items);
    res.json(items);
  } catch (error) {
    console.error('Error fetching items by department and office:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});


app.put('/setTasks/:id/progress', async (req, res) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;

    const updatedItem = await complaints.findByIdAndUpdate(id, { progress }, { new: true });
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});


app.post('/loginemployee', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await employee.findOne({ name: username , password: password });
      if (!user ) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
       return res.json({ name:user.name, email:user.email, age:user.age, salary:user.salary, department:user.department , office:user.office });
    } catch (error) {
      res.status(500).send(error);
    }
  });



  app.post('/customers', async (req, res) => {
    const user = new customer(req.body);
    try {
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.post('/logincustomer', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await customer.findOne({ username: username, password: password });
      if (!user) {
        return res.status(400).send('Customer not found');
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get('/getComplaints/search', async (req, res) => {
    try {
      const { username } = req.query;
      const query = {};
  
      if (username) {
        query.username = username;
      }
      
      console.log('Received query params:', req.query);
      console.log('Constructed query:', query);
      const items = await complaints.find(query);
      console.log('Found items:', items);
      res.json(items);
    } catch (error) {
      console.error('Error fetching items by department and office:', error);
      res.status(500).json({ error: 'Failed to fetch items' });
    }
  });

  app.delete('/deletecomplaints/:id', async (req, res) => {
    try {
      const comp = await complaints.findById(req.params.id);
      if (!comp) {
        return res.status(404).send('Complaint not found');
      }
      await comp.deleteOne({ _id: req.params.id });
      res.status(200).send({ message: 'Complaint deleted successfully' });
    } catch (error) {
      res.status(400).send(error);
    }
  });
  

 app.listen(4000);




// import express from "express"
// import mongoose from "mongoose"
// import bodyParser from "body-parser"
// import dotenv from "dotenv"

// const app=express()
// app.use(bodyParser.json());
// dotenv.config();

// const PORT = process.env.PORT || 7000;
// const MONGOURL = process.env.MONGO_URL;

// mongoose
//         .connect(MONGOURL)
//         .then(()=>{
//             console.log("DB connected successfully")
//             app.listen(PORT,()=>{
//                 console.log('Server is running on port: ${PORT} ')
//             });
//         })
//         .catch((error)=>console.log(error))


app.get('/getRoad/search', async (req, res) => {
  try {
    const { department, office } = req.query;
    const query = {};

    if (department) {
      query.problemtype = "Road";
    }

    console.log('Received query params:', req.query);
    console.log('Constructed query:', query);
    const items = await complaints.find({problemtype:"Road"});
    console.log('Found items:', items);
    res.json(items);
  } catch (error) {
    console.error('Error fetching items by department and office:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// app.get('/getRoad/search', async (req, res) => {
//   try {
    
//       query.problemType = "Road";
    
//     console.log('Received query params:', req.query);
//     console.log('Constructed query:', query);
//     const items = await complaints.find(query);
//     console.log('Found items:', items);
//     res.json(items);
//   } catch (error) {
//     console.error('Error fetching items by department and office:', error);
//     res.status(500).json({ error: 'Failed to fetch items' });
//   }
// });