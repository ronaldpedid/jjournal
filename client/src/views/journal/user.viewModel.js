import { observable, computed, action, runInAction, get } from 'mobx';
import axios from 'axios';

export class JournalViewModel {
  @observable journal = [];
  @observable loading = false;

  @action async loadJournal() {
    this.loading = true;
    const result = await axios.get('/api/journal');

    runInAction(() => {
      const journal = result.data.journal;
      console.log(journal);
      journal.id = this.journal._id;
      this.loading = false;
    })
  }
}