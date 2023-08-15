class StorageController {
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
