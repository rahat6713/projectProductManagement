const collegeModel = require("../Models/collegeModel");
const internModel = require("../Models/internModel");



const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}


const createCollege = async function (req, res) {
    try {
        let data = req.body

        let { name, fullName, logoLink } = data

        if (Object.keys(data).length == 0) {
            res.status(400).send({ status: false, msg: "BAD REQUEST" })
            return
        }
        if (!isValid(name)) {
            res.status(400).send({ status: false, msg: "name is required" })
            return
        }
        if (!isValid(fullName)) {
            res.status(400).send({ status: false, msg: "fullName is required" })
            return
        }
        if (!isValid(logoLink)) {
            res.status(400).send({ status: false, msg: "logoLink is required" })
            return
        }


        let isNameAlreadyUsed = await collegeModel.findOne({ name })
        if (isNameAlreadyUsed) {
            res.status(400).send({ status: false, msg: "name is already used" })
            return
        }
        let isFullNameAlreadyUsed = await collegeModel.findOne({ fullName })
        if (isFullNameAlreadyUsed) {
            res.status(400).send({ status: false, msg: "fullName is already used" })
            return
        }
        let isLogoLinkAlreadyUsed = await collegeModel.findOne({ logoLink })
        if (isLogoLinkAlreadyUsed) {
            res.status(400).send({ status: false, msg: "logoLink is already used" })
            return
        }
        else {
            let createCollege = await collegeModel.create(data)
            res.status(201).send({ status: true, msg: "data created successfully", data: createCollege })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}

const collegeDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName

        if (!isValid(collegeName)) {
            res.status(400).send({ status: false, msg: "collegeName is required to fetch data " })
            return
        }

        let collegeData = await collegeModel.findOne({ name: collegeName })
        if (!collegeData) {
            res.status(404).send({ status: false, msg: "details not exist with this collegeName" })
            return
        }


        let collegeId = collegeData._id
        let appliedIntern = await internModel.find({ collegeId: collegeId }).select({ name: 1, email: 1, mobile: 1 })

        let internDetails = {
            name: collegeData.name,
            fullName: collegeData.fullName,
            logoLink: collegeData.logoLink,
            interns: []
        }

        if (Object.keys(appliedIntern).length != 0) {
            internDetails.interns = appliedIntern
            res.status(200).send({ status: true, numberOfInternsApplied: appliedIntern.length, data: internDetails })
            return
        } else {
            internDetails.interns = "no intern applied to this college"
            res.status(200).send({ status: true, numberOfInternsApplied: appliedIntern.length, data: internDetails })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}

module.exports.createCollege = createCollege
module.exports.collegeDetails = collegeDetails