const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
// const nodemailer = require('nodemailer');


const createUser = async (req, res) => {
  console.log("Hello world");
  //1. Get data drom the user(Fname,lname,email,password)
  console.log(req.body);
  //#.Destructuring
  const { username, email, password,   } = req.body;
  //2. validation
  if (!username || !email || !password   ) {
    return res.status(400).json({
      success: false,
      message: "please enter all fields!",
    });
  }

  //Try-catch(error handeling)
  try {
    //check if the user is already exist
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists!",
      });
    }

    //Hasing/encrypting the password
    const randomSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, randomSalt);

    //save the user in database
    const newUser = new userModel({
      username: username,
      email: email,
      password: hashPassword,
     
    });

    //Actually save the user database
    await newUser.save();

    //send the success response
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      userData: newUser,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "internal server error!",
    });
  }
};


  //login user function
  const loginUser = async (req, res) => {
    //check incomming data
    console.log(req.body);
  
    //destructuring
    const { email, password } = req.body;
  
    //validation
    if (!email || !password) {
      return res.status(400).json({
        Success: false,
        message: "please enter all fields!",
      });
    }
    try {
      //1. find user , if not : stop the process
      const user = await userModel.findOne({ email: email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "This Email is not registered",
        });
      }
      //2. compare the passeord, if not:stop the process
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({
          success: false,
          message: "Incorrect Password !",
        });
      }
      //3. generate JWT token
      //3.1 secret Decryption key(.env ma xa)
      const token = jwt.sign(
        { id: user._id, role: user.role},
        process.env.JWT_SECRET,
      );
      //4. send the token, userDate, message to the user
      res.status(200).json({
        success: true,
        message: "Login Successfully",
        token: token,
        userData: user,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
    
  };

  //get user
  const getUser = async (req, res) => {
    const user = await userModel.findById(req.user.id).select("-password -__v ");
    return res.status(200).json({
         success: true,
          data: user });
  }

// Update user details
const updateUser = async (req, res) => {
  const userId = req.params.id; // Assuming userId is passed as route parameter
  const updatedData = req.body;
  try {
      // Example: Updating user profile based on userId
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.status(200).json({ success: true, message: 'User updated successfully', user: updatedUser });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error updating user profile' });
  }
};

// profile image did not worked when i previously perfomed task so 
//it need changes 
// Update profile image
// const updateProfileImage = async (req, res) => {
//   const userId = req.params.id;

//   if (!req.files || !req.files.profileImage) {
//       return res.status(400).json({
//           success: false,
//           message: "Image not found"
//       });
//   }

//   const { profileImage } = req.files;
//   const imageName = `${Date.now()}-${profileImage.name}`;
//   const imageUploadPath = path.join(__dirname, `../public/profiles/${imageName}`);

//   try {
//       await profileImage.mv(imageUploadPath);

//       const user = await User.findById(userId);
//       if (!user) {
//           return res.status(404).json({
//               success: false,
//               message: "User not found"
//           });
//       }

//       // Delete the old profile image if it exists
//       if (user.profileImage) {
//           const oldImagePath = path.join(__dirname, `../public/profiles/${user.profileImage}`);
//           if (fs.existsSync(oldImagePath)) {
//               fs.unlinkSync(oldImagePath);
//           }
//       }

//       user.profileImage = imageName;
//       await user.save();

//       res.status(200).json({
//           success: true,
//           message: "Profile image updated successfully",
//           profileImage: imageName,
//           user: user
//       });
//   } catch (error) {
//       console.log(error);
//       res.status(500).json({
//           success: false,
//           message: "Internal server error",
//           error
//       });
//   }
// };

// Forgot Password
// const forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//       return res.status(400).json({ message: 'Email is required' });
//   }

//   try {
//       const user = await User.findOne({ email });
//       if (!user) {
//           return res.status(400).json({ message: 'User not found' });
//       }

//       // Generate OTP
//       const otp = Math.floor(100000 + Math.random() * 900000).toString();

//       // Set OTP and expiry
//       user.otpReset = otp;
//       user.otpResetExpires = Date.now() + 3600000; // 1 hour expiry
//       await user.save();

//       // Send email
//       var transporter = nodemailer.createTransport({
//           service: 'gmail',
//           auth: {
//               user: 'suyogmanandhar2022@gmail.com',
//               pass: 'esuc ialc qrof xenr'
//           }
//       });

//       var mailOptions = {
//           from: 'suyogmanandhar2022@gmail.com',
//           to: email,
//           subject: 'Password Reset OTP',
//           text: `Your OTP for password reset is: ${otp}`
//       };

//       transporter.sendMail(mailOptions, function (error, info) {
//           if (error) {
//               console.log(error);
//               return res.status(500).json({ message: 'Error sending email' });
//           } else {
//               console.log('Email sent: ' + info.response);
//               return res.status(200).json({ message: 'Password reset OTP sent' });
//           }
//       });

//   } catch (error) {
//       console.error(error); // Log the error for debugging
//       res.status(500).json({ message: 'Server error' }); // Handle server errors
//   }
// };

// // Verify OTP and Set New Password
// const verifyOtpAndPassword = async (req, res) => {
//   const { email, otp, password } = req.body;
//   console.log(otp)

//   if (!email || !otp || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//       const user = await User.findOne({ email });
//       if (!user) {
//           return res.status(400).json({ message: 'User not found' });
//       }

//       const now = Date.now();
//       const otpResetExpires = user.otpResetExpires.getTime();

//       console.log(`Current Time (ms): ${now}`);
//       console.log(`OTP Expiry Time (ms): ${otpResetExpires}`);
//       console.log(`Stored OTP: ${user.otpReset}`);
//       console.log(`Provided OTP: ${otp}`);

//       if (user.otpReset != otp) {
//           console.log('Provided OTP does not match stored OTP');
//           return res.status(400).json({ message: 'Invalid OTP' });
//       }

//       if (otpResetExpires < now) {
//           console.log('OTP has expired');
//           return res.status(400).json({ message: 'Expired OTP' });
//       }

//       const randomSalt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, randomSalt);
//       user.otpReset = undefined;
//       user.otpResetExpires = undefined;
//       await user.save();

//       res.status(200).json({ message: 'Password reset successfully' });

//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//   }
// };





module.exports={
  createUser,
  loginUser,
  getUser,
  // forgotPassword,
  // verifyOtpAndPassword,
//   updateProfileImage,
  updateUser}