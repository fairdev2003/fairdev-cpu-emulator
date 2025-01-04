import type { ReturnType } from "@/app/types";
import { TerminalSpace } from "@/app/(terminal)/terminal";

class CPU {

  public registers: Record<string, string> = {
    ax: "0000",
    bx: "0000",
    cx: "0000",
    dx: "0000",
  };

  public memory = new Array(65536).fill(0);

  public stack: string[] = [];

  // Dump method for debugging registers and stack
  public dump(args: string[]) {
    switch (args[1]) {
      case "stack":
        return {
          message: JSON.stringify(this.stack),
          isError: false
        };
      case "r":
        const reg = this.registers;
        return {
          message: (<div>
            <TerminalSpace/>
            <p> <span className='text-green-400'>AX:</span> {reg.ax}</p>
            <p> <span className='text-green-400'>BX:</span> {reg.bx}</p>
            <p> <span className='text-green-400'>CX:</span> {reg.cx}</p>
            <p> <span className='text-green-400'>DX:</span> {reg.dx}</p>
            <TerminalSpace/>
          </div>),
          isError: false,
        };
      case "memory":
        return this.dumpMemory(); // Call the dumpMemory function
      default:
        return {
          message: "dump command requires 'stack', 'r', or 'memory' argument",
          isError: true
        };
    }
  }

  // Dump memory contents in a readable format
  public dumpMemory(): { message: JSX.Element; isError: boolean } {
    const memoryContent = this.memory.slice(0, 256).map((value, index) => {
      return (
        <p key={index} className='text-gray-500'>
          <span className='text-green-400'>{(index).toString(16).padStart(4, '0').toUpperCase()}:</span>
          {value.toString(16).padStart(4, '0').toUpperCase()}
        </p>
      );
    });

    return {
      message: (
        <div>
          <TerminalSpace />
          <p>Memory Dump (First 256 Bytes):</p>
          {memoryContent}
          <TerminalSpace />
        </div>
      ),
      isError: false
    };
  }

  // MOV command for register-to-register and memory-to-register
  public mov(dest: string, source: string): ReturnType {
    if (!this.check16Bit(source)) {
      return {
        message: "Value is not a valid 16-bit hex.",
        isError: true
      };
    }

    const isRegister = Object.keys(this.registers).includes(dest.toLowerCase());

    if (isRegister) {
      this.registers[dest.toLowerCase()] = source.toUpperCase();
    } else {
      const address = parseInt(dest, 16);
      this.memory[address] = parseInt(source, 16);
    }

    return {
      message: `MOV ${dest}, ${source}`,
      isError: false
    };
  }

  // XCHG command for registers and memory operations
  public xchg(dest: string, source: string): ReturnType {
    const isRegister = (reg: string) => Object.keys(this.registers).includes(reg.toLowerCase());

    if (isRegister(dest) && isRegister(source)) {
      const temp = this.registers[dest.toLowerCase()];
      this.registers[dest.toLowerCase()] = this.registers[source.toLowerCase()];
      this.registers[source.toLowerCase()] = temp;
    } else {
      const address = parseInt(dest, 16);
      const temp = this.memory[address];
      this.memory[address] = parseInt(source, 16);
      this.registers[source.toLowerCase()] = temp.toString(16).toUpperCase();
    }

    return {
      message: `XCHG ${dest}, ${source}`,
      isError: false
    };
  }

  // PUSH command for pushing register values onto the stack
  public push(register: string): ReturnType {
    if (!Object.keys(this.registers).includes(register.toLowerCase())) {
      return {
        message: "Invalid register.",
        isError: true
      };
    }

    this.stack.push(this.registers[register.toLowerCase()]);
    return {
      message: `PUSH ${register}`,
      isError: false
    };
  }

  // POP command for popping values from the stack into registers
  public pop(register: string): ReturnType {
    if (!Object.keys(this.registers).includes(register.toLowerCase())) {
      return {
        message: "Invalid register.",
        isError: true
      };
    }

    if (this.stack.length === 0) {
      return {
        message: "Stack underflow.",
        isError: true
      };
    }

    const value = this.stack.pop();
    this.registers[register.toLowerCase()] = value || "0000";

    return {
      message: `POP ${register}`,
      isError: false
    };
  }

  // Validate 16-bit hex values
  public check16Bit(value: string): boolean {
    const regex = /^[A-Fa-f0-9]{4}$/;
    return regex.test(value);
  }
}

export { CPU };
