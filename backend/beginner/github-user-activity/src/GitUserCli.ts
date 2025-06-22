#!/usr/bin/env node
import GitUserModel from './GitUserModel';
import UserEventData from './interfaces/UserEventData.interface';
import Event from './interfaces/Event.interface';

export default class GitUserCli {
  private static args: string[];
  private static events: Event[];

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

  public useCommitCommentEvent(evt: Event): void {}

  public useCreateEvent(evt: Event): void {}

  public useDeleteEvent(evt: Event): void {}

  public useForkEvent(evt: Event): void {}

  public useGollumEvent(evt: Event): void {}

  public useIssueCommentEvent(evt: Event): void {}

  public useIssuesEvent(evt: Event): void {
    // Opened a new issue in <user>/developer-roadmap
  }

  public useMemberEvent(evt: Event): void {}

  public usePublicEvent(evt: Event): void {}

  public usePullRequestEvent(evt: Event): void {}

  public usePullRequestReviewEvent(evt: Event): void {}

  public usePullRequestReviewCommentEvent(evt: Event): void {}

  public usePullRequestReviewThreadEvent(evt: Event): void {}

  public usePushEvent(evt: Event): void {
    // evt.forEach((e) => {
    //   console.log('Pushed 3 commits to <user>/developer-roadmap');

    // });
  }

  public useReleaseEvent(evt: Event): void {}

  public useSponsorshipEvent(evt: Event): void {}

  public useWatchEvent(evt: Event): void {
    // Starred <user>/developer-roadmap
  }

  public async handleUserEventData(user: string): Promise<void> {
    try {
      const userData = await GitUserModel.getUserAtvData(user);

      console.log(userData?.length);

      if (!userData) return;

      const events: Event[] = [];

      const populateEvent = (dataEvent: UserEventData) => {
        let isEventAlreadyExists = false;

        events.forEach((evt) => {
          if (events.length > 0 && evt.type === dataEvent.type) isEventAlreadyExists = true;
        });

        const event: Event = {
          type: '',
          repos: [
            {
              name: '',
              count: []
            }
          ]
        };

        const repo = dataEvent.repo.name;

        const dateArr = dataEvent.created_at.split('T'),
              date = dateArr[0];

        if (!isEventAlreadyExists) {
          event.type = dataEvent.type;
          event.repos[0].name = repo;
          event.repos[0].count = [{ date, total: 1 }];

          events.push(event);
        } else {
          events.forEach((evt) => {
            if (evt.type !== dataEvent.type) return;

            let isRepoAlreadyExists = false;

            evt.repos.forEach((rp) => {
              if (rp.name === repo) {
                let isDateAlreadyExists = false;
  
                rp.count.forEach((ct) => {
                  if (ct.date === date) {
                    ct.total++;
                    isDateAlreadyExists = true;
                  }
                });
  
                if (!isDateAlreadyExists) rp.count.push({ date, total: 1 });

                isRepoAlreadyExists = true;
              }
            });

            if (!isRepoAlreadyExists) {
              evt.repos.push({
                name: repo,
                count: [{ date, total: 1 }]
              });
            }
          });
        }
      };

      for (let data of userData) populateEvent(data);

      GitUserCli.events = events;

      for (let evt of events) {
        switch (evt.type) {
          case 'CommitCommentEvent':
            this.useCommitCommentEvent(evt);
            break;
          case 'CreateEvent':
            this.useCreateEvent(evt);
            break;
          case 'DeleteEvent':
            this.useDeleteEvent(evt);
            break;
          case 'ForkEvent':
            this.useForkEvent(evt);
            break;
          case 'GollumEvent':
            this.useGollumEvent(evt);
            break;
          case 'IssueCommentEvent':
            this.useIssueCommentEvent(evt);
            break;
          case 'IssuesEvent':
            this.useIssuesEvent(evt);
            break;
          case 'MemberEvent':
            this.useMemberEvent(evt);
            break;
          case 'PublicEvent':
            this.usePublicEvent(evt);
            break;
          case 'PullRequestEvent':
            this.usePullRequestEvent(evt);
            break;
          case 'PullRequestReviewEvent':
            this.usePullRequestReviewEvent(evt);
            break;
          case 'PullRequestReviewCommentEvent':
            this.usePullRequestReviewCommentEvent(evt);
            break;
          case 'PullRequestReviewThreadEvent':
            this.usePullRequestReviewThreadEvent(evt);
            break;
          case 'PushEvent':
            this.usePushEvent(evt);
            break;
          case 'ReleaseEvent':
            this.useReleaseEvent(evt);
            break;
          case 'SponsorshipEvent':
            this.useSponsorshipEvent(evt);
            break;
          case 'WatchEvent':
            this.useWatchEvent(evt);
            break;
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
}

// new GitUserCli().handleUserEventData('microsoft');
new GitUserCli().handleUserEventData('PabloLeaoDev');