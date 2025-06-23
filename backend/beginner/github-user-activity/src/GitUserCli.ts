#!/usr/bin/env node
import GitUserModel from './GitUserModel';
import UserEventData from './interfaces/UserEventData.interface';
import Event from './interfaces/Event.interface';

export default class GitUserCli {
  private static args: string[];
  private static events: Event[] = [];

  constructor() {
    const cleanArgs = process.argv;

    for (let i = 0; i < 2; i++) 
      cleanArgs.shift();
    
    GitUserCli.args = cleanArgs;
    const user: string | undefined = GitUserCli.args[0];

    if (user === undefined) {
      console.error('Please provide a GitHub username');
      process.exit(1);
    }

    if (GitUserCli.args.length !== 1) {
      console.error('Please provide a valid number of arguments');
      process.exit(1);
    }

    this.cliOptions(user);
  }

  public async cliOptions(user: string): Promise<void> {
    try {
      await this.handleUserEventData(user);

      console.log(`${user} activities:\n`);

      for (let evt of GitUserCli.events) {
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

      console.log('\n');
    } catch (err) {
      console.error(err);
    }
  }

  public useCommitCommentEvent(evt: Event): void {
    evt.repos.forEach((rp) => {
      rp.count.forEach((ct) => {
        console.log(`A commit comment created in <${rp.name}> at ${ct.date}`);
      })
    });
  }

  public useCreateEvent(evt: Event): void {
    evt.repos.forEach((rp) => {
      rp.count.forEach((ct) => {
        console.log(`A git branch or tag have been created ${ct.total} ${(ct.total > 1) ? 'times' : 'time'} in <${rp.name}> at ${ct.date}`);
      })
    });
  }

  public useDeleteEvent(evt: Event): void {
    evt.repos.forEach((rp) => {
      rp.count.forEach((ct) => {
        console.log(`A git branch or tag have been deleted in <${rp.name}> at ${ct.date}`);
      })
    });
  }

  public useForkEvent(evt: Event): void {
    evt.repos.forEach((rp) => {
      rp.count.forEach((ct) => {
        console.log(`The repository <${rp.name}> was forked at ${ct.date}`);
      })
    });
  }

  public useGollumEvent(evt: Event): void {
    evt.repos.forEach((rp) => {
      rp.count.forEach((ct) => {
        console.log(`A wiki page has been created or updated ${ct.total} ${(ct.total > 1) ? 'times' : 'time'} in <${rp.name}> at ${ct.date}`);
      })
    });
  }

  public useIssueCommentEvent(evt: Event): void {
    evt.repos.forEach((rp) => {
      rp.count.forEach((ct) => {
        console.log(`There was an issue or pull request comment ${ct.total} ${(ct.total > 1) ? 'times' : 'time'} in <${rp.name}> at ${ct.date}`);
      })
    });
  }

  public useIssuesEvent(evt: Event): void {
    evt.repos.forEach((rp) => {
      rp.count.forEach((ct) => {
        console.log(`Opened a new issue ${ct.total} ${(ct.total > 1) ? 'times' : 'time'} in <${rp.name}> at ${ct.date}`);
      })
    });
  }

  public useMemberEvent(evt: Event): void {
    evt.repos.forEach((rp) => {
      rp.count.forEach((ct) => {
        console.log(`Was related to repository collaborators in <${rp.name}> at ${ct.date}`);
      })
    });
  }

  public usePublicEvent(evt: Event): void {
    evt.repos.forEach((rp) => {
      rp.count.forEach((ct) => {
        console.log(`A private repository <${rp.name}> is made public at ${ct.date}`);
      })
    });
  }

  public usePullRequestEvent(evt: Event): void {
    evt.repos.forEach((rp) => {
      rp.count.forEach((ct) => {
        console.log(`Was related to pull requests ${ct.total} ${(ct.total > 1) ? 'times' : 'time'} in <${rp.name}> at ${ct.date}`);
      })
    });
  }

  public usePullRequestReviewEvent(evt: Event): void {
    evt.repos.forEach((rp) => {
      rp.count.forEach((ct) => {
        console.log(`Was related to pull request reviews ${ct.total} ${(ct.total > 1) ? 'times' : 'time'} in <${rp.name}> at ${ct.date}`);
      })
    });
  }

  public usePullRequestReviewCommentEvent(evt: Event): void {
    evt.repos.forEach((rp) => {
      rp.count.forEach((ct) => {
        console.log(`Was related to pull request review comments ${ct.total} ${(ct.total > 1) ? 'times' : 'time'} in <${rp.name}> at ${ct.date}`);
      })
    });
  }

  public usePullRequestReviewThreadEvent(evt: Event): void {
    evt.repos.forEach((rp) => {
      rp.count.forEach((ct) => {
        console.log(`Was related to a comment thread on a pull request being marked as resolved or unresolved in <${rp.name}> at ${ct.date}`);
      })
    });
  }

  public usePushEvent(evt: Event): void {
    evt.repos.forEach((rp) => {
      rp.count.forEach((ct) => {
        console.log(`Pushed ${ct.total} commits to <${rp.name}> at ${ct.date}`);
      })
    });
  }

  public useReleaseEvent(evt: Event): void {
    evt.repos.forEach((rp) => {
      rp.count.forEach((ct) => {
        console.log(`Was related to a release in <${rp.name}> at ${ct.date}`);
      })
    });
  }

  public useSponsorshipEvent(evt: Event): void {
    evt.repos.forEach((rp) => {
      rp.count.forEach((ct) => {
        console.log(`Sponsored <${rp.name}> at ${ct.date}`);
      })
    });
  }

  public useWatchEvent(evt: Event): void {
    evt.repos.forEach((rp) => {
      rp.count.forEach((ct) => {
        console.log(`Starred <${rp.name}> at ${ct.date}`);
      })
    });
  }

  public async handleUserEventData(user: string): Promise<void> {
    try {
      const userData = await GitUserModel.getUserAtvData(user);

      if (!userData) return;

      const events: Event[] = [];

      const populateEvent = (dataEvent: UserEventData) => {
        let isEventAlreadyExists = false;

        events.forEach((evt) => {
          if (events.length > 0 && evt.type === dataEvent.type) 
            isEventAlreadyExists = true;
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

    } catch (err) {
      console.error(err);
    }
  }
}

new GitUserCli();