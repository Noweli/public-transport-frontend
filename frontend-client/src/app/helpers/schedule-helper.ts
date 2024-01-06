export class ScheduleHelper {
  public static readonly dayMap = new Map([
    ["0", "Sunday"],
    ["1", "Monday"],
    ["2", "Tuesday"],
    ["3", "Wednesday"],
    ["4", "Thursday"],
    ["5", "Friday"],
    ["6", "Saturday"]
  ]);

  public static convertScheduleToDays(input: string): string {
    if (!input || !input.includes(",")) {
      return '';
    }

    const scheduleArray = input.split(",");

    return scheduleArray.map((value: string) => this.getDayBasedOnInput(value)).join(", ");
  }

  public static getTimeFromString(input: string): string {
    const dateObject = new Date(input);

    return dateObject.getHours().toString().padStart(2, '0') + ':' +
      dateObject.getMinutes().toString().padStart(2, '0') + ':' +
      dateObject.getSeconds().toString().padStart(2, '0');
  }

  public static getDateTime(date: Date, time: string): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${time}`;
  }

  private static getDayBasedOnInput(input: string): string {
    return this.dayMap.get(input)!;
  }
}
