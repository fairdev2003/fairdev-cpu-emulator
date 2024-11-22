"use client";

import { useState, useEffect, useRef } from "react";
import { Console, CPU } from "./emulator";
import { ConsoleLine, HelpCommand, SiemaCommand } from "./terminal/terminal";

export default function Home() {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [consoleElements, setConsoleElements] = useState<any>([
    <p>Type "help" to view available commands</p>,
  ]);
  const [commandContent, setCommandContent] = useState("");
  const cpu = new CPU();
  const terminal = new Console();
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const helpOutput = `Available commands:
  
help - Display this help message
cls - Clear the console
load <file> - Load a file into memory
run <file> - Run the loaded file
               `;
  const siemaCommand = `------------------------------------------------------
Siema byku! :D
------------------------------------------------------`;

  return (
    <div
      ref={divRef}
      className="flex flex-col whitespace-pre-wrap text-white p-2"
    >
      {consoleElements.map((element, index) => (
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
            if (e.key === "ArrowUp") {
              const index = commandHistory.indexOf(commandContent);
              if (index > 0) {
                setCommandContent(commandHistory[index - 1]);
                e.currentTarget.value = commandContent;
              }
            }
            if (e.key === "Enter") {
              if (commandContent.startsWith("help")) {
                setConsoleElements([
                  ...consoleElements,
                  <ConsoleLine content={commandContent} />,
                  <HelpCommand />,
                ]);
                console.log(consoleElements);
              }
              if (commandContent.startsWith("cls")) {
                console.log("Enter");
                setConsoleElements([]);
              }
              if (commandContent.startsWith("siema")) {
                setConsoleElements([
                  ...consoleElements,
                  <ConsoleLine content={commandContent} />,
                  <SiemaCommand />,
                ]);
              }
              if (commandContent.startsWith("mov")) {
                const args = commandContent.split(" ");
                const [command, firstArg, secondArg] = args;


                var message = <div></div>;
                if (args.length > 1) {
                  message = (
                    <div>
                      <p><span className="text-blue-500">Command:</span> {command.toUpperCase()}</p>
                      <p><span className="text-blue-500">First Argument:</span> {firstArg}</p>
                      <p><span className="text-blue-500">Second Argument:</span> {secondArg}</p>
                    </div>
                  );
                } else {
                  message = (
                    <div>
                      <p>---------------------------------------</p>
                      <p className="text-red-500"><span className="text-white">{"["}</span>⚠︎<span className="text-white">{"]"}</span> Missing args: {"<arg1>"} and {"<arg2>"}</p>
                      <p>---------------------------------------</p>
                    </div>
                  );
                }

                setConsoleElements([
                  ...consoleElements,
                  <ConsoleLine content={commandContent} />,
                  message,
                ]);
              }
              setCommandContent("");
              setCommandHistory([...commandHistory, commandContent]);
              divRef.current?.scrollTo(0, 10);
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
