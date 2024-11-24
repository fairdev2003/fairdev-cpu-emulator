import { ReactNode } from "react";
import {RegistersData, RegistriesType, ReturnType} from "@/app/types";

type ConsoleLineProps = {
  content: string;
};

export const ConsoleLine = ({ content }: { content: string }) => {
  return (
    <p className="">
      <span className="text-green-400">klimson@klimson-CPUEmulator</span>:
      <span className="text-blue-400">~</span>$ {content}
    </p>
  );
};

export const CommandProvider = ({children, commandLineContent}: {
  children: ReactNode
  commandLineContent: string
}) => {
  return (
    <div>
      <ConsoleLine content={commandLineContent}/>
      {children}
    </div>
  )
}

export const SiemaCommand = () => {
  return (
    
    <div>
      <div className="text-red-500">siema</div>
      <p>---------------------------------------</p>
      <p className="text-blue-500">Siema Byku!</p>
      <p>---------------------------------------</p>
    </div>
  );
};

export const HelpCommand = () => {
  return (
    <div>
      <h1>{` `}</h1>
      <p className="text-blue-400">Available commands:</p>
      <p>{` `}</p>
      <h1>Basic commmands</h1>
      <p>
        <span className="font-bold">{"    "}help</span> {"       "}Display this help message
      </p>
      <p>
        <span className="font-bold">{"    "}cls</span> {"       "}Clear the console
      </p>

      <p>
        <span className="font-bold">{"    "}cls</span> {"       "}Clear the console
      </p>


      <p>{` `}</p>
      <h1>CPU Emulator commmands</h1>
      <p>
        <span className="font-bold">{"    "}mov {"<dest> <src>"}</span> {"       "}mov assembly instruction
      </p>
      <p>
        <span className="font-bold">{"    "}xchg</span> {"       "}xhgr assembly
        instruction
      </p>
      <p>
        <span className="font-bold">{"    "}reset</span> {"       "}clear the memory
      </p>
      <p>
        <span className="font-bold">{"    "}dump</span> {"       "}print the memory
      </p>
      {` `}
    </div>
  );
};

export const UnknownCommand = ({content}: { content: string }) => {
  return <div>Unknown Command: {content.toLowerCase().split(" ")[0]}</div>;
};

export const ErrorCommand = ({ content }: { content: string }) => {
  return <div>
    <p className='text-red-500'>
      ⛔ {content}
    </p>
  </div>;
};

export const OutputMov = ({ content }: { content: typeof RegistersData}) => {
  return (
    <div className=''>
      {content.AX}
    </div>
  )
}

export const Space = () => {
  return <div>{` `}</div>;
}
