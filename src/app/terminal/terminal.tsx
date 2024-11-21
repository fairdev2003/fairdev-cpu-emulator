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
  return (
    <div>
      <h2>Help</h2>
      <p>
        This is a simple CPU emulator. Supported commands:
        <ul>
          <li>ADD [destination register] [source register]</li>
          <li>SUB [destination register] [source register]</li>
          <li>MUL [destination register] [source register]</li>
          <li>CLS</li>
          <li>HELP</li>
        </ul>
      </p>
    </div>
  );
};
