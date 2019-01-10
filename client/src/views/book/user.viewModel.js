import { observable, computed, action, runInAction, get } from 'mobx';
import axios from 'axios';

export class TechniqueViewModel {
  @observable techniques = [];
  @observable loading = false;

  @action async loadTechniques() {
    this.loading = true;
    const result = await axios.get('/api/technique_book');

    runInAction(() => {
      const techniques = result.data.techniques;
      this.techniques = result.data.techniques;
      techniques.id = this.techniques._id;
      this.loading = false;
    })
  }
}