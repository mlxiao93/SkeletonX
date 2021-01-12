exports.getArgvFilters = function name() {
  let argv2 = '';
  if (process.argv && process.argv[2]) {
    argv2 = process.argv[2]
  };
  return argv2.split(',')
}