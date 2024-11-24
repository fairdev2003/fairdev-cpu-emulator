import type {DumpType} from "@/app/types";

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
  
  public dump(args: string[]): DumpType  {
    switch (args[1]) {
      case "stack":
        return {
          message: JSON.stringify(this.stack),
          isError: false
        };
      case "registries":
        if (args.length > 2 && args[2].includes("--")) {
          const registry = args[2].replace("--", "")
          return {
            message: this.registers[registry].toString(),
            isError: false
          };  
        }
        return {
          message: JSON.stringify(this.registers),
          isError: false
        };
      default:
        return {
          message: "Invalid variable name",
          isError: true
        };  
    }
  }
  
  public mov(dest: string, source: string): DumpType {
    if (!dest && !source) {
      return {
        message: "Move command requires destination and source",
        isError: true
      }
      
    }
    if (dest.toLowerCase() === "ax" || dest === "bx" || dest === "cx" || dest === "dx") {
      if (isNaN(parseInt(source))) {
        return {
          message: "Invalid source value",
          isError: true
        }
      }
      else {
        this.registers[dest.toLowerCase()] = parseInt(source);
        return {
          message: "Move successful",
          isError: false
        }
      }
      
    }
    return {
      message: "Invalid destination register",
      isError: true
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

