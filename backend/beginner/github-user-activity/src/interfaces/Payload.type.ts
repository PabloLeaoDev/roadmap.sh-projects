import CommentEvent from "./payloads/CommentEvent.interface";
import CreateEvent from "./payloads/CreateEvent.interface";
import DeleteEvent from "./payloads/DeleteEvent.interface";
import ForkEvent from "./payloads/ForkEvent.interface";
import GollumEvent from "./payloads/GollumEvent.interface";
import IssueCommentEvent from "./payloads/IssueCommentEvent.interface";
import MemberEvent from "./payloads/MemberEvent.interface";
import PublicEvent from "./payloads/PublicEvent.interface";
import PullRequestEvent from "./payloads/PullRequestEvent.interface";
import PullRequestReviewCommentEvent from "./payloads/PullRequestReviewCommentEvent.interface";
import PullRequestReviewEvent from "./payloads/PullRequestReviewEvent.interface";
import PullRequestReviewThreadEvent from "./payloads/PullRequestReviewThreadEvent.interface";
import PushEvent from "./payloads/PushEvent.interface";
import ReleaseEvent from "./payloads/ReleaseEvent.interface";
import SponsorshipEvent from "./payloads/SponsorshipEvent.interface";
import WatchEvent from "./payloads/WatchEvent.interface";

export type Payload = CommentEvent | CreateEvent | DeleteEvent | 
                      ForkEvent | GollumEvent | IssueCommentEvent | 
                      MemberEvent | PublicEvent | PullRequestEvent | 
                      PullRequestReviewCommentEvent | PullRequestReviewEvent | PullRequestReviewThreadEvent |
                      PushEvent | ReleaseEvent | SponsorshipEvent | WatchEvent;