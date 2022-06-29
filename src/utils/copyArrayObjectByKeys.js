/**
 * Copy array object with specific keys and optionally renaming keys
 * @param {array} array_object A array object
 * @param {string} filter_key A array with filter keys
 * @param {object} rename_keys A object with rename keys
 * @return {array} The array object filtered and with new keys
 */
const copyArrayObjectByKeys = (
  array_object,
  filter_keys = [],
  rename_keys = {}
) => {
  return array_object.reduce(function (array_object_filtered, item) {
    // Filter by keys
    let item_filtered = Object.entries(item).filter(([key, value]) =>
      filter_keys.includes(key)
    );
    item_filtered = Object.fromEntries(item_filtered);
    // Rename Keys
    Object.entries(rename_keys).map(([old_key, new_key]) => {
      item_filtered[new_key] = item_filtered[old_key];
      delete item_filtered[old_key];
      return rename_keys;
    });
    array_object_filtered.push(item_filtered);
    return array_object_filtered;
  }, []);
};
export default copyArrayObjectByKeys;
