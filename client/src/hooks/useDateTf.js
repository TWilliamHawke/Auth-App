export const useDateTf = (date) => {
  const d = new Date(date)
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  
  return d.toLocaleString("en-EN", options)
}