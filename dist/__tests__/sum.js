"use strict";
function sum(a, b) {
    return a + b;
}
function moreString(name, lastName) {
    const fullName = name + lastName;
    return fullName;
}
test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
});
test("join name and lastName equal fullName", () => {
    expect(moreString("Pascoal", "Kahamba")).toBe("Pascoal Kahamba");
});
