const data = await fetch('events.json');
export const events = await data.json();
