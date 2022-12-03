require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const Users = require("./Model/Users");
const Books = require("./Model/Books");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    return await mongoose.connect("process.env.MONGO_URI", () => {
      console.log("Database connected Successfully");
    });
  } catch (error) {
    message: error;
    console.log("Database not connected.");
  }
};

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Api For Registration
app.post("/register", async (req, res) => {
  try {
    if (true) {
      const user = await Users.create({
        username: req.body.username,
        password: req.body.password,
      });
      res.status(200).json({
        status: "Success",
        data: {
          user,
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error,
    });
  }
});

// Api For Login User
app.post("/login", async (req, res) => {
  try {
    if (true) {
      const user = await Users.findOne({
        username: req.body.username,
        password: req.body.password,
      }).select("-password");

      if (user) {
        res.status(200).json({
          status: "Success",
          data: {
            user,
          },
        });
      } else {
        res.status(400).json({
          status: "Failed",
          data: {
            message: "Invalid Username/Password",
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "Failed",
      message: error,
    });
  }
});

// Api for add book
app.post("/addBooks", async (req, res) => {
  try {
    if (true) {
      const book = await Books.create({
        Title: req.body.Title,
        Author: req.body.Author,
        ISBN: req.body.ISBN,
        Publisher: req.body.Publisher,
        Published_Date: req.body.Published_Date,
        Description: req.body.Description,
      });

      res.status(200).json({
        status: "Success",
        data: {
          book,
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: error,
    });
  }
});

// Api for find all books
app.get("/showbook/", async (req, res) => {
  try {
    if (true) {
      const book = await Books.find();
      res.status(200).json({
        status: "Success",
        data: {
          book,
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: error,
    });
  }
});

// Api for find a book
app.get("/showbook/:id", async (req, res) => {
  try {
    if (true) {
      const book = await Books.findById({ _id: req.params.id });
      res.status(200).json({
        status: "Success",
        data: {
          book,
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: error,
    });
  }
});

// API to update a book
app.put("/editbook/:id", async (req, res) => {
  try {
    if (true) {
      const id = req.params.id;
      const mongoose_id = mongoose.Types.ObjectId.isValid(id);
      if (!mongoose_id) {
        res.status(404).json({
          status: "Failed",
          data: {
            message: `No book with id: ${id}`,
          },
        });
      }
      const book = await Books.findByIdAndUpdate(
        { _id: mongoose_id },
        {
          Title: req.body.Title,
          Author: req.body.Author,
          ISBN: req.body.ISBN,
          Publisher: req.body.Publisher,
          Published_Date: req.body.Published_Date,
          Description: req.body.Description,
        },
        { new: true }
      );
      res.status(200).json({
        status: "Success",
        data: {
          book,
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
});

// API to delete a book
app.delete("/deletebook/:id", async (req, res) => {
  try {
    if (true) {
      const book = await Books.deleteOne({ _id: req.params.id });
      res.status(200).json({
        status: "Success",
        data: {
          message: "Book deleted Successfully",
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port.`);
});
