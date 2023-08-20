export default class ValidatorDate {
  private static MINIMUM_AGE = 13;
  private static MAXIMUM_AGE = 100;
  private static IS_BIRTHDAY_PASSED = 1;
  private static IS_BIRTHDAY_NOT_PASSED = 0;

  public getAge(dateOfBirth: string): string {
    const age = this.calculateAge(dateOfBirth);
    return this.getAgeErrorMessage(age);
  }

  private calculateAge(dateOfBirth: string): number {
    const currentDate = new Date();
    const birthDate = new Date(dateOfBirth);
    const yearsDifference = currentDate.getFullYear() - birthDate.getFullYear();
    const isBirthdayPassed = this.checkBirthdayPassed(currentDate, birthDate);
    return isBirthdayPassed
      ? yearsDifference
      : yearsDifference - ValidatorDate.IS_BIRTHDAY_PASSED;
  }

  private checkBirthdayPassed(currentDate: Date, birthDate: Date): boolean {
    return (
      currentDate.getMonth() > birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() >= birthDate.getDate())
    );
  }

  private getAgeErrorMessage(age: number): string {
    if (
      age < ValidatorDate.IS_BIRTHDAY_NOT_PASSED ||
      age >= ValidatorDate.MAXIMUM_AGE
    ) {
      return 'Please enter your valid date of birth.';
    } else if (age < ValidatorDate.MINIMUM_AGE) {
      return 'Minimum age is 13 years.';
    } else {
      return '';
    }
  }
}
