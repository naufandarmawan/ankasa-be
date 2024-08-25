const router = require("express").Router();
const controller = require("./controller");
const reqModel = require("./request_model");
const common = require("../../../helpers/common");

// Create a new passenger
router.post("/", async (req, res) => {
  const payload = req.body;
  const validatePayload = await common.isValidPayload(
    payload,
    reqModel.createPassenger
  );
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
        message: result.err.message || "Failed to create passenger",
        code: result.err.code || 500,
      });
    }
    return res.status(201).json({
      success: true,
      data: result.data,
      message: "Passenger created successfully",
      code: 201,
    });
  };
  sendResponse(await postRequest(validatePayload));
});

// Get all passengers
router.get("/", async (req, res) => {
  const postRequest = async () => {
    return controller.getAllPassengers();
  };
  const sendResponse = async (result) => {
    if (result.err) {
      return res.status(500).json({
        success: false,
        data: "",
        message: result.err.message || "Failed to get passengers",
        code: result.err.code || 500,
      });
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: "Passengers retrieved successfully",
      code: 200,
    });
  };
  sendResponse(await postRequest());
});

// Get a single passenger by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const postRequest = async () => {
    return controller.getPassengerById(id);
  };
  const sendResponse = async (result) => {
    if (result.err) {
      return res.status(500).json({
        success: false,
        data: "",
        message: result.err.message || "Failed to get passenger",
        code: result.err.code || 500,
      });
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: "Passenger retrieved successfully",
      code: 200,
    });
  };
  sendResponse(await postRequest());
});

// Update a passenger by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const validatePayload = await common.isValidPayload(
    payload,
    reqModel.updatePassenger
  );
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return controller.updatePassenger(id, result.data);
  };
  const sendResponse = async (result) => {
    if (result.err) {
      return res.status(500).json({
        success: false,
        data: "",
        message: result.err.message || "Failed to update passenger",
        code: result.err.code || 500,
      });
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: "Passenger updated successfully",
      code: 200,
    });
  };
  sendResponse(await postRequest(validatePayload));
});

// Delete a passenger by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const postRequest = async () => {
    return controller.deletePassenger(id);
  };
  const sendResponse = async (result) => {
    if (result.err) {
      return res.status(500).json({
        success: false,
        data: "",
        message: result.err.message || "Failed to delete passenger",
        code: result.err.code || 500,
      });
    }
    return res.status(204).send();
  };
  sendResponse(await postRequest());
});

module.exports = router;
