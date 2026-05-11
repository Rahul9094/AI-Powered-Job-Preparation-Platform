const mongoose = require("mongoose");

/**
 * Job description: string
 * resume text:String
 * self description:string
 * matchScore:number
 * 
 * techinical questions:
 * [{
 *         question:string,
 *         intention:string,
 *        answer:string
 * }] 
 * behavioral questions:
 * [{
 *         question:string,
 *         intention:string,
 *        answer:string
 * }]
 * skills gap:
 * [{
 *          skill:string,
 *          severity:{
 *              type:string,
 *              enum:["low","Hign","Medium"]}} ]
 * preparation plan:
 * [{
 *         day:Number,
 *       focus:string,
 *       tskes:[string]
 * }] 
 */

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    },
}, {
    _id: false
});
const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    },
}, {
    _id: false
});
const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"]
    }
},{
    _id: false
});
const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,   
        required: [true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    tasks: [{
        type: String,
        required: [true, "Task is required"]
    }]
},{
    _id: false
});
const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job description is required"]
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    title:{
        type:String,
        required:[true,"Title is required"]
    }
}, {
    timestamps: true
});

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = interviewReportModel;