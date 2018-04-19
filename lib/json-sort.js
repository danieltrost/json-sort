  'use babel';

  import { CompositeDisposable } from 'atom';

  export default {
    jsonSortView: null,
    modalPanel: null,
    subscriptions: null,

    activate(state) {
      // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
      this.subscriptions = new CompositeDisposable();

      // Register command that toggles this view
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'json-sort:sort': () => this.sort()
      }));
    },

    alphabetize(value) {
      let obj = {};
      let names = [];

      if (Array.isArray(value)) {
        obj = value.sort();
        obj.forEach(function (val, key) {
          obj[key] = exports.default.alphabetize(val);
        });
      } else {
        if (typeof value === 'object') {
          obj = {};
          Object.keys(value).sort(function (key, val) {
            if (key.toLowerCase() < val.toLowerCase()) {
              return -1;
            } else if (key.toLowerCase() > val.toLowerCase()) {
              return 1;
            } else {
              return 0;
            }
          }).forEach(function (val) {
            obj[val] = exports.default.alphabetize(value[val]);
          });
        } else {
          obj = value;
        }
      }

      return obj;
    },

    cleanInput(input) {
      input = input.replace(/,[ \t\r\n]+}/g, "}");
      input = input.replace(/,[ \t\r\n]+\]/g, "]");

      return input;
    },

    deactivate() {
      this.subscriptions.dispose();
    },

    sort() {
      let editor;
      if (editor = atom.workspace.getActiveTextEditor()) {
        let selection = editor.getSelectedText();
        selection = this.cleanInput(selection);
        selection = this.alphabetize(JSON.parse(selection));
        editor.insertText(JSON.stringify(selection, null, 4));
      }
    }
  };
