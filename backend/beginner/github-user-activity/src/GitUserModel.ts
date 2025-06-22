import UserEventData from './interfaces/UserEventData.interface';

export default class GitUserModel {
  public static async getUserAtvData(user: string): Promise<UserEventData[] | undefined> {
    try {
      const res = await fetch(`https://api.github.com/users/${user}/events`);

      if (!res.ok) {
        console.error('The GitHub user was not found (probably is invalid)');
        throw new Error(`HTTP error! Status Code: ${res.status}`)
      };

      const data: UserEventData[] = await res.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }
}