// import { useState } from 'react'
// import {RouterProvider} from "react-router-dom";
import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { AuthProvider } from "./features/auth/Auth.context.jsx";
// import { InterviewProvider } from "./features/auth/interview/services/interview.context.jsx";
// import {InterviewProvider}
//  from "./features/auth/interview/hooks/interview.context.jsx"
import {InterviewProvider} from "./features/auth/interview/services/Interview.context.jsx"
function App() {

  return (
    <>
    <AuthProvider>
      <InterviewProvider>
    <RouterProvider router={router}/>
      </InterviewProvider>
    </AuthProvider>
    </>
  )
}

export default App
