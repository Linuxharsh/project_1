const user = require('../models/user');
exports.createuser = async(req , res )=> {
  try {
    const user = await user.create(req.body);
    res.status(201).json({
      message : 'successfully created'
    })
  } catch (error) {
    res.status(400).json({
      message : 'somthing happend'
    })
  }
}