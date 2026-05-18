const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/internship-tracker")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("ERROR connecting MongoDB", err);
  })

//SCHEMA
const trackerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },

  role: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "Applied"
  },

  location: String,

  workMode: String,

  appliedDate: Date,

  salary: Number,

  jobLink: String,

  notes: String
}
,
  {timestamps:true});
//MODEL
const Tracker = mongoose.model("tracker", trackerSchema);
//ROUTES
/*app.get("/api/users", (req, res) => {
  return res.json(users);
});*/

app.get("/api/users", async (req, res) => {
  const allUsers = await Tracker.find({});
  const html = `
  <ul>
    ${allUsers.map((user)=>{ return`
      <li>
        ${user.appliedDate} - ${user.companyName}
      </li>`
      }).join("")}
  </ul>`
  return res.send(html);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => {
    return user.id === id;
  });
  return res.json(user);
});

/*app.post("/api/users", (req, res) => {
  const data = req.body;
  users.push({ id: users.length + 1, ...data });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    if (err) return res.send("ERROR writing Data in File");
    return res.json({
      message: "DATA added Successfully",
      data: users
    });
  });

});*/

app.post("/api/users", async (req, res)=>{
  const body = req.body;
  if(!body ||
    !body.companyName ||
    !body.role){
      return res.status(400).json({
        "message":"All Fields are Required"
      })
    }
  const result = await Tracker.create({
  companyName: body.companyName,

  role: body.role,

  status: body.status,

  location: body.location,

  workMode: body.workMode,

  appliedDate: body.appliedDate,

  salary: body.salary,

  jobLink: body.jobLink,

  notes: body.notes
  }
);

  return res.status(201).json({
    "message":"SUCCESS"
  })
});

/*app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => {
    return user.id === id;
  })
  if (!user) return res.send("User NOT Found!!!");
  if (user.status === "Applied") user.status = "Interview";
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) return res.send("ERROR updating Data in File");
    return res.json({
      "message": "Data UPDATED",
      "data": user
    });
  });

}
);*/
app.put("/api/users/:id", async(req, res)=>{
  try{
  const updated = await Tracker.findByIdAndUpdate(req.params.id , req.body);
  return res.status(200).json({
    "message" : "Data Updated",
    "data" : updated
  })
  }
  catch(err){
    res.status(400).json({
      "message":"ERROR updating Data",
      "Error": err
    })
  }

});


/*app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((user)=>{
    return user.id===id;
  });
  if (index===-1) return res.send("User NOT Found!!!");

  const deletedUser =  users.splice(index, 1);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) return res.send("ERROR deleting Data in File");
    return res.json({
      "mesaage": "Data DELETED",
      "data": deletedUser
    });
  })
});*/

app.delete("/api/users/:id", async(req, res)=>{
  try{
  await Tracker.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    "message" : "Data DELETED!!!"
  })}
  catch(err){
    res.status(400).json({
      "message":"ERROR deleting Data",
      "Error": err
    })
  }

});

app.listen(PORT, (err) => {
  if (err) console.log("Error while running the server");
  console.log("Server is runnig at PORT : ", PORT);

});