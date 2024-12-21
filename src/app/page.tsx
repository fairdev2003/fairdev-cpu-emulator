"use client";

import { useState, useEffect, useRef } from "react";
import { Command } from "@/app/(terminal)/commands";
import {historyType} from "@/app/types";
import {step} from "next/dist/experimental/testmode/playwright/step";



export default function Home() {
  const [commandHistory, setCommandHistory] = useState<historyType>({
    commands: [],
    step: 0
  });
  const [consoleElements, setConsoleElements] = useState<any>([
    <p key={"p"}>Type {'"help"'} to view available commands</p>,
  ]);
  const [commandContent, setCommandContent] = useState("");
  const terminalWindow = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const command = new Command();

  useEffect(() => {
    window.addEventListener("keydown", function () {
      inputRef?.current?.focus();
    })
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
          <span className="text-green-400 font-bold">klimson@klimson-CPUEmulator</span>:
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
            if (e.key === "ArrowUp") {
              setCommandHistory({
                step: commandHistory.step > 0 ? commandHistory.step - 1 : commandHistory.commands.length - 1,
                commands: [...commandHistory.commands],
              })
              setCommandContent(commandHistory.commands[commandHistory.step - 1])
              inputRef.current?.focus();
            }
            if (e.key === "ArrowDown") {
              setCommandHistory({
                step: commandHistory.step == commandHistory.commands.length - 1 ? 0 : commandHistory.step + 1,
                commands: [...commandHistory.commands],
              })
              setCommandContent(commandHistory.commands[commandHistory.step - 1])
              inputRef.current?.focus();
            }
            
            if (e.key === "Enter" && commandContent.length > 0) {

              // execute the command base on user input
              command.execute(commandContent, setConsoleElements, consoleElements);
              
              setCommandHistory({
                commands: [...commandHistory.commands, commandContent],
                step: commandHistory.step + 1,
              })
                

              // clear the user input after "Enter" have been clicked
              setCommandContent("");

              // scroll into downside of the (terminal)
              setTimeout(() => {
                terminalWindow.current?.scrollIntoView({ behavior: "smooth", block: "end" });
              }, 100);
              
            }
          }}
          spellCheck={false}
          
          
        ></input>
      </div>
    </div>
  );
}
