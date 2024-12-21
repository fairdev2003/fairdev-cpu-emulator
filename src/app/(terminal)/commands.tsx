import {
  CommandProvider,
  ConsoleLine, ErrorCommand,
  HelpCommand,
  SiemaCommand,
  UnknownCommand,
} from "./terminal";
import { Dispatch, SetStateAction } from "react";
import { CPU } from "@/app/emulator";
import { ReturnType } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

const cpu = new CPU()

export class Command {
  execute(
    commandContent: string,
    setState: Dispatch<SetStateAction<any>>,
    state: any[]
  ): any {
    console.log(commandContent);
    const command = commandContent.toLowerCase().split(" ")[0];
    switch (command) {
      
      case "kurwa":
        setState([
          ...state,
          <ConsoleLine key="console-line" content={commandContent} />,
          <SiemaCommand key="siema-command"/>,
        ]);
        return;
      case "cls":
        setState([]);
        return;
      case "reset":
        cpu.reset();
        setState([
          ...state,
          <CommandProvider key='command-provider' commandLineContent={commandContent}>
            <p className='text-green-500'>Memory reset successfully</p>
          </CommandProvider>
        ]);
        return;
      case "help":
        setState([
          ...state,
          <ConsoleLine key="console-line" content={commandContent} />,
          <HelpCommand key="help-command"/>,
        ]);
        return;
      case "load": {
        return;
      }
      case "dump": {
        
        const input = commandContent.split(" ");
        const dumpContent = cpu.dump(input);
        setState([
          ...state,
          <CommandProvider key='command-provider' commandLineContent={commandContent}>
            <div key='memory-dump'>
              {!dumpContent.isError ? <div>{dumpContent.message}</div> : <ErrorCommand content={dumpContent.message as string}/>}
            </div> 
          </CommandProvider>
          ]
        );
        return;
      }
      case "mov": {
        const [_, destination, source ] = commandContent.split(" ");
        
        const movOutput = cpu.mov(destination, source)
        
        setState([
          ...state,
          <CommandProvider key='command-provider' commandLineContent={commandContent}>
            {!movOutput.isError ? <p className='text-blue-500'>{movOutput.message}</p> : <ErrorCommand key='error-command' content={movOutput.message}/>} 
          </CommandProvider>
        ])
        return;
      }
      case "stack": {
          const input = commandContent.split(" ");
        if (input[1] === "push") {
          setState([
            ...state,
            <CommandProvider key='command-provider' commandLineContent={commandContent}>
              <p className='text-green-500'>
                {cpu.stackPush(commandContent.split(" ")[2])}
              </p>
            </CommandProvider>
          ])
          
        }
        return;
      }
      case "about": {
        const art = `
              #%:.                
       #%=   ###%=:    
      ##%=   |##%::    
      ##%=   ###%=:    
       #%%=  |##%=:    
       ##%== ###%=:    ===
        ##%%=!##%=:    ====
         ###%%##%=   :==== 
          ######%=: .:==== 
            ####%%======= 
             ###%%%===: 
             |%#%%=:=:  
             ####%=:   
             |##%%:    
      -------####%:--------=
             |%#%%:            
        `
        setState([
          ...state,
          <ConsoleLine key="console-line" content={commandContent}/>,
          <div className='text-green-500 flex' key="about-container">
            <p key="art">{art}</p>
            <div className='text-blue-500'>
              {` `}

              <p>klimson<span className='text-white'>@</span>klimson-CPUEmulator</p>
              <p>Author: <span className='text-white'>fairdev2003</span></p>
              <p>Techstack: <span className='text-white'>Electron, Next.js, Tailwind.css</span></p>
              <p>Repo: <span className='text-white'><Link target="_blank" rel="noreferrer" href={"https://github.com/fairdev2003/fairdev-cpu-emulator"} className="hover:underline hover:text-blue-500">fairdev-cpu-emulator</Link></span></p>


            </div>
          </div>

        ]);
        return;
      }
      default:
        setState([
          ...state,
          <CommandProvider key='command-provider' commandLineContent={commandContent}>
            <UnknownCommand key="unknown-command" content={commandContent} />
          </CommandProvider>
        ]);
        return;
    }
  }
}
