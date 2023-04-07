export const uiSelector = (state) => state.ui;

export const isLoadingSelector = state => uiSelector(state).isLoading;

export const userSelector = state => state.user.user;