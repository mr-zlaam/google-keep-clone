interface Item {
  title: string;
  description: string;
}

// Example array of objects
const arrayOfObjects: Item[] = [
  { title: "Apple", description: "Description 1" },
  { title: "Banana", description: "Description 2" },
  { title: "Orange", description: "Description 3" },
  // Add more objects as needed
];

// Sort the array based on the first letter of the title
arrayOfObjects.sort((a: Item, b: Item) => {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();
  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }
  return 0;
});

console.log(arrayOfObjects);
const date = new Date();
console.log(date.toLocaleString());
console.log(date);
