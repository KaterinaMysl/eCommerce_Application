export default class ValidatorDate {
  private static MINIMUM_AGE = 13;
  private static MAXIMUM_AGE = 100;

  getAge(dateOfBirth: string): string {
    const currentDate = new Date();
    const birthDate = new Date(dateOfBirth);
    const yearsDifference = currentDate.getFullYear() - birthDate.getFullYear();
    const isBirthdayPassed =
      currentDate.getMonth() > birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() >= birthDate.getDate());
    const age = isBirthdayPassed ? yearsDifference : yearsDifference - 1;

    if (age < 0 || age >= ValidatorDate.MAXIMUM_AGE) {
      return 'Please enter your valid date of birth.';
    } else if (age < ValidatorDate.MINIMUM_AGE) {
      return 'Minimum age is 13 years.';
    } else {
      return '';
    }
  }
}
