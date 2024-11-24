import {
  CommandProvider,
  ConsoleLine, ErrorCommand,
  HelpCommand,
  SiemaCommand,
  UnknownCommand,
} from "./terminal";
import { Dispatch, SetStateAction } from "react";
import {CPU} from "@/app/emulator";
import { DumpType } from "@/app/types";

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
      case "load":
      case "dump": {
        
        const input = commandContent.split(" ");
        const dumpContent: DumpType = cpu.dump(input);
        setState([
          ...state,
          <CommandProvider key='command-provider' commandLineContent={commandContent}>
            <div key='memory-dump'>
              {!dumpContent.isError && <p>Dump Content:</p>}
              <p className={dumpContent.isError ? "text-red-500" : ""}>{dumpContent.message}</p>
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
