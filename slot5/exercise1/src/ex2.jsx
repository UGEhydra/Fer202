export function Ex2() {
    const numbers = [12, 5, 8, 130, 44];
    const names = ['Alice', 'Bob', 'Charlie'];
    const people = [
        { id: 1, name: 'Alice', age: 15 },
        { id: 2, name: 'Bob', age: 20 },
        { id: 3, name: 'Charlie', age: 18 },
        { id: 4, name: 'David', age: 12 },
    ];

    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    const teenList = people.filter(person => person.age >= 13 && person.age <= 19);

    return (
        <div>      
            <h2>bài tập 2</h2>
            <p>Các phần tử của mảng numbers:</p>
            <ul>
                {numbers.map((number, index) => (
                    <li key={index}>{number}</li>
                ))}
            </ul>

            <p>Tổng các phần tử của mảng: <strong>{sum}</strong></p>
            <p>Số lượng phần tử: {numbers.length}</p>

            <p>Danh sách tên (tăng dần):</p>
            <ul>
                {names.slice().sort().map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>

            <p>Danh sách người tuổi teen (13–19):</p>
            <ul>    
                {teenList.map(person => (
                    <li key={person.id}>
                        ID: {person.id} – {person.name} – {person.age}
                    </li>
                ))}
            </ul>
        </div>
    );
}
