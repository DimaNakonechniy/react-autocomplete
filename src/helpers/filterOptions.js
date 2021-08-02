const filterOptions = (options, search) => {
  return options.filter(
    (item) => item.toLowerCase().indexOf(search.trim().toLowerCase()) > -1
  );
};

export default filterOptions;
