// 3. Destructuring object lồng nhau – lấy địa chỉ
const person = {
  name: "Alice",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Wonderland"
  }
};

const {
  address: { street, city = "Unknown City" }
} = person;

console.log(street); // "123 Main St"
console.log(city);   // "Wonderland"