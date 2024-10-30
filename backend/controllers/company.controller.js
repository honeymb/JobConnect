import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        console.log("-----> ", req.body);
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
        let company = await Company.findOne({ name: name });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };
        company = await Company.create({
            name: name,
            userId: req.id,
            description: req.body.description,
            website: req.body.website,
            location: req.body.location,
            logo: req.body.logo
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location, logo } = req.body;

        // const file = req.file;
        // const fileUri = getDataUri(file);
        // if (fileUri) {
        //     const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        //     const logo = cloudResponse.secure_url;    
        // } else {
        //     const logo = req.body.logo;
        // }
        const updateData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company information updated.",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}