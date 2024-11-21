"use client";

import { useState, useEffect, useRef } from "react";
import { Console, CPU } from "./emulator";

export default function Home() {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [consoleElements, setConsoleElements] = useState<string[]>([]);
  const [commandContent, setCommandContent] = useState("");
  const cpu = new CPU();
  const terminal = new Console();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <main className="text-green-500 p-2">
      <div className="text-white flex flex-col">
        {terminal.ConsoleElements.map((element: any) => {
          return <div>{element}</div>;
        })}
      </div>
      <div className="flex gap-2">
        {`NS Z:/emulator/new/cpu>`}{" "}
        <input
          value={commandContent}
          ref={inputRef}
          onChange={(e) => {
            setCommandContent(e.currentTarget.value);
          }}
          onKeyDown={
            (e) => {
              if (e.key === "ArrowUp") {
                const index = commandHistory.indexOf(commandContent);
                if (index > 0) {
                  setCommandContent(commandHistory[index - 1]);
                  e.currentTarget.value = commandContent;
                }
              }
              if (e.key === "Enter") {
                setCommandHistory([...commandHistory, commandContent]);
                terminal.execute(commandContent)
                setConsoleElements(terminal.ConsoleElements);
                console.log(consoleElements);
                setCommandContent("");
              }
            }
          }
          spellCheck={false}
          className="bg-transparent text-yellow-200 active:border-transparent outline-none w-[530px]"
          onBlur={(e) => {e.currentTarget.focus();}}
          autoFocus
        ></input>
      </div>
    </main>
  );
}
