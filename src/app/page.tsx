"use client";

import { useState, useEffect, useRef } from "react";
import { Command } from "@/app/(terminal)/commands";

export default function Home() {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [consoleElements, setConsoleElements] = useState<any>([
    <p key={"p"}>Type {'"help"'} to view available commands</p>,
  ]);
  const [commandContent, setCommandContent] = useState("");
  const terminalWindow = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const command = new Command();

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);
  
  return (
    <div
      ref={terminalWindow}
      className="flex flex-col whitespace-pre-wrap text-white p-2"
    >
      {consoleElements.map((element: any, index: any) => (
        <div key={index} className="text-gray-400">
          {element}
        </div>
      ))}

      <div className="flex">
        <p className="">
          <span className="text-green-400">klimson@klimson-CPUEmulator</span>:
          <span className="text-blue-400">~</span>$ {}
        </p>
        <input
          className="bg-transparent active:border-transparent outline-none w-[100vh]"
          value={commandContent}
          ref={inputRef}
          onChange={(e) => {
            setCommandContent(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && commandContent.length > 0) {

              // execute the command base on user input
              command.execute(commandContent, setConsoleElements, consoleElements)

              // clear the user input after "Enter" have been clicked
              setCommandContent("");

              // scroll into down side of the (terminal)
              setTimeout(() => {
                terminalWindow.current?.scrollIntoView({behavior: "smooth" });
              }, 100);
              
            }
          }}
          spellCheck={false}
          onBlur={(e) => {
            e.currentTarget.focus();
          }}
          autoFocus
        ></input>
      </div>
    </div>
  );

}
