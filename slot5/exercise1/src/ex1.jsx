export function Ex1() {
    const double = x => x * 2;
    const isPositive = x => x > 0;

    return (
        <>
            <p>Hello <strong>Exercise 1</strong></p>
            <h2>bai tap 1</h2>
            <p>Ham double(5): {double(5)}</p>
            <p>isPositive(5): {isPositive(5) ? "so duong" : "so am"}</p>
        </>
    );
}
