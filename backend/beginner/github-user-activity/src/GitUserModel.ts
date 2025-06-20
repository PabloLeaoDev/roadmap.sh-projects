import UserEventData from './interfaces/UserData.interface';

export default class GitUserModel {
  // private static data: Object[];

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

// GitUserModel.getUserAtvData('kamranahmedse');