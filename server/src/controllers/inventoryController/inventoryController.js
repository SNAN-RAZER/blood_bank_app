const { default: mongoose } = require("mongoose");
const inventoryModel = require("../../models/inventoryModel");
const userModel = require("../../models/userModel");

const addInventory = async (req, res) => {
  try {
    // Validate email and inventoryType
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("invalid Email");
    }

    if (req.body.inventoryType === "in" && user.userType !== "donor") {
      throw new Error("This email is not registered as a donor");
    }

    if (req.body.inventoryType === "out" && user.userType !== "hospital") {
      throw new Error("This email is not registered as  hospital");
    }

    if (req.body.inventoryType === "out") {
      // Check if inventory is available
      const requestedGroup = req.body.bloodGroup;
      const requestedQuantity = req.body.quantity;
      const organization = new mongoose.Types.ObjectId(req.body.userId);

      const totalInRequestedGroup = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "in",
            bloodGroup: requestedGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);

      const totalIn = totalInRequestedGroup[0]?.total || 0;

      const totalOutRequestedGroup = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodGroup: requestedGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);

      const totalOut = totalOutRequestedGroup[0]?.total || 0;

      const availableQuantityOfRequestGroup = totalIn - totalOut;
      if (availableQuantityOfRequestGroup < requestedQuantity) {
        throw new Error(
          `Only ${availableQuantityOfRequestGroup} units of ${requestedGroup.toUpperCase()} is available`
        );
      }

      req.body.hospital = user._id;
    } else {
      req.body.donor = user._id;
    }

    // Add inventory

    const inventory = new inventoryModel(req.body);

    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "Inventory added successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

const getInventory = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
      })
      .populate("donor")
      .populate("hospital");
    return res.status(200).send({
      success: true,
      message: "Inventory successfully fetched",
      data: inventory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

module.exports = {
  addInventory,
  getInventory,
};
