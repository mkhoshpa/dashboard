/// <reference path="_all.ts" />

// Comment

module app.dashboard {
  export class CreateUser {
    constructor(
      public firstName: string,
      public lastName: string,
      public avatar: any,
      public bio: string,
      public slack: string)  {
    }
  }

  export class User {
    constructor(
      public name: string,
      public avatar: any,
      public bio: string,
      public slack: string,
      public notes: Note[],
      public reminders: Reminder[],
      public surveys: Survey[])  {
    }

    static fromCreate(user: CreateUser): User {
      return new User(
        user.firstName + ' ' + user.lastName,
        user.avatar,
        user.bio,
        user.slack,
        [],
        [],
        []);
    }
  }

  export class Note {
    constructor(
      public title: string,
      public date: Date) {
    }
  }

  export class Reminder {
    constructor(
      public title: string,
      public date: Date) {
    }
  }

  export class Survey {
    constructor (
      public title: string,
      public first: string,
      public second: string,
      public third: string,
      public fourth: string,
      public fifth: string,
      public sixth: string,
      public date: Date) {
    }
  }



}
