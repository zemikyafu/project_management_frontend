import React from "react"
import WorkspaceForm from "@/components/workspace/workspace"

// const Workspaces: React.FC = () => {
//   return (
//     <div className="flex flex-col flex-1">
//       <div className="flex items-center justify-between p-4 bg-white border-b">
//         <a> Company Name</a>
//         <h1 className="text-2xl font-bold mb-4">Workspaces</h1>
//         <Workspace />
//       </div>
//     </div>
//   )
// }
const Workspaces: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Workspaces</h1>
      <WorkspaceForm />
    </div>
  )
}
export default Workspaces
