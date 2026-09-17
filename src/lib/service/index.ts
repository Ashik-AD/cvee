import { EditorService } from "./editor";

export class Services {
  editor: EditorService;

  constructor(db: IDBDatabase) {
    this.editor = new EditorService(db);
  }
}
