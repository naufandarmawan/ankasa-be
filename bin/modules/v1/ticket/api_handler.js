const router = require("express").Router();
const controller = require("./controller");
const reqModel = require("./request_model");
const common = require("../../../helpers/common");

// Create a new ticket
router.post("/", async (req, res) => {
  const payload = {
    ...req.body,
  };
  const validatePayload = await common.isValidPayload(
    payload,
    reqModel.createTicket
  );
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return controller.createTicket(result.data);
  };
  const sendResponse = async (result) => {
    if (result.err) {
      return res.status(500).json({
        success: false,
        data: "",
        message: result.err.message || "Create ticket fail",
        code: result.err.code || 500,
      });
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: "Create ticket success",
      code: 200,
    });
  };
  sendResponse(await postRequest(validatePayload));
});

// Get all tickets
router.get("/", async (req, res) => {
  const payload = {
    ...req.query,
  };
  const validatePayload = await common.isValidPayload(
    payload,
    reqModel.getTickets
  );
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return controller.getTickets(result.data);
  };
  const sendResponse = async (result) => {
    if (result.err) {
      return res.status(500).json({
        success: false,
        data: "",
        message: result.err.message || "Get tickets fail",
        code: result.err.code || 500,
      });
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: "Get tickets success",
      code: 200,
    });
  };
  sendResponse(await postRequest(validatePayload));
});

// Get ticket by ID
router.get("/:id", async (req, res) => {
  const payload = {
    id: req.params.id,
  };
  const validatePayload = await common.isValidPayload(
    payload,
    reqModel.getTicketById
  );
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return controller.getTicketById(result.data);
  };
  const sendResponse = async (result) => {
    if (result.err) {
      return res.status(result.err.code || 500).json({
        success: false,
        data: "",
        message: result.err.message || "Get ticket details fail",
        code: result.err.code || 500,
      });
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: "Get ticket details success",
      code: 200,
    });
  };
  sendResponse(await postRequest(validatePayload));
});

// Update a ticket
router.put("/:id", async (req, res) => {
  const payload = {
    id: req.params.id,
    ...req.body,
  };
  const validatePayload = await common.isValidPayload(
    payload,
    reqModel.updateTicket
  );
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return controller.updateTicket(result.data);
  };
  const sendResponse = async (result) => {
    if (result.err) {
      return res.status(result.err.code || 500).json({
        success: false,
        data: "",
        message: result.err.message || "Update ticket fail",
        code: result.err.code || 500,
      });
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: "Update ticket success",
      code: 200,
    });
  };
  sendResponse(await postRequest(validatePayload));
});

// Delete a ticket
router.delete("/:id", async (req, res) => {
  const payload = {
    id: req.params.id,
  };
  const validatePayload = await common.isValidPayload(
    payload,
    reqModel.deleteTicket
  );
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return controller.deleteTicket(result.data);
  };
  const sendResponse = async (result) => {
    if (result.err) {
      return res.status(result.err.code || 500).json({
        success: false,
        data: "",
        message: result.err.message || "Delete ticket fail",
        code: result.err.code || 500,
      });
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: "Delete ticket success",
      code: 200,
    });
  };
  sendResponse(await postRequest(validatePayload));
});

module.exports = router;
