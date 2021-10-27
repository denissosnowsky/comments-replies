export const putFocusAtTheEnd = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  var temp_value = e.target.value;
  e.target.value = "";
  e.target.value = temp_value;
};
