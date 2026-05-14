// // import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "./services/interview.api"
// // import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "./services/interview.api"
// import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api"
// import { useContext, useEffect } from "react"
// import { InterviewContext } from "./interview.context"
// import { useParams } from "react-router"


// export const useInterview = () => {

//     const context = useContext(InterviewContext)
//     const { interviewId } = useParams()

//     if (!context) {
//         throw new Error("useInterview must be used within an InterviewProvider")
//     }

//     const { loading, setLoading, report, setReport, reports, setReports } = context

//     const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
//         setLoading(true)
//         let response = null
//         try {
//             response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
//             setReport(response.interviewReport)
//         } catch (error) {
//             console.log(error)
//         } finally {
//             setLoading(false)
//         }

//         return response.interviewReport
//     }

//     const getReportById = async (interviewId) => {
//         setLoading(true)
//         let response = null
//         try {
//             response = await getInterviewReportById(interviewId)
//             setReport(response.interviewReport)
//         } catch (error) {
//             console.log(error)
//         } finally {
//             setLoading(false)
//         }
//         return response.interviewReport
//     }

//     const getReports = async () => {
//         setLoading(true)
//         let response = null
//         try {
//             response = await getAllInterviewReports()
//             setReports(response.interviewReports)
//         } catch (error) {
//             console.log(error)
//         } finally {
//             setLoading(false)
//         }

//         return response.interviewReports
//     }

//     const getResumePdf = async (interviewReportId) => {
//         setLoading(true)
//         let response = null
//         try {
//             response = await generateResumePdf({ interviewReportId })
//             const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
//             const link = document.createElement("a")
//             link.href = url
//             link.setAttribute("download", `resume_${interviewReportId}.pdf`)
//             document.body.appendChild(link)
//             link.click()
//         }
//         catch (error) {
//             console.log(error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         if (interviewId) {
//             getReportById(interviewId)
//         } else {
//             getReports()
//         }
//     }, [ interviewId ])

//     return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf }

// }

// import { 
//     getAllInterviewReports, 
//     generateInterviewReport, 
//     getInterviewReportById, 
//     generateResumePdf 
// } from "../services/interview.api"
// import {generateInterviewReport, getInterviewReportById, getAllInterviewReports, generateResumePdf} 
// from "../services/interview.api";
import { generateInterviewReport,getInterviewReportById, getAllInterviewReports, generateResumePdf} from "../services/interview.api";
import { useContext, useEffect } from "react"
// import { InterviewContext } from "./interview.context"
import { InterviewContext } from "../services/Interview.context"
import { useParams } from "react-router"

export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    // ✅ Generate Report
    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        try {
            const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setReport(response?.interviewReport)
            return response?.interviewReport
        } catch (error) {
            console.log("Generate Report Error:", error)
            return null
        } finally {
            setLoading(false)
        }
    }

    // ✅ Get Report by ID
    const getReportById = async (id) => {
        setLoading(true)
        try {
            const response = await getInterviewReportById(id)
            setReport(response?.interviewReport)
            return response?.interviewReport
        } catch (error) {
            console.log("Get Report Error:", error)
            return null
        } finally {
            setLoading(false)
        }
    }

    // ✅ Get All Reports
    const getReports = async () => {
        setLoading(true)
        try {
            const response = await getAllInterviewReports()
            setReports(response?.interviewReports)
            return response?.interviewReports
        } catch (error) {
            console.log("Get Reports Error:", error)
            return []
        } finally {
            setLoading(false)
        }
    }

    // ✅ Download Resume PDF
    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        try {
            const response = await generateResumePdf({ interviewReportId })

            const url = window.URL.createObjectURL(
                new Blob([response], { type: "application/pdf" })
            )

            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
            link.remove()
        } catch (error) {
            console.log("PDF Download Error:", error)
        } finally {
            setLoading(false)
        }
    }

    // ✅ Auto Fetch
    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [interviewId])

    return { 
        loading, 
        report, 
        reports, 
        generateReport, 
        getReportById, 
        getReports, 
        getResumePdf 
    }
}