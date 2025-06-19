#!/usr/bin/env node

export default class GitUserCli {
  private static args: string[];

  constructor() {
    const cleanArgs = process.argv;

    for (let i = 0; i < 2; i++) 
      cleanArgs.shift();
    
    GitUserCli.args = cleanArgs;

    this.cliOptions();
  }

  async cliOptions(): Promise<void> {
    try {
      const user: string | undefined = GitUserCli.args[1];

    } catch (err) {
      console.error(err);
    }
  }
}

new GitUserCli();