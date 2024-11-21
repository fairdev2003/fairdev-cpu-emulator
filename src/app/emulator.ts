import { RegistriesType } from "./types";

class CPU {
  private registers: Record<"AX" | "BX" | "CX" | "DX", number>;

  constructor() {
    this.registers = {
      AX: 0,
      BX: 0,
      CX: 0,
      DX: 0,
    };
  }

  MOV(
    dest: "AX" | "BX" | "CX" | "DX",
    src: "AX" | "BX" | "CX" | "DX" | number
  ) {
    if (typeof src === "number") {
      this.registers[dest] = src;
      return this.registers;
    } else if (src in this.registers) {
      this.registers[dest] = this.registers[src];
      return this.registers;
    } else {
      return "Invalid source register";
    }
  }
  XCHG(r: RegistriesType): string {
    return `xchg`;
  }

  dump(): void {
    console.log(this.registers);
  }
}

class Console {

  public ConsoleElements : any[]

  constructor() {
    this.ConsoleElements = [];
  }

  public execute(instruction: string): void {
    const cpu = new CPU();
    if (instruction.startsWith("mov")) {
        const args = instruction.split(" ");
        const [_, dest, src] = args;
        this.ConsoleElements.push(cpu.MOV(dest, parseInt(src)));
        cpu.dump();
    }
  }
  
}

export { CPU, Console };
