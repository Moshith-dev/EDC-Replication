// stores/data-collection.ts

import { defineStore } from 'pinia';

// Define the store
export const useDataCollectionStore = defineStore('data-collection', {
  state: () => ({
    clinicalTrialsInitialTabIndex: 0,  // stores the active tab index
    triggerModelChanged: '', // stores the model change state (unsaved, reset, etc.)
    dataCollectionDataViewType: 'list', // stores the data view type (list/grid, etc.)
  }),
  getters: {
    isUnsaved: (state) => state.triggerModelChanged === 'unsaved',
    activeTabIndex: (state) => state.clinicalTrialsInitialTabIndex,
  },
  actions: {
    setTabIndex(tabIndex: number) {
      this.clinicalTrialsInitialTabIndex = tabIndex;
    },
    setTriggerModelChanged(status: string) {
      this.triggerModelChanged = status;
    },
    setDataCollectionViewType(viewType: string) {
      this.dataCollectionDataViewType = viewType;
    },
    reset() {
      this.triggerModelChanged = 'reset';
    }
  }
});
