class StorageController {
  isLoggedIn(): boolean {
    return localStorage.getItem('session-id') ? true : false;
  }

  getCustomerSessionId(): string {
    return localStorage.getItem('session-id') || '';
  }

  saveCustomerSessionId(id: string) {
    localStorage.setItem(`session-id`, id);
  }

  deleteCustomerSessionId() {
    localStorage.removeItem(`session-id`);
  }
}

export default StorageController;
