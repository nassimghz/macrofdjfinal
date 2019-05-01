function parseTree(object) {
  return Object.keys(object)
    .map(key => ({ key, value: object[key] }))
    .map(({ key, value }) =>
      typeof value === "string"
        ? {
            name: `${key} : ${value}`
          }
        : {
            name: `${key} :`,
            children: parseTree(value)
          }
    );
}

export default {
  afterParse(state, results) {
    state.data = results.data;
    state.tree = parseTree(results.data.slice(0, 100));
  },
  selectFile(state, e) {
    console.log(e.target.files)
    state.selectedFile = e.target.files[0];
  }
};
