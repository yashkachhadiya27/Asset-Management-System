import { productModel } from "../models/product.js";



class dashboardController {
    static getAIOCount = async (req, res) => {
        try {
            const products = await productModel.find({ productCategory: "All-In-One" });
            const productsCount = products.reduce((acc, product) => {
                const year = product.purchaseYear;
                if (acc[year]) {
                  acc[year]++;
                } else {
                  acc[year] = 1;
                }
                return acc;
              }, {});
            return res.success(201, "All AIOs found successfully.", productsCount);
        } catch (error) {
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        }
    }

    static getMonitorCount = async (req, res) => {
        try {
            const products = await productModel.find({ productCategory: "Monitor" });
            const productsCount = products.reduce((acc, product) => {
                const year = product.purchaseYear;
                if (acc[year]) {
                  acc[year]++;
                } else {
                  acc[year] = 1;
                }
                return acc;
              }, {});
            return res.success(201, "All Monitors found successfully.", productsCount);
        } catch (error) {
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        }
    }
    static getMouseCount = async (req, res) => {
        try {
            const products = await productModel.find({ productCategory: "Mouse" });
            const productsCount = products.reduce((acc, product) => {
                const year = product.purchaseYear;
                if (acc[year]) {
                  acc[year]++;
                } else {
                  acc[year] = 1;
                }
                return acc;
              }, {});
            return res.success(201, "All Mouse found successfully.", productsCount);
        } catch (error) {
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        }
    }
    static getKeyboardCount = async (req, res) => {
        try {
            const products = await productModel.find({ productCategory: "Keyboard" });
            const productsCount = products.reduce((acc, product) => {
                const year = product.purchaseYear;
                if (acc[year]) {
                  acc[year]++;
                } else {
                  acc[year] = 1;
                }
                return acc;
              }, {});
            return res.success(201, "All Keyboard found successfully.", productsCount);
        } catch (error) {
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        }
    }
    static getCPUCount = async (req, res) => {
        try {
            const products = await productModel.find({ productCategory: "CPU" });
            const productsCount = products.reduce((acc, product) => {
                const year = product.purchaseYear;
                if (acc[year]) {
                  acc[year]++;
                } else {
                  acc[year] = 1;
                }
                return acc;
              }, {});
            return res.success(201, "All CPU found successfully.", productsCount);
        } catch (error) {
            console.log("Transaction aborted : " + error);
            return res.error(400, error, null);
        }
    }
}

export default dashboardController;