import UserEventData from './interfaces/UserEventData.interface';

export default class GitUserModel {
  public static async getUserAtvData(user: string): Promise<UserEventData[] | undefined> {
    try {
      const res = await fetch(`https://api.github.com/users/${user}/events`);

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data: UserEventData[] = await res.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }
}