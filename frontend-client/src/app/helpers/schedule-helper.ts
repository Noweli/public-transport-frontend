export class ScheduleHelper {
  private static readonly dayMap = new Map([
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

  private static getDayBasedOnInput(input: string): string {
    return this.dayMap.get(input)!;
  }
}
