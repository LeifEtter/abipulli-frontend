let currentUserId: number | undefined = undefined;

export function setTestUserId(userId: number) {
  currentUserId = userId;
}

export function getTestUserId(): number | undefined {
  return currentUserId;
}

export function resetTestState() {
  currentUserId = undefined;
}
