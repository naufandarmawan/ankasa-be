const util = require('util')
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const model = require('./model');
const common = require('../../../helpers/common');

const getProfile = async (payload) => {
  const result = await model.findByEmail(payload)
  if(result.err) {
    return result;
  }

  delete result.data.password;
  return {
    err: null,
    data: result.data
  }
}

const updateProfile = async (payload) => {
  const result = await model.findByEmail(payload)
  if(result.err) {
    return result;
  }

  payload.id_user = result.data.id;
  const profileObj = {
    fullname: payload.fullname
  }
  if(payload.photo) {
    const file = payload.photo;
    const newFileName = uuidv4() + path.extname(file.name)
    const uploadPath = "./bin/assets/file/" + newFileName
    await util.promisify(file.mv)(uploadPath)
    if(result.data.file_name) {
      fs.unlink("./bin/assets/file/"+result.data.file_name, (err) => {
        if (err) console.log('error delete file => ', err);;
      });
    }
    profileObj.file_name = newFileName;
    profileObj.file_path = "/files";
  }
  
  const update = await model.updateOne(profileObj, payload);
  if(update.err) {
    return update;
  }

  delete update.data.password;
  return {
    err: null,
    data: update.data
  }
}

const deletePhoto = async (payload) => {
  const result = await model.findByEmail(payload)
  if(result.err) {
    return result;
  }

  if(result.data.file_name) {
    fs.unlink("./bin/assets/file/"+result.data.file_name, (err) => {
      if (err) console.log('error delete file => ', err);;
    });

    payload.id_user = result.data.id;
    const profileObj = {
      file_name: null,
      file_path: null
    }
    const update = await model.updateOne(profileObj, payload);
    if(update.err) {
      return update;
    }

    delete update.data.password;
    return {
      err: null,
      data: update.data
    }
  }
  
  delete result.data.password;
  return {
    err: null,
    data: result.data
  }
}

const changePassword = async (payload) => {
  const result = await model.findByEmail(payload)
  if(result.err) {
    return result;
  }

  payload.id_user = result.data.id;
  if(await common.decryptHash(payload.old_password, result.data.password)) {
    const userObj = {
      password: await common.generateHash(payload.new_password)
    };

    const update = await model.updateOne(userObj, payload);
    if(update.err) {
      return update;
    }
    
    return {
      err: null,
      data: ''
    }
  }

  return {
    err: { message: 'password is wrong!', code: 401 },
    data: null
  }
}

const getUsers = async (payload) => {
  const rsUsers = await model.findAll(payload);
  if(rsUsers.err) {
    return rsUsers;
  }

  rsUsers.data = {
    current_page: payload.page,
    page_size: payload.limit,
    total_page: Math.ceil(rsUsers.data.count / payload.limit),
    ...rsUsers.data
  }

  return {
    err: null,
    data: rsUsers.data
  }
}
const deleteUser = async (payload)=>{
  const result = await model.deleteOne(payload.id)
  console.log(result);
  if (result.err) {
    return result;
  }
  if(result.data <1){
    return {
      err: { message: 'User not found!', code: 404 },
      data: null
    }
  }
  return {
    err: null,
    data: {id: payload.id}
  }
}

const create = async (payload) => {
  const result = await model.findByEmail(payload)
  if(result.err) {
    if(result.err.code != 404) {
      return result;
    }

    const userObj = {
      email: payload.email,
      fullname: payload.fullname,
      password: await common.generateHash(payload.password),
      role: payload.role,
      file_name: null,
      file_path: null,
      division_id: payload.division_id
    };

    const insert = await model.insertOne(userObj);
    if(insert.err) {
      return insert;
    }
    
    return {
      err: null,
      data: insert.data
    }
  }

  return {
    err: { message: 'email is already taken!', code: 409 },
    data: null
  }
}

const update = async (payload) => {
  const checkUser = await model.findOne(payload)
  if(checkUser.err) {
    return checkUser;
  }

  if(checkUser.data.email != payload.email) {
    const result = await model.findByEmail(payload)
    if(result.err) {
      if(result.err.code != 404) {
        return result;
      }
    }
    if(!result.err) {
      return {
        err: { message: 'email is already taken!', code: 409 },
        data: null
      }
    }
  }
  console.log('isi division id :', payload.division_id);

  const userObj = {
    email: payload.email,
    fullname: payload.fullname,
    role: payload.role,
    division_id: payload.division_id
  };
  if (payload.password){
    userObj.password = await common.generateHash(payload.password)
  }

  const update = await model.updateOne(userObj, payload);
  if(update.err) {
    return update;
  }
  
  return {
    err: null,
    data: update.data
  }
}

module.exports = {
  getProfile,
  updateProfile,
  deletePhoto,
  changePassword,
  getUsers,
  create,
  update,
  deleteUser
}