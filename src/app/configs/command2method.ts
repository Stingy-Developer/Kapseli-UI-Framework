import { Command } from "../../command/index";

export const command2method = (Command: Command) => {
  let COMMANDS = {};

  let all_commands = Command.getAll();
  for (const command in all_commands) {
    if (Object.hasOwnProperty.call(all_commands, command)) {
      COMMANDS["cmd:" + command] = all_commands[command].run;
      COMMANDS["cmd:" + command + ":run"] = all_commands[command].run;
      COMMANDS["cmd:" + command + ":stop"] = all_commands[command].stop;
    }
  }

  return COMMANDS;
};
