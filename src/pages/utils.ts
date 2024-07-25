export default function formatDate (isoDateString : string) {
    const date = new Date(isoDateString);
  
    const optionsDate: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  
    const readableDate = date.toLocaleDateString('en-US', optionsDate);
  
    return readableDate
}