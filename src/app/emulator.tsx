import type {ReturnType} from "@/app/types";

class CPU {
  
  public registers: Record<string, number | number[]> = {
    // Initialize registers with zero values. 0 is used as a placeholder for now.
    // collage implementation
    ax: 0, 
    bx: 0,
    cx: 0,
    dx: 0,
    // additional registers
    flags: 0,
    ip: 0,
    
    
    memory: new Array(65536).fill(0), // 64 KB of memory
  };
  
  public stack: number[] = [1, 2];
  
  public dump(args: string[])  {
    switch (args[1]) {
      case "stack":
        return {
          message: JSON.stringify(this.stack),
          isError: false
        };
      case "r":
        if (args.length > 2 && args[2].includes("--")) {
          const registry = args[2].replace("--", "").toLowerCase()
          return {
            message: (
              <div>
                {` `}
                <p><span className='text-green-400'>{registry.toUpperCase()}:</span> {this.registers[registry].toString()}</p>
                {` `}
              </div>
              
            ),
            isError: false
          };
        }
        const reg = this.registers;
        return {
          message: (<div>
            {` `}
            <p> <span className='text-green-400'>AX:</span> {reg.ax}</p>
            <p> <span className='text-green-400'>BX:</span> {reg.bx}</p>
            <p> <span className='text-green-400'>CX:</span> {reg.cx}</p>
            <p> <span className='text-green-400'>DX:</span> {reg.dx}</p>
            {` `}
          </div>),
          isError: false,
        };
      default:
        return {
          message: "dump command requires 'stack' or 'r' argument",
          isError: true
        };  
    }
  }
  
  public mov(dest: string, source: string): ReturnType {
    
    
    const isNumber = !isNaN(parseInt(source))
    
    //mov AX 1
    if (isNumber) {
      this.registers[dest.toLowerCase()] = parseInt(source);
    }
    
    //mov AX BX
    if (!isNumber) {
      this.registers[dest.toLowerCase()] = this.registers[source.toLowerCase()];
    }
    
    return {
      message: `MOV ${dest}, ${source}`,
      isError: false
    }
  }
  
  public xchg(dest: string, source: string): void {
    
  }

  public reset(): void {
    this.registers = {
      // Initialize registers with zero values. 0 is used as a placeholder for now.
      // collage implementation
      ax: 0x0000,
      bx: 0,
      cx: 0,
      dx: 0,
      // additional registers
      sp: 0,
      bp: 0,
      si: 0,
      di: 0,
      cs: 0,
      ds: 0,
      es: 0,
      ss: 0,
      flags: 0,
      ip: 0,
      memory: new Array(65536).fill(0), // 64 KB of memory
    }
    this.stack = []
  }
  
  public stackPush(value: string): string {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      return "Invalid value to push";
    }
    this.stack = [...this.stack, parsedValue];
    console.log("Updated stack:", this.stack); // Debug log
    return "Stack push successful: " + this.stack.join(", ");
  }

}

export { CPU }

