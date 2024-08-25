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
    return controller.createCustomer(result.data);
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

router.get("/:id", jwtAuth.verifyToken, async (req, res) => {
  const userId = req.params.id;
  const getRequest = async () => {
    return controller.readCustomer(userId);
  };
  const sendResponse = async (result) => {
    if (result.err) {
      return res.status(404).json({
        success: false,
        data: "",
        message: result.err.message || "User not found",
        code: result.err.code || 404,
      });
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: "User retrieved successfully",
      code: 200,
    });
  };
  sendResponse(await getRequest());
});

// Update User
router.put("/:id", jwtAuth.verifyToken, async (req, res) => {
  const userId = req.params.id;
  const payload = req.body;
  const validatePayload = await common.isValidPayload(payload, reqModel.update);
  const putRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return controller.updateUser(userId, result.data);
  };
  const sendResponse = async (result) => {
    if (result.err) {
      return res.status(400).json({
        success: false,
        data: "",
        message: result.err.message || "Failed to update User",
        code: result.err.code || 400,
      });
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: "User updated successfully",
      code: 200,
    });
  };
  sendResponse(await putRequest(validatePayload));
});

// Delete User
router.delete("/:id", jwtAuth.verifyToken, async (req, res) => {
  const userId = req.params.id;
  const deleteRequest = async () => {
    return controller.deleteUser(userId);
  };
  const sendResponse = async (result) => {
    if (result.err) {
      return res.status(400).json({
        success: false,
        data: "",
        message: result.err.message || "Failed to delete User",
        code: result.err.code || 400,
      });
    }
    return res.status(200).json({
      success: true,
      data: "",
      message: "User deleted successfully",
      code: 200,
    });
  };
  sendResponse(await deleteRequest());
});

// Get customer profile by email
router.get("/profile", jwtAuth.verifyToken, async (req, res) => {
  const email = req.user.email; // Assuming the email is stored in the JWT token
  const getRequest = async () => {
    return controller.getCustomerProfileByEmail(email);
  };
  const sendResponse = async (result) => {
    if (result.err) {
      return res.status(result.err.code || 404).json({
        success: false,
        data: "",
        message: result.err.message || "Customer profile not found",
        code: result.err.code || 404,
      });
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: "Customer profile retrieved successfully",
      code: 200,
    });
  };
  sendResponse(await getRequest());
});

// Get all customers
router.get("/all", async (req, res) => {
  const getRequest = async () => {
    return controller.getAllCustomers();
  };
  const sendResponse = async (result) => {
    if (result.err) {
      return res.status(result.err.code || 500).json({
        success: false,
        data: "",
        message: result.err.message || "Failed to retrieve customers",
        code: result.err.code || 500,
      });
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: "Customers retrieved successfully",
      code: 200,
    });
  };
  sendResponse(await getRequest());
});

// ... existing code ...

module.exports = router;
