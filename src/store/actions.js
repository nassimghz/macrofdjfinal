import Papa from "papaparse";
import Blob from "blob";
import FileSaver from "file-saver";

export default {
  readAndParseFile({ commit, state }) {
    const fileToLoad = state.selectedFile;
    if (!fileToLoad) return;
    const reader = new FileReader();
    reader.onload = fileLoadedEvent => {
      Papa.parse(fileLoadedEvent.target.result, {
        header: true,
        complete(results) {
          console.log("complete", results);
          commit("afterParse", results);
        },
        error(errors) {
          console.log("error", errors);
        }
      });
    };
    reader.readAsText(fileToLoad);
  },
  save({ state }) {
    const blob = new Blob([Papa.unparse(state.data)], { type: "text/csv" });
    FileSaver.saveAs(blob, "test.csv");
  }
};
