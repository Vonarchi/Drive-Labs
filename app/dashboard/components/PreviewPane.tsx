"use client"
import * as React from "react"
import { Sandpack } from "@codesandbox/sandpack-react"

export function PreviewPane({ files, template = "react-ts" }: { files?: Record<string,string>, template?: string }) {
  return (
    <Sandpack
      template={template}
      files={files}
      options={{
        showTabs: true,
        resizablePanels: true,
        editorHeight: 520,
        showLineNumbers: false,
        layout: "preview",
      }}
    />
  )
}
