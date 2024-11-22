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
export const SiemaCommand = () => {
  return (
    <div>
      <p>---------------------------------------</p>
      <p className="text-blue-400">Siema Byku!</p>
      <p>---------------------------------------</p>
    </div>
  );
};

export const HelpCommand = () => {
  const helpOutput = `help - Display this help message
cls - Clear the console
load <file> - Load a file into memory
run <file> - Run the loaded file
               `;
  return (
    <div>
      <h1>{` `}</h1>
      <p className="text-blue-400">Available commands:</p>
      <p>{` `}</p>
      <h1>Basic commmands</h1>
      <p><span className="font-bold">{"    "}help</span>      Display this help message</p>
      <p><span className="font-bold">{"    "}cls</span>       Clear the console</p>
      <p>{` `}</p>
      <h1>CPU Emulator commmands</h1>
      <p><span className="font-bold">{"    "}mov</span>       mov assembly instruction</p>
      <p><span className="font-bold">{"    "}xchg</span>      xhgr assembly instruction</p>
      {` `}
    </div>
  );
};
