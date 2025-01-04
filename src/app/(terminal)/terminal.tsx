import { ReactNode } from "react";
import {RegistersData, RegistriesType, ReturnType} from "@/app/types";

type ConsoleLineProps = {
  content: string;
};

export const ConsoleLine = ({ content }: { content: string }) => {
  return (
    <p className="">
      <span className="text-green-400 font-bold">klimson@klimson-CPUEmulator</span>:
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

      <h1>Basic commands</h1>
      <p>
        <span className="font-bold">{"    "}help</span> {"       "}Display this help message
      </p>
      <p>
        <span className="font-bold">{"    "}cls</span> {"       "}Clear the console
      </p>
      <p>
        <span className="font-bold">{"    "}about</span> {"       "}Display information about the project
      </p>

      <p>{` `}</p>
      <h1>CPU Emulator commands</h1>
      <p>
        <span className="font-bold">{"    "}mov {"<dest> <src>"}</span> {"       "}Move value
        from src to det (register/memory)
      </p>
      <p>
        <span className="font-bold">{"    "}xchg {"<reg1> <reg2>"}</span> {"       "}Exchange values
        between reg1 and reg2 (registers or register and memory)
      </p>
      <p>
        <span className="font-bold">{"    "}reset</span> {"       "}Clear the memory of the CPU
      </p>
      <p>
        <span className="font-bold">{"    "}dump {"<stack/r>"}</span> {"       "}Dump the stack or registers content
      </p>
      <p>
        <span className="font-bold">{"    "}push {"<register>"}</span> {"       "}Push value of register to the stack
        (AX, BX, CX, DX)
      </p>
      <p>
        <span className="font-bold">{"    "}pop {"<register>"}</span> {"       "}Pop value from the stack
        into register (AX, BX, CX, DX)
      </p>
    </div>
);
};

export const UnknownCommand = ({
  content
}: {
  content: string
}) => {
  return <div>Unknown Command: {content.toLowerCase().split(" ")[0]}</div>;
};

export const ErrorCommand = ({
  content
}: {
  content: string
}) => {
  return <div>
    <p className='text-red-500'>
      ⛔ {content}
    </p>
  </div>;
};

export const OutputMov = ({
  content
}: {
  content: typeof RegistersData
}) => {
  return (
    <div className=''>
      {content.AX}
    </div>
  )
}

export const TerminalSpace = () => {
  return <div>{` `}</div>;
}

export const ColormaticTerminal = () => {
  return (
    <div className='mt-5'>
      <div className="flex">
        <div className='bg-black w-[50px] h-[30px]'/>
        <div className='bg-red-600 w-[50px] h-[30px]'/>
        <div className='bg-green-600 w-[50px] h-[30px]'/>
        <div className='bg-yellow-600 w-[50px] h-[30px]'/>
        <div className='bg-green-600 w-[50px] h-[30px]'/>
        <div className='bg-purple-600 w-[50px] h-[30px]'/>
        <div className='bg-cyan-600 w-[50px] h-[30px]'/>
        <div className='bg-gray-300 w-[50px] h-[30px]'/>
      </div>
      <div className="flex">
        <div className='bg-gray-300 w-[50px] h-[30px]'/>
        <div className='bg-red-400 w-[50px] h-[30px]'/>
        <div className='bg-green-400 w-[50px] h-[30px]'/>
        <div className='bg-yellow-400 w-[50px] h-[30px]'/>
        <div className='bg-blue-400 w-[50px] h-[30px]'/>
        <div className='bg-purple-400 w-[50px] h-[30px]'/>
        <div className='bg-cyan-400 w-[50px] h-[30px]'/>
        <div className='bg-white w-[50px] h-[30px]'/>
      </div>
      

    </div>
  )
}

export const TerminalTextInfo = ({text, children} : {
  text: string
  children: ReactNode
}) => {
  return (
    <p className='text-blue-500 flex'>{text}: <span className='text-white'>{children}</span></p>
  )
}
