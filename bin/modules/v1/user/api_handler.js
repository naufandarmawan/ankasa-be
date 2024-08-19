const router = require("express").Router();
const controller = require("./controller");
const reqModel = require("./request_model");
const common = require("../../../helpers/common");
const jwtAuth = require("../../../helpers/authentication");

router.post("/", async (req, res) => {
  const payload = req.body;
  const validatePayload = await common.isValidPayload(payload, reqModel.create);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return controller.createPassenger(result.data);
  };
  const sendResponse = async (result) => {
    if (result.err) {
      return res.status(500).json({
        success: false,
        data: "",
        message: result.err.message || "Failed to create User",
        code: result.err.code || 500,
      });
    }
    return res.status(201).json({
      success: true,
      data: result.data,
      message: "User created successfully",
      code: 201,
    });
  };
  sendResponse(await postRequest(validatePayload));
});

// router.get('/', jwtAuth.verifyToken, jwtAuth.isAdmin, async(req, res) => {
//   const payload = {
//     ...req.query
//   };
//   const validatePayload = await common.isValidPayload(payload, reqModel.getUsers);
//   const postRequest = async (result) => {
//     if(result.err) {
//       return result;
//     }
//     return controller.getUsers(result.data);
//   };
//   const sendResponse = async (result) => {
//     if(result.err) {
//       return res.status(500).json({
//         success: false,
//         data: '',
//         message: result.err.message || 'Get users fail',
//         code: result.err.code || 500
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       data: result.data,
//       message: 'Get users success',
//       code: 200
//     });
//   };
//   sendResponse(await postRequest(validatePayload));
// });

// router.get('/profile', jwtAuth.verifyToken, async(req, res) => {
//   const payload = {
//     email: req.decodedToken.email
//   };
//   const validatePayload = await common.isValidPayload(payload, reqModel.getProfile);
//   const postRequest = async (result) => {
//     if(result.err) {
//       return result;
//     }
//     return controller.getProfile(result.data);
//   };
//   const sendResponse = async (result) => {
//     if(result.err) {
//       return res.status(500).json({
//         success: false,
//         data: '',
//         message: result.err.message || 'Get Profile fail',
//         code: result.err.code || 500
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       data: result.data,
//       message: 'Get Profile success',
//       code: 200
//     });
//   };
//   sendResponse(await postRequest(validatePayload));
// });

// router.put('/update-profile', jwtAuth.verifyToken, async(req, res) => {
//   const payload = {
//     email: req.decodedToken.email,
//     ...req.body,
//     photo: req.files ? req.files.photo : undefined,
//     size: req.files ? req.files.photo.size : undefined,
//     ext: req.files ? req.files.photo.name.split('.').pop() : undefined
//   };
//   const validatePayload = await common.isValidPayload(payload, reqModel.updateProfile);
//   const postRequest = async (result) => {
//     if(result.err) {
//       return result;
//     }
//     return controller.updateProfile(result.data);
//   };
//   const sendResponse = async (result) => {
//     if(result.err) {
//       return res.status(500).json({
//         success: false,
//         data: '',
//         message: result.err.message || 'Update profile fail',
//         code: result.err.code || 500
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       data: result.data,
//       message: 'Update profile success',
//       code: 200
//     });
//   };
//   sendResponse(await postRequest(validatePayload));
// });

// router.delete('/photo', jwtAuth.verifyToken, async(req, res) => {
//   const payload = {
//     email: req.decodedToken.email,
//   };
//   const validatePayload = await common.isValidPayload(payload, reqModel.getProfile);
//   const postRequest = async (result) => {
//     if(result.err) {
//       return result;
//     }
//     return controller.deletePhoto(result.data);
//   };
//   const sendResponse = async (result) => {
//     if(result.err) {
//       return res.status(500).json({
//         success: false,
//         data: '',
//         message: result.err.message || 'Delete photo fail',
//         code: result.err.code || 500
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       data: result.data,
//       message: 'Delete photo success',
//       code: 200
//     });
//   };
//   sendResponse(await postRequest(validatePayload));
// });

// router.delete('/:id_user', jwtAuth.verifyToken, jwtAuth.isAdmin, async (req, res) => {
//   console.log('isi params', req.params);
//   const payload = {
//     email: req.decodedToken.email,
//     id: req.params.id_user
//   };
//   const validatePayload = await common.isValidPayload(payload, reqModel.deleteUser);
//   const postRequest = async (result) => {
//     if (result.err) {
//       return result;
//     }
//     return controller.deleteUser(result.data);
//   };
//   const sendResponse = async (result) => {
//     if (result.err) {
//       return res.status(result.err.code || 500).json({
//         success: false,
//         data: '',
//         message: result.err.message || 'Delete user fail',
//         code: result.err.code || 500
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       data: result.data,
//       message: 'Delete delete success',
//       code: 200
//     });
//   };
//   sendResponse(await postRequest(validatePayload));
// });

// router.put('/change-password', jwtAuth.verifyToken, async(req, res) => {
//   const payload = {
//     email: req.decodedToken.email,
//     ...req.body
//   };
//   const validatePayload = await common.isValidPayload(payload, reqModel.changePassword);
//   const postRequest = async (result) => {
//     if(result.err) {
//       return result;
//     }
//     return controller.changePassword(result.data);
//   };
//   const sendResponse = async (result) => {
//     if(result.err) {
//       return res.status(500).json({
//         success: false,
//         data: '',
//         message: result.err.message || 'Change password fail',
//         code: result.err.code || 500
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       data: result.data,
//       message: 'Change password success',
//       code: 200
//     });
//   };
//   sendResponse(await postRequest(validatePayload));
// });

// router.post('/', jwtAuth.verifyToken, jwtAuth.isAdmin, async(req, res) => {
//   const payload = {
//     ...req.body
//   };
//   const validatePayload = await common.isValidPayload(payload, reqModel.create);
//   const postRequest = async (result) => {
//     if(result.err) {
//       return result;
//     }
//     return controller.create(result.data);
//   };
//   const sendResponse = async (result) => {
//     if(result.err) {
//       return res.status(500).json({
//         success: false,
//         data: '',
//         message: result.err.message || 'Create user fail',
//         code: result.err.code || 500
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       data: result.data,
//       message: 'Create user success',
//       code: 200
//     });
//   };
//   sendResponse(await postRequest(validatePayload));
// });

// router.put('/:id_user', jwtAuth.verifyToken, jwtAuth.isAdmin, async(req, res) => {
//   const payload = {
//     id_user: req.params.id_user,
//     ...req.body
//   };
//   const validatePayload = await common.isValidPayload(payload, reqModel.update);
//   const postRequest = async (result) => {
//     if(result.err) {
//       return result;
//     }
//     return controller.update(result.data);
//   };
//   const sendResponse = async (result) => {
//     if(result.err) {
//       return res.status(500).json({
//         success: false,
//         data: '',
//         message: result.err.message || 'Update user fail',
//         code: result.err.code || 500
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       data: result.data,
//       message: 'Update user success',
//       code: 200
//     });
//   };
//   sendResponse(await postRequest(validatePayload));
// });

module.exports = router;
