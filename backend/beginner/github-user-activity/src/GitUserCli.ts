#!/usr/bin/env node
import GitUserModel from "./GitUserModel";

export default class GitUserCli {
  private static args: string[];

  constructor() {
    const cleanArgs = process.argv;

    for (let i = 0; i < 2; i++) 
      cleanArgs.shift();
    
    GitUserCli.args = cleanArgs;

    this.cliOptions();
  }

  public async cliOptions(): Promise<void> {
    try {
      const user: string | undefined = GitUserCli.args[1];

    } catch (err) {
      console.error(err);
    }
  }

  public useCommitCommentEvent(): void {}

  public useCreateEvent(): void {}

  public useDeleteEvent(): void {}

  public useForkEvent(): void {}

  public useGollumEvent(): void {}

  public useIssueCommentEvent(): void {}

  public useIssuesEvent(): void {
    // Opened a new issue in <user>/developer-roadmap
  }

  public useMemberEvent(): void {}

  public usePublicEvent(): void {}

  public usePullRequestEvent(): void {}

  public usePullRequestReviewEvent(): void {}

  public usePullRequestReviewCommentEvent(): void {}

  public usePullRequestReviewThreadEvent(): void {}

  public usePushEvent(): void {
    // Pushed 3 commits to <user>/developer-roadmap
  }

  public useReleaseEvent(): void {}

  public useSponsorshipEvent(): void {}

  public useWatchEvent(): void {
    // Starred <user>/developer-roadmap
  }

  public async handleUserEventData(user: string): Promise<void> {
    const userData = await GitUserModel.getUserAtvData(user);

    if (!userData) return;

    /*
    [
      event: {
        repo_url: {
          date: number (count)
          ...        
        }
      }
    ]
    
    essa será a estrutura da constante events
    */

    const events = [];

    for (let data of userData) {
      switch (data.type) {
        case 'CommitCommentEvent':
          this.useCommitCommentEvent();
          break;
        case 'CreateEvent':
          this.useCreateEvent();
          break;
        case 'DeleteEvent':
          this.useDeleteEvent();
          break;
        case 'ForkEvent':
          this.useForkEvent();
          break;
        case 'GollumEvent':
          this.useGollumEvent();
          break;
        case 'IssueCommentEvent':
          this.useIssueCommentEvent();
          break;
        case 'IssuesEvent':
          this.useIssuesEvent();
          break;
        case 'MemberEvent':
          this.useMemberEvent();
          break;
        case 'PublicEvent':
          this.usePublicEvent();
          break;
        case 'PullRequestEvent':
          this.usePullRequestEvent();
          break;
        case 'PullRequestReviewEvent':
          this.usePullRequestReviewEvent();
          break;
        case 'PullRequestReviewCommentEvent':
          this.usePullRequestReviewCommentEvent();
          break;
        case 'PullRequestReviewThreadEvent':
          this.usePullRequestReviewThreadEvent();
          break;
        case 'PushEvent':
          this.usePushEvent();
          break;
        case 'ReleaseEvent':
          this.useReleaseEvent();
          break;
        case 'SponsorshipEvent':
          this.useSponsorshipEvent();
          break;
        case 'WatchEvent':
          this.useWatchEvent();
          break;
        default:
          console.warn(`Evento não tratado: ${data.type}`);
          break;
      }
    }
  }
}

new GitUserCli();