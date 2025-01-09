export const PERMISSION_GROUPS = {
    Company: ["COMPANY-READ", "COMPANY-READ-ALL", "COMPANY-UPDATE", "COMPANY-DELETE"],
    Workspace: [
      "WORKSPACE-CREATE",
      "WORKSPACE-READ",
      "WORKSPACE-READ-ALL",
      "WORKSPACE-UPDATE",
      "WORKSPACE-DELETE"
    ],
    Project: [
      "PROJECT-CREATE",
      "PROJECT-READ",
      "PROJECT-READ-ALL",
      "PROJECT-UPDATE",
      "PROJECT-DELETE"
    ],
    Task: ["TASK-CREATE", "TASK-READ", "TASK-READ-ALL", "TASK-UPDATE", "TASK-DELETE"]
  } as const
  
  export const INITIAL_ROLES = [
    {
      name: "Admin",
      permissions: new Set([
        "COMPANY-READ",
        "COMPANY-READ-ALL",
        "COMPANY-UPDATE",
        "COMPANY-DELETE",
        "WORKSPACE-CREATE",
        "WORKSPACE-READ",
        "WORKSPACE-READ-ALL",
        "WORKSPACE-UPDATE",
        "WORKSPACE-DELETE",
        "PROJECT-CREATE",
        "PROJECT-READ",
        "PROJECT-READ-ALL",
        "PROJECT-UPDATE",
        "PROJECT-DELETE",
        "TASK-CREATE",
        "TASK-READ",
        "TASK-READ-ALL",
        "TASK-UPDATE",
        "TASK-DELETE"
      ])
    },
    {
      name: "Manager",
      permissions: new Set([
        "COMPANY-READ",
        "WORKSPACE-CREATE",
        "WORKSPACE-READ",
        "WORKSPACE-READ-ALL",
        "WORKSPACE-UPDATE",
        "PROJECT-CREATE",
        "PROJECT-READ",
        "PROJECT-READ-ALL",
        "PROJECT-UPDATE",
        "TASK-CREATE",
        "TASK-READ",
        "TASK-READ-ALL",
        "TASK-UPDATE",
        "TASK-DELETE"
      ])
    },
    {
      name: "User",
      permissions: new Set([
        "COMPANY-READ",
        "WORKSPACE-READ",
        "PROJECT-READ",
        "TASK-CREATE",
        "TASK-READ",
        "TASK-UPDATE"
      ])
    }
  ]
  
  