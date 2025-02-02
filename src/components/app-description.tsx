"use client"

import { motion } from "framer-motion"
import { Briefcase, Layers, CheckSquare } from "lucide-react"

export function AppDescription() {
  const items = [
    { icon: Briefcase, text: "Manage Workspaces" },
    { icon: Layers, text: "Manage Projects" },
    { icon: CheckSquare, text: "Track Tasks" }
  ]

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-gradient-to-br from-blue-100 to-blue-200 p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Project Management App</h2>
      <div className="flex flex-col space-y-4 w-full max-w-sm">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="w-full bg-white rounded-lg shadow-lg flex items-center p-4 border border-blue-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 4.2 }
            }}
          >
            <item.icon className="w-10 h-10 mr-4 text-blue-600" />
            <p className="text-sm font-medium text-gray-800">{item.text}</p>
          </motion.div>
        ))}
      </div>
      <motion.p
        className="mt-8 text-center text-sm text-blue-700 max-w-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Streamline your project tasks with our project management solution
      </motion.p>
    </div>
  )
}
